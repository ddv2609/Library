const categoriesReducer = (state=[], action) => {
  switch (action.type) {
    case 'get-categories':
      return action.categories;
    default:
      return state;
  }
}

export default categoriesReducer;