import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  connected: false,
  username: null,
  token: null
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_CONNECTED':
      return {
        ...state,
        connected: true,
        username: action.payload.username,
        token: action.payload.token
      };
      case 'USER_SIGN_OUT':
        return {
          ...state,
          connected: false,
        };
      case 'UPDATE_USERNAME':
        return {
          ...state,
          username: action.payload.newUsername,
        };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

