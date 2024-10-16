export const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
export const CHANGE_ACTIVE_SIDEBAR_ITEM = 'CHANGE_ACTIVE_SIDEBAR_ITEM';
export const OPEN_SIDEBAR_ITEM = 'OPEN_SIDEBAR_ITEM';

export const openSidebar = () => {
  return {
    type: OPEN_SIDEBAR,
  };
}

export const closeSidebar =() => {
  return {
    type: CLOSE_SIDEBAR,
  };
}

export const changeActiveSidebarItem = (activeItem) => {
  return {
    type: CHANGE_ACTIVE_SIDEBAR_ITEM,
    activeItem,
  };
}

export const changeOpenedSidebarItem = (openedItem) => {
  return {
    type: OPEN_SIDEBAR_ITEM,
    openedItem,
  };
}