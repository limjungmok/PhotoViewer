export default class PubSub {
  constructor() {
    this.events = {};
  }

  // 각 이벤트별 콜백함수 관리
  subscribe(event, callback) {
    if(!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }
    
    return this.events[event].push(callback);
  }

  // 이벤트 발생시 콜백함수에 payload 전달
  publish(event, data = {}) {
    if(!this.events.hasOwnProperty(event)) {
      return [];
    }

    return this.events[event].map(callback => callback(data));
  }
}