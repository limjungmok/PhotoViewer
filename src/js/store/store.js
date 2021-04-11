import PubSub from '../lib/pubsub.js';

// Vuex, Redux 라이브러리의 스토어 객체
export default class Store {
  constructor({ actions, reducers, state }) {
    this.events = new PubSub();
    this.actions = actions || {};
    this.reducers = reducers || {};
    this.state = new Proxy((state || {}), {
      set: (state, key, value) => {
        state[key] = value;
        this.events.publish('setState', this.state);

        return true;
      }
    })
  }

  // 액션을 전파하는 함수
  // 뷰에서 액션이 dispatch 되면, 스토어객체에 상태변경을 요청(reducer)
  dispatch(actionKey, payload) {
    this.actions[actionKey](this, payload);
  }

  // 상태를 변경하는 함수
  // 리듀서 집합에서 해당하는 리듀서를 호출
  // 새로운 상태값을 갱신
  reducer(reducerKey, payload) {
    const newState = this.reducers[reducerKey](this.state, payload);
    this.state = Object.assign(this.state, newState);
  }
};