import utils from '../utils/index.js';
import Component from '../lib/component.js';
import store from '../store/index.js';
const { 
  getQuotient,
  getNextPageIndex,
  debounce
} = utils;

export default class NextPaginateButton extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.NextPaginateButton')
    });

    this.handleClick = debounce(this.handleClick.bind(this), 100);
  }

  handleClick(e) {
    e.preventDefault();
    const { currentIndex, limit } = store.state;
    const value = getNextPageIndex(currentIndex, limit);
    // 다음 페이지의 기준점을 구함 (20 ~ 29 -> 항상 30)
    store.dispatch('setCurrentIndex', { value });
  }
  
  // 70 ~ 79 인덱스는 같은 페이지이며 마지막 페이지에 위치해있음.
  // (70 / 10) === (73 / 10) 
  isLastPage(index, photoLegth, limit) {
    return getQuotient(index, limit) === getQuotient(photoLegth, limit) ? true : false;
  }

  render() {
    const { items, currentIndex, limit } = store.state;
    if(this.isLastPage(currentIndex, items.length, limit)) { // 마지막 페이지일 경우
      this.element.removeEventListener('click',this.handleClick);
      this._disable();
    } else {
      // 매번 추가하는것 같지만 실제 매커니즘은 그렇지않음
      this.element.addEventListener('click', this.handleClick);
      this._enable();
    }
  }
};