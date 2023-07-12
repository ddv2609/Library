const cascaderSmallerValuesReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_SMALLER_VALUES':
      return action.payload;
    default:
      return state;
  }
}

export default cascaderSmallerValuesReducer;