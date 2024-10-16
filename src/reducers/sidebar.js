import { OPEN_SIDEBAR, CLOSE_SIDEBAR, CHANGE_ACTIVE_SIDEBAR_ITEM, OPEN_SIDEBAR_ITEM } from "../actions/sidebar.js";
  
const initialState = {
    isOpened: false,
    activeItem: null,
    openedItem: null
};
  
const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
      case OPEN_SIDEBAR:
        return Object.assign({}, state, {
          isOpened: true,
        });
      case CLOSE_SIDEBAR:
        return Object.assign({}, state, {
          isOpened: false,
        });
      case CHANGE_ACTIVE_SIDEBAR_ITEM:
        return {
          ...state,
          activeItem: action.activeItem,
        };
      case OPEN_SIDEBAR_ITEM:
        return {
          ...state,
          openedItem: action.openedItem
        }
      default:
        return state;
    }
}
  
export default sidebarReducer;