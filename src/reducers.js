// reducers.js
const initialState = {
    connected: false,
    username: null
    // Autres états globaux que vous pourriez avoir
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_CONNECTED':
        console.log("Reducer - Username reçu :", action.payload.username);
        return {
          ...state,
          connected: true,
          username: action.payload.username
        };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;