import {dicomSeg, dicomvideo, ohif, dicompdf, dicomsr} from "./extensions";

/** SopClassHandlers used by the mode */
const sopClassHandlers = [
  dicomvideo.sopClassHandler,
  ohif.sopClassHandler,
  dicompdf.sopClassHandler,
  dicomsr.sopClassHandler,
  dicomSeg.sopClassHandler,
];

export default sopClassHandlers;
