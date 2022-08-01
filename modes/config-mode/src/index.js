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
   {id: '@radical/hp-extension', src: '/umd/@radical/hp-extension/index.umd.js'},
   // {id: '@radical/site-finding', src: '/umd/@radical/site-finding/index.umd.js'},
   {id: '@radical/ecg-dicom', src: '/umd/@radical/ecg-dicom/index.umd.js'},
  //  {id: '@radical/microscopy-dicom', src: '/umd/@radical/microscopy-dicom/index.umd.js'},
  ],

  umdLibraries: [
    {id: 'config-point', src: '/umd/config-point/index.umd.js'},
  ],
});


const amd = {};
const modules = {};
let counter = 0;

function defineGlobal(...args) {
  let path, child,t;
  if( args.length==3 ) {
    [path,child,t] = args;
    console.log("amd define 3 argument", path, child, t);
  } else {
    [child,t] = args;
    path = "undefinedName"+counter;
    counter += 1;
    console.log("***** amd args of length !=3", args,  path, child, t);
  }
  try {
    const args = child.map(key => {
      const ret = modules[key];
      if( !ret ) {
        console.log("Rejecting", key, "as it was not found", amd[path]);
        amd[path].reject(`Module ${key} required by ${path} not found`)
      }
      console.log("Import reference", key, ret);
      return ret;
    })
    const module = t(...args);
    modules[path] = module;
    amd[path].resolve(module);
  } catch(e) {
    console.log("Couldn't load", e);
    amd[path].reject(e);
  }
}

function importModule(moduleDefn) {
  const script = document.createElement("script");
  script.src = moduleDefn.src;
  document.documentElement.appendChild(script);
  return new Promise((resolve,reject) => {
    amd[moduleDefn.id] = {resolve,reject};
  })
}

async function loadExternals() {
  modules['config-point'] = await import("config-point");
  modules['react'] = await import("react");
  modules['@ohif/core'] = await import("@ohif/core");
}

/**
 * Loads the umd extensions list
 */
const loadUmdExtensions = async (umdExtensions, ret = []) => {
  if( !window.define ) {
    window.define = defineGlobal;
    await loadExternals();
  }
  console.log("List of extensions to load:", umdExtensions);
  for(const umd of umdExtensions) {
    console.log("Trying to import", umd.id, umd.src);
    try {
      ret.push((await importModule(umd)).default)
      console.log("Imported", umd.id);
    } catch(e) {
      console.warn("Unable to import umd.id", e);
    }
  }
  console.log("Loaded extensions:", umdExtensions, ret);
  return ret;
}

defineGlobal.amd = amd;

/** Load method for dynamic loading of modes and extensions. */
const modesFactory = async (modes, extensions) => {
  // Load themes from the "theme" parameter on the URL before returning the modes
  await loadSearchConfigPoint("theme", "/theme", "theme");

  // TODO - iterate over the set of actual modes, and import only the required ones once.
  // Creates a mode called configPoint-base-@ohif/mode-longitudinal
  createDerivativeMode(await import("@ohif/mode-longitudinal"));
  createDerivativeMode(await import("@ohif/mode-tmtv"));

  if( ConfigurableModes.clearDefaultModes ) modes.splice(0,modes.length);
  
  await loadUmdExtensions(ConfigurableModes.umdExtensions, extensions);

  const useModes = ConfigurableModes.modes.map(modeRef => {
    // getConfig will just return an object if provided one, or will get the referenced mode value
    const mode = ConfigPoint.getConfig(modeRef);
      return mode.bindFactory ? {...mode, modeFactory: mode.bindFactory(mode)} : mode;
  });
  return useModes;
};

export {configMode};

export default modesFactory;
