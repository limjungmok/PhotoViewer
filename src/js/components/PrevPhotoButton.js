import utils from '../utils/index.js';
import Component from '../lib/component.js';
import store from '../store/index.js';
const { debounce } = utils;

export default class PrevPhotoButton extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.PrevPhotoButton')
    });

    this.handleClick = debounce(this.handleClick.bind(this)); // debounce delay는 default parameter 걸어둠
  }

  handleClick(e) {
    e.preventDefault();
    const { currentIndex } = store.state;
    const value = currentIndex - 1; 
    // 항상 현재 인덱스 - 1
    store.dispatch('setCurrentIndex', { value });
  }

  isFirstItem(index) {
    return (index < 1) ? true : false;
  }

  render() {
    const { currentIndex } = store.state;
    if(this.isFirstItem(currentIndex)) { // 첫번째 사진일 경우
      this.element.removeEventListener('click', this.handleClick);
      this._hide();
    } else {
      // 매번 추가하는것 같지만 실제 매커니즘은 그렇지않음
      this.element.addEventListener('click', this.handleClick);
      this._show();
    }
  }
};