import * as Actions from '../consts';

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
