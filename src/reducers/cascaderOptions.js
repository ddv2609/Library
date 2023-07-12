const cascaderOptionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_OPTIONS':
      return action.payload;
    default:
      return state;
  }
}

export default cascaderOptionsReducer;