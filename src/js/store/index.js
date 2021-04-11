import actions from './actions.js';
import reducers from './reducers.js';
import state from './state.js';
import Store from './store.js'; 

export default new Store({
  actions,
  reducers,
  state
});