import { ADD_ADMIN } from '../actions/actions';

const initialState = {
  adminCount: 5 // Initial count
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADMIN:
      return {
        ...state,
        adminCount: state.adminCount + 1
      };
    default:
      return state;
  }
};

export default adminReducer;
