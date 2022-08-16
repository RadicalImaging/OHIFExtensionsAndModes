import "./ecgMode";
import createDerivativeMode from "./createDerivativeMode";
import configMode from "./configMode";
import ConfigPoint, {loadSearchConfigPoint} from "config-point";


const ConfigurableModes = ConfigPoint.createConfiguration("ConfigurableModes", {
  modes: {
    configOperation: "sort",
    sortKey: "priority",
  },
  
  // umdExtensions is an ordered set of extensions which can be loaded via the 
  // script element tag as a umd extension element.
  umdExtensions: [
   {id: '@radicalimaging/hp-extension', src: '/umd/@radicalimaging/hp-extension/index.umd.js'},
   {id: '@radicalimaging/site-finding', src: '/umd/@radicalimaging/site-finding/index.umd.js'},
   {id: '@radicalimaging/ecg-dicom', src: '/umd/@radicalimaging/ecg-dicom/index.umd.js'},
  //  {id: '@radicalimaging/microscopy-dicom', src: '/umd/@radicalimaging/microscopy-dicom/index.umd.js'},
  ],

  umdLibraries: [
    {id: 'config-point', src: '/umd/config-point/index.umd.js'},
  ],
});


/** Load method for dynamic loading of modes and extensions. */
const hotLoad = async () => {
  // Load themes from the "theme" parameter on the URL before returning the modes
  await loadSearchConfigPoint("theme", "/theme", "theme");
};


export {hotLoad};

export default modesFactory;
