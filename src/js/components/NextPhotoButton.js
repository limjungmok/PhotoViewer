import utils from '../utils/index.js';
import Component from '../lib/component.js';
import store from '../store/index.js';
const { debounce } = utils;

export default class NextPhotoButton extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.NextPhotoButton')
    });
    
    this.handleClick = debounce(this.handleClick.bind(this)); // debounce delay는 default parameter 걸어둠
  }

  handleClick(e) {
    e.preventDefault();
    const { currentIndex } = store.state;
    const value = currentIndex + 1; 
    // 항상 현재 인덱스 + 1
    store.dispatch('setCurrentIndex', { value });
  }

  isLastItem(index, length) {
    return (index === length - 1) ? true : false;
  }

  render() {
    const { items, currentIndex } = store.state;
    if(this.isLastItem(currentIndex, items.length)) { // 마지막 사진일 경우
      this.element.removeEventListener('click', this.handleClick);
      this._hide();
    } else {
      // 매번 추가하는것 같지만 실제 매커니즘은 그렇지않음
      this.element.addEventListener('click', this.handleClick);
      this._show();
    }
  }  
};