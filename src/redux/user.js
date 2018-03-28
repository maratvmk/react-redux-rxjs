import { mergeMap, map, takeUntil } from "rxjs/operators";
import { ajax } from "rxjs/observable/dom/ajax";

// epic
export const fetchUserEpic = action$ =>
  action$.ofType('FETCH_USER').pipe(
    mergeMap(action =>
      ajax.getJSON(`https://api.github.com/users/${action.payload}`).pipe(
          map(r => ({ type: 'FETCH_USER_FULFILLED', payload: r })),
          takeUntil(action$.ofType('FETCH_USER_CANCELLED'))
      )
    )
);

// reducer
export const userReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case 'FETCH_USER_FULFILLED':
            return {...state, user: action.payload};
    
        default:
            return state;
    }
};