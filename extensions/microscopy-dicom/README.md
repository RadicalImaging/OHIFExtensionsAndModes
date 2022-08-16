# microscopy-dicom 
Microscopy Viewer Plugin for OHIF v3.2

## Description 
The Microscopy plugin for OHIF allows rendering of DICOM microscopy images within OHIF v3.2.  
Currently, only rendering and magnification are supported, but the idea is to migrate the original
OHIF v2 tool set into the v3 version.  

The microscopy plugin uses the dicom-microscopy-viewer, which has various tools for annotation, as well as
support for switching between various DICOM map layers so that the user can magnify the image, and the appropriate
DICOM file will be chosen to be used.  Tiles fetches are mapped into frames, and the frames are displayed within OpenLayers.  This allows for fast panning even when images are very large.  The viewer has been tested on objects containing 340,000 tiles, and is still extremely fast.

## Future Work
There are a number of defficincies in the current viewer.  None of the annotation tools currently work with the service, and the OHIF v2 implementation of those tools was a very custom side panel for storing measurements.  Both of these areas need to be addressed.

### Toolbar for Microscopy
The most pressing need for the plugin is to create a new toolbar using the ToolBarService, allowing for activation and use of the various tools such as:

1. Length
2. Ellipse/Circle ROI
3. Text Annotation

### Measurements Panel
After annotations can be created, a list of the available annotations is required.  This was done for OHIF v2 in a custom side panel, but the OHIF v3 measurements panel is sufficiently robust to allow measurements from different viewers to be encoded/discovered.  The advantage of using that side panel is that there are a robust set of notifications on changes, and the existing save/reject/download and export capabilities of the Cornerstone implementation can be retained for Microscopy.  

### Finding and Site Settings
The annotations in the OHIF v2 version had a custom "finding" and "site setting" capability, where a menu could be displayed of the various finding types.  The `@radicalimaging/site-settings` extension can be used to provide this functionality in OHIF v3.  This plugin uses the active measurement and nearby measurement functionality to 

## Authors
Bill Wallace, Radical Imaging is the author of the v3.2 OHIF plugin, but this plugin is heavily based on earlier work for an OHIF v2 plugin written by Danny Brown, James Petts, Igor Octaviano and others.
Uses the [dicom-microscopy-viewer](https://github.com/herrmannlab/dicom-microscopy-viewer) from Markus Hermann, and 
[Open Layers](https://openlayers.org/) for rendering the tiles - that is, for all the heavy lifting for display and rendering.  

## License 
MIT