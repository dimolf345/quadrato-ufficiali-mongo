import { FondoState } from "./reducers/fondo.reducer";
import { MovimentiState } from "./reducers/movimenti.reducer";
import { RouterState } from "./reducers/router.reducer";
import { UfficialiState } from "./reducers/ufficiali.reducer";
import { UIState } from "./reducers/ui.reducer";

export interface AppState {
  router: RouterState
  fondo: FondoState
  ufficiali: UfficialiState,
  movimenti: MovimentiState
  ui: UIState
}