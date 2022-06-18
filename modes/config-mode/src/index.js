// import mode from "./configMode";
import "./ecgMode";
import "./configMode";

import ConfigPoint, {loadSearchConfigPoint} from "config-point";

const ConfigurableModes = ConfigPoint.createConfiguration("ConfigurableModes", {
  modes: {
    configOperation: "sort",
    sortKey: "priority",
  }, 
});

/** Load method for dynamic loading of modes and extensions. */
const modesFactory = async () => {
  // Load themes from the "theme" parameter on the URL before returning the modes
  await loadSearchConfigPoint("theme", "/theme", "theme");

  const useModes = ConfigurableModes.modes.map(mode => {
    console.log("Mapping mode", mode.id);
      return mode.bindFactory ? {...mode, modeFactory: mode.bindFactory(mode)} : mode;
  });
  console.log('useModes=', useModes);
  return useModes;
};


export default modesFactory;
