import * as Actions from '../consts';

// Reducers never modify the state, they always create a new copy
// with the needed modifications
const teas = (state = {teas: []}, action) => {
  switch (action.type) {
    case Actions.DATA_LOADED:
      const teas = action.payload.store.teas;
      return {
        ...state,
        teas
      };
    default:
      return state;
  }
};

export default teas;
