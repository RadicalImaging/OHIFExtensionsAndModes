import codingValues from "./codingValues";
export type UIFindingMenuItemCustomization = {
  codeRef: string;
}

const siteMenuItem = {
  id: 'contextMenu.siteMenuItem',
  codingValues,
  commands: [
    {
      commandName: 'setSite',
    },
  ],
  transform: function (customizationService) {
    const { code: codeRef } = this;
    if (!codeRef) throw new Error(`item ${this} has no code ref`);
    const codingValues = customizationService.get('codingValues');
    const code = codingValues[codeRef];
    return {
      ...this,
      codeRef,
      code,
      label: code.text,
    };
  },
};

export default siteMenuItem;
