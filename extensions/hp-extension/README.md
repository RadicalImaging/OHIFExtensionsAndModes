# hp-extension 
The hp-extension is a hanging protocol dynamically loaded module for use with the OHIF 3D medical image viewer.

## Description 
Extension to define support for hanging protocols.

## Author 
Bill Wallace, Radical Imaging

## License 
MIT

## Distribution Format
This package is distributed as a fully realized public path appropriate for inclusion in OHIF without recompiling OHIF by loading the umd file.  The `public` directory is included in a build or distribution of OHIF, and within that directory, the sub-directory `umd/<PACKAGE-NAME>/index.umd.js` is used so that the dynamic loader can find the umd package.

To include hp-extension in an OHIF mode, the contents of the public directory can be copied into the web distribution of an OHIF v3 version, and then referenced as a dynamic extension.  See examples in the config-mode directory, part of this distribution.

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