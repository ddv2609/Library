const queryReducer = (state = "", action) => {
  switch (action.type) {
    case 'CHANGE_QUERY':
      return action.payload;
    default:
      return state;
  }
}

export default queryReducer;