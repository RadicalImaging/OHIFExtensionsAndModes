import createDerivativeMode from "./createDerivativeMode";
import ConfigPoint from "config-point";

const configMode = (id, definition, importedMode) => {
  const baseMode = createDerivativeMode(importedMode);
  return ConfigPoint.createConfiguration(id,definition, baseMode);
}

export default configMode;