import { RouterState } from "./reducers/router.reducer";
import { UfficialiState } from "./reducers/ufficiali.reducer";

export interface AppState {
  router: RouterState
  ufficiali: UfficialiState
}