# hp-extension 
The hp-extension is a hanging protocol dynamically loaded module for use with the OHIF 3D medical image viewer.

## Description 
Extension to define support for hanging protocols, plus handling of initial zooming and panning.

## Interface
The current interface defines a sync group that synchronizes from settings into the image display area, for the initial image size and position.  This works for both volume and stack viewports as it applies to the image as displayed.
The design sets two values `initialDisplayArea`, specifying a fraction of the image size that should be displayed at the full image width/height.  A second value, `imageCanvasPoint` sets a point in the image that corresponds to a point in the canvas.  Some examples are provided below:

### Right-Center Aligned 
Some images are shown aligned along a certain edge.  To achieve this, the values:
```js
imageCanvasPoint: [1,0.5,1,0.5]
```

can be used, specifying that the image point at the right center `1,0.5`, is to the placed at the canvas point `1,0.5`, both specified as a fraction in order to deal with differing image sizes.  An example set of positions:
```js
  imageSize = [2560,4096]
  canvasSize = [1280,1024]
  image point = [1,0.5] * [2560,4096] = [2560,2048]
  canvas point = [1,0.5] * [1280,1024] = [1280,512]
```
That says, translate the image display so that the absolute image position `2560,2048` is located at canvas coordinates `1280,512`.  This results in displaying the image right aligned, with the vertical center corresponding to the middle of the canvas.

### Transalated and Zoomed Image
Sometimes images should be translated/moved, because it is known that the area of interest occurs in a certain part.  For example, a LAX 4 chamber heart view might use the scaling/translation:
```js
    syncGroups: [
              {
                type: 'initialZoomPan',
                options: { 
                  initialDisplayArea: [0.6, 0.6],
                  imageCanvasPoint: [0.5, 0.35],
                },
              },
            ],
```

which says to display the `0.6,0.6` fraction of the image size at the center of canvas areas (effectively panning so that the `60%` width and height is in the center of the display area), and zooming so that half the width is visible and `35%` of the height is visible.

### GSPS Equivalence
The percentage values are used so as to apply to differing image sizes.  Within GSPS, the top left hand corner and bottom right hand corner are provided, as these apply to specified images, so all the same sizes.  It is possible to convert these absolute values into relative values using the following formula (excluding rotation):
```js
   // Extract the bottomr right and top left
   const {brhc, tlhc} = gsps; 
   const {columns, rows} = image;

   initialDisplayArea = [(brhc[0]-tlhc[0])/columns, (brhc[1]-tlhc[1])/rows]
   imageCanvasPoint = [(brhc[0]+tlhc[0])/(2*columns), (brhc[1]+tlhc[1])/(2*rows)]
```

This says that the size of the image should be such that the larger of the two initial display area items can be fully displayed, and that the center point of the requested area is displayed in the center of the canvas.  GSPS is insufficiently specified to allow for displaying images such as chest wall aligned MG, and breaks when attempting to use the displayed area on differing image sizes.  Conversely, these definitions do not allow for true size or pixel scale specifications, so additional options are required for those.


## Author 
Bill Wallace, Radical Imaging

## License 
MIT


## Hanging Protocol Customizations
There are a few hanging protcol customizations which are registered when the package is loaded.

* zoomPan is a custom viewport setting which applies the setting zoomPan, which is an object containing initial pan, zoom and flip settings.
* ViewCode is a custom attribute reader which reads the view code attribute from an MG or other DICOM object
* Laterality is a custom attribute reader which reads the laterality (left/right) of an image.

## Hanging Protocols Provided
The following hanging protocols can be loaded from the hp-extension by referencing them in the mode as appropriate.

### `@radical/hp-extension.hangingProtocolModule.heart`
The heart hanging protcol applies for the study description of "LV Function", and lays the images out in a 2x2 already magnified view, containing the long axis 4 chamber, 3 chamber and 2 chamber views, plus the short axis view.

### `@radical/hp-extension.hangingProtocolModule.breast`
The breast hanging protocol applies to MG modality studies, and lays out a 2x2 view containing RCC, LCC, RMLO, LMLO.  This is a very basic demonstration view and is not ready for real reading, but is quite useful in showing how the images can be chest wall aligned via the use of the initialCenter and canvasCenter parameters, as well as how they can be flipped using the `flipHorizontal` and `flipVertical` parameters.

### `@radical/hp-extension.hangingProtocolModule.MN`
The MN layout has a number of sub-stages, and is applied when the study has more than one series.  It is a todo item to allow it to be applied instead when there is more than one display set containing images.
The basic layouts are  3x2, 2x2, 3x1, 2x1 and 1x1

In this hanging protocol, please note the repeated use of the displaySetIndex to allow re-using an existing list of display set, and showing a lower priority match instead of the best match.  This allows displaying the first four display sets in a study instead of trying to arrange to have different display set rules to try to match the second, third etc series.