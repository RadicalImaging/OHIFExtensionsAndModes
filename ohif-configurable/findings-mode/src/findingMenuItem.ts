
export type UIFindingMenuItemCustomization = {
  code: string;
}

const findingMenuItem = {
  id: 'contextMenu.findingMenuItem',
  adaptItem: function(item,...): ContextMenuItem {
    const { code } = item;
    return {
      ...item,
      ...soemthing from code,
      action: actionToApply: (adaptedItem) => ...
    }
  }
}