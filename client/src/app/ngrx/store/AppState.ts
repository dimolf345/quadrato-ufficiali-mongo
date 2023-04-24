import { RouterState } from "./reducers/router.reducer";
import { UfficialiState } from "./reducers/ufficiali.reducer";
import { UIState } from "./reducers/ui.reducer";

export interface AppState {
  router: RouterState
  ufficiali: UfficialiState
  ui: UIState
}