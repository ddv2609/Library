const cascaderValuesReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_VALUES':
      return action.payload;
    default:
      return state;
  }
}

export default cascaderValuesReducer;