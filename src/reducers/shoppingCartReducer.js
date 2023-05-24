import TYPES from "./actionTypes";

export const cartInitialState =
  JSON.parse(window.localStorage.getItem("cart")) || [];

export const updateLocalStorage = (state) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
};

const UPDATE_STATE_BY_ACTION = {

  [TYPES.ADD_TO_CART]: (state, action) => {
    const { id } = action.payload
    const productInCartIndex = state.findIndex(item => item.id === id)

    if (productInCartIndex >= 0) {
        const newState = [
            ...state.slice(0,productInCartIndex),
            {...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1},
            ...state.slice(productInCartIndex + 1)
        ]

        updateLocalStorage(newState)
        return newState
    }

    const newState = [
        ...state,
        {
            ...action.payload,
            quantity: 1
        }
    ]

    updateLocalStorage(newState)
    return newState

  },

  [TYPES.REMOVE_PRODUCT_FROM_CART]: (state, action) => {
    const { id } = action.payload
    const newState = state.filter(item => item.id !== id)
    updateLocalStorage(newState)
    return newState
  },

  [TYPES.CLEAR_CART]: () => {
    updateLocalStorage([])
    return []
  }
};

export const cartReducer = (state, action) => {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE_BY_ACTION[actionType];
  return updateState ? updateState(state, action) : state;
};
