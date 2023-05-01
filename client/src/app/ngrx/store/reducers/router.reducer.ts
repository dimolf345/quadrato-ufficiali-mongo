import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";

export interface RouterState {
  router: RouterReducerState<any>
}

const reducer: ActionReducerMap<RouterState> = {
  router: routerReducer
}

export default reducer