import PubSub from '../lib/pubsub.js';

export default class Store {
  constructor(params) {
    let self = this;

    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.events = new PubSub();

    if(params.hasOwnProperty('actions')) {
      this.actions = params.actions;
    }
    
    if(params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations;
    }

    this.state = new Proxy((params.state || {}), {
      set: function(state, key, value) {
        state[key] = value;
        self.events.publish('setState', self.state);
        
        return true;
      }
    });
  }

  dispatch(actionKey, payload) {
    this.actions[actionKey](this, payload);
  }

  commit(mutationKey, payload) {
    const newState = this.mutations[mutationKey](this.state, payload);
    this.state = Object.assign(this.state, newState);
  }
};