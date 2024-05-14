/**
 * Converts a String to a Uint8Array.
 * @param {String} str string that should be converted
 * @returns {Uint8Array}
 */
function stringToUint8Array(str:string):Uint8Array {
  const arr = new Uint8Array(str.length);
  for (let i = 0, j = str.length; i < j; i++) {
    arr[i] = str.charCodeAt(i);
  }
  return arr;
}


/**
 * Checks whether a given token is contained by a message at a given offset.
 */
function containsToken(message:Uint8Array, token:Uint8Array, offset = 0):boolean {
  if (offset + token.length > message.length) {
    return false;
  }

  let index = offset;
  for (let i = 0; i < token.length; i++) {
    if (token[i] !== message[index]) {
      return false;
    }

    index += 1;
  }
  return true;
}

/**
 * Finds a given token in a message at a given offset.
 */
function findToken(message:Uint8Array, token:Uint8Array, offset = 0, maxSearchLength?:number): number {
  let searchLength = message.length;
  if (maxSearchLength) {
    searchLength = Math.min(offset + maxSearchLength, message.length);
  }

  for (let i = offset; i < searchLength; i++) {
    // If the first value of the message matches
    // the first value of the token, check if
    // this is the full token.
    if (message[i] === token[0]) {
      if (containsToken(message, token, i)) {
        return i;
      }
    }
  }

  return -1;
}

/**
 * Converts a Uint8Array to a String.
 */
function uint8ArrayToString(arr: Uint8Array, offset = 0, limit?:number): string {
  const itemLimit = limit || arr.length - offset;
  let str = '';
  for (let i = offset; i < offset + itemLimit; i++) {
    str += String.fromCharCode(arr[i]);
  }
  return str;
}

/**
 * Identifies the boundary in a multipart/related message header.
 */
 function identifyBoundary(header: string): string|null {
  const parts = header.split('\r\n');

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].substr(0, 2) === '--') {
      return parts[i];
    }
  }

  return null;
}

const separator = stringToUint8Array('\r\n\r\n');

export default function multipartDecode(response) {
  // Use the raw data if it is provided in an appropriate format
  const message = ArrayBuffer.isView(response) ? (response as Uint8Array) : new Uint8Array(response);

  /* Set a maximum length to search for the header boundaries, otherwise
       findToken can run for a long time
    */
  const maxSearchLength = 1000;

  // First look for the multipart mime header
  const headerIndex = findToken(message, separator, 0, maxSearchLength);
  if (headerIndex === -1) {
    return [message];
  }

  const header = uint8ArrayToString(message, 0, headerIndex);
  const boundaryString = identifyBoundary(header);
  if (!boundaryString) {
    throw new Error('Header of response message does not specify boundary');
  }

  const boundary = stringToUint8Array(boundaryString);
  const boundaryLength = boundary.length;
  const components: Uint8Array[] = [];

  let offset = boundaryLength;

  // Loop until we cannot find any more boundaries
  let boundaryIndex;

  while (boundaryIndex !== -1) {
    // Search for the next boundary in the message, starting
    // from the current offset position
    boundaryIndex = findToken(message, boundary, offset);

    // If no further boundaries are found, stop here.
    if (boundaryIndex === -1) {
      break;
    }

    const headerTokenIndex = findToken(
      message,
      separator,
      offset,
      maxSearchLength,
    );
    if (headerTokenIndex === -1) {
      throw new Error('Response message part has no mime header');
    }
    offset = headerTokenIndex + separator.length;

    // Extract data from response message, excluding "\r\n"
    const spacingLength = 2;
    const data = response.slice(offset, boundaryIndex - spacingLength);

    // Add the data to the array of results
    components.push(data);

    // Move the offset to the end of the current section,
    // plus the identified boundary
    offset = boundaryIndex + boundaryLength;
  }

  return components;
}
