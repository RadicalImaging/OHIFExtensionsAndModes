import ConfigPoint from "config-point";

function returnLayoutTemplate() {
  return this._layoutTemplate;
}

const createDerivativeMode = (importedMode) => {
  if (!importedMode) return undefined;

  const importedBase = importedMode.default || importedMode;
  const { id: baseId, modeFactory: baseModeFactory } = importedBase;

  const configPointBaseId = `base-mode-${baseId}`


  // This mode registers itself the first time the derivative mode gets called
  const mode = ConfigPoint.createConfiguration(baseId, {
    ...importedBase,
    modeFactory: {
      configOperation: "bind", value: function (props) {
        const parentMode = baseModeFactory(props);
        const routes = parentMode.routes.map(route => ({
          ...route,
          _layoutTemplate: route.layoutTemplate(props),
          layoutTemplate: {
            configOperation: 'bind',
            value: returnLayoutTemplate,
          },
        }));
        ConfigPoint.createConfiguration(configPointBaseId, {
          ...parentMode,
          id: configPointBaseId,
          routes,
        });
        console.log("Returning this with extensions for the mode", this.id, this.extensions);
        return this;
      },
    },
  }, configPointBaseId);
  return mode;
};

export default createDerivativeMode;
