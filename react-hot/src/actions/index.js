import * as Utils from '../utils/Utils';
import * as Actions from '../consts';

export function fetchData(dispatch) {
  Utils.query(String.raw`
        query {
          store {
            teas {
              name
              steepingTime
              relate {
                name
                steepingTime
              }
            }
          }
        }
      `)
    .then(res => dispatch({
      type: Actions.DATA_LOADED,
      payload: res.data
    }));
}
