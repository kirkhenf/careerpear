const TOGGLE_MENU = 'TOGGLE_MENU';
const CLOSE_MENU = 'CLOSE_MENU';

const INITIAL_STATE = {
  isModal: false,
  anchorEl: null
};

const toggleMenu = (state, action) => ({
  ...state,
  isModal: !state.isModal,
  anchorEl: action.target
});

const closeMenu = () => ({
  isModal: false,
  anchorEl: null
})

function navigationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_MENU: {
      return toggleMenu(state, action);
    } case CLOSE_MENU: {
      return closeMenu();
    }
    default: return state;
  }
}

export default navigationReducer;