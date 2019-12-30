import Store from '../store/store.js';

export default class Component {
  constructor(props = {}) {
    // 컴포넌트는 객체 생성시 앱 내 유일 상태관리 객체 store를 인자로 받는다.
    // stateChange 이벤트를 항상 구독하며, 상태 갱신을 위해 render 함수를 호출한다.
    if(props.store instanceof Store) {
      props.store.events.subscribe('setState', () => this.render());
    }

    // 컴포넌트는 UI 매핑을 위해 element를 인자로 받는다.
    if(props.hasOwnProperty('element')) {
      this.element = props.element;
    }

    this.render = this.render || function() {}

    // 상속받은 컴포넌트들에서도 _언더바 메서드가 있다면,
    // 굳이 함수 내부를 들여다 보지 않고
    // 최대한 이름 그대로 이해하도록 설계.
    this._hide = this._hide || function() {
      this.element.setAttribute('style', 'display: none');
    }

    this._show = this._show || function() { 
      this.element.setAttribute('style', 'display: block'); 
    }

    this._disable = this._disable || function() {
      this.element.disabled = true;
    }

    this._enable = this._enable || function() {
      this.element.disabled = false;
    }
    
    this._addClass = this._addClass || function(el, className) {
      el.classList.add(className);
    }

    this._removeClass = this._removeClass || function(el, className) {
      if(el.classList.contains(className)) el.classList.remove(className);
    }
        
    // MEMO 에 캐시해두었던 이미지객체를 교체
    // 기존 이미지 파일 지우고 다시 만듬.
    // innerHTML이 간편하지만 동일한 이미지 파일이라도 request 중복 발생함
    this._renderImageFromMemo = this._renderImageFromMemo || function(el, newImage) {
      const prevImage = el.querySelector('img');
      if(prevImage) el.removeChild(prevImage);
      el.appendChild(newImage);
    }
  }
}