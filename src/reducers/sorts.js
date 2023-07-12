const sortReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_SORT':
      return action.payload;
    default:
      return state;
  }
}

export default sortReducer;