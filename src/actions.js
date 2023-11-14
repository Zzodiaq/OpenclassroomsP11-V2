export const userConnected = (username, token) => {
    return {
      type: 'USER_CONNECTED',
      payload: { 
        username: username,
        token: token
      }
    };
  };

export const userSignOut = () => {
    return {
      type: 'USER_SIGN_OUT',
    };
  };

export const updateUsername = (newUsername) => {
  return {
    type: 'UPDATE_USERNAME',
    payload: { newUsername },
  };
};