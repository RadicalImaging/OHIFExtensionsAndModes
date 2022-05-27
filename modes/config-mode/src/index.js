import mode from "./configMode";
import ConfigPoint, {loadSearchConfigPoint} from "config-point";

const ConfigurableModes = ConfigPoint.createConfiguration("ConfigurableModes", {
  modes: [mode],
});

/** Load method for dynamic loading of modes and extensions. */
const modesFactory = async () => {
  // Load themes from the "theme" parameter on the URL before returning the modes
  await loadSearchConfigPoint("theme", "/theme", "theme");
  return ConfigurableModes.modes;
};


export default modesFactory;
