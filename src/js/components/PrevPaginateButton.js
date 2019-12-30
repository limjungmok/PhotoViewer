import utils from '../utils/index.js';
import Component from '../lib/component.js';
import store from '../store/index.js';
const { 
  getPrevPageIndex,
  debounce 
} = utils;

export default class PrevPaginateButton extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.PrevPaginateButton')
    });
    
    this.handleClick = debounce(this.handleClick.bind(this), 100);
  }

  handleClick(e) {
    e.preventDefault();
    const { currentIndex, limit } = store.state;
    const value = getPrevPageIndex(currentIndex, limit); 
    // 이전 페이지의 기준점을 구함 (20 ~ 29) -> 항상 10
    store.dispatch('setCurrentIndex', { value });
  }

  // 0 ~ 9 인덱스는 같은 페이지이며 첫 페이지에 위치해있음.
  // (0 ~ 9) < 10 
  isFirstPage(index, limit) {
    return (index < limit) ? true : false;
  }

  render() {
    const { currentIndex, limit } = store.state; 
    if(this.isFirstPage(currentIndex, limit)) { // 첫번째 페이지일 경우
      this.element.removeEventListener('click', this.handleClick);
      this._disable();
    } else {
      // 매번 추가하는것 같지만 실제 매커니즘은 그렇지않음
      this.element.addEventListener('click', this.handleClick);
      this._enable();
    }
  }
};