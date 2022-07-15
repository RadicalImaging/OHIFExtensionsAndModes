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
  ],
});

function importModule(moduleDefn) {
  const script = document.createElement("script");
  script.src = moduleDefn.src;
  document.documentElement.appendChild(script);
  return new Promise((resolve,reject) => {
    window.define.amd[moduleDefn.id] = {resolve,reject};
    // TODO - add exception handler if the resolve never happens
  })
}

/**
 * Loads the umd extensions list
 */
const loadUmdExtensions = async (umdExtensions, ret = []) => {
  window.define = function(path,child,t) {
    console.log("amd define", path, child, t);
    try {
      const module = t();
      window.define.modules[path] = module;
      window.define.amd[path].resolve(module);
    } catch(e) {
      console.log("Couldn't load", e);
      window.amd[path].reject(e);
    }
  }
  window.define.amd = {};
  window.define.modules = {};
  for(const umd of umdExtensions) {
    console.log("Trying to import", umd.id, umd.src);
    ret.push((await importModule(umd)).default)
    console.log("Imported", umd.id);
  }
  return ret;
}

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
