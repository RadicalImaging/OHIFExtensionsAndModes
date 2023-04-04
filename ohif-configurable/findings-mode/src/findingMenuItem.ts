import codingValues from "./codingValues";
export type UIFindingMenuItemCustomization = {
  codeRef: string;
}

const findingMenuItem = {
  id: 'contextMenu.findingMenuItem',
  codingValues,
  adaptItem: function (item) {
    const { code: codeRef } = item;
    if (!codeRef) throw new Error(`item ${item} has no code ref`);
    const code = this.codingValues[codeRef];
    return {
      ...item,
      codeRef,
      code,
      label: code.text,
      commands: [
        {
          commandName: 'setFinding',
        },
      ],
    };
  },
};

export default findingMenuItem;
