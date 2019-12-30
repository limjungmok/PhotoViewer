import Component from '../lib/component.js';
import store from '../store/index.js';
import getImageElement from '../templates/PhotoImage.js';
const DEFAULT_IMAGE_URL = './public/images/no_image.png';

export default class PhotoViewer extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.PhotoViewer')
    });
    // Network 탭의 img request를 방지하기 위해 MEMO를 만듬.
    // 중복된 이미지에 대해 브라우저 캐시를 활용하는것보다
    // 요청자체를 줄이는 것이 확장성에 의미가 있다고 생각했음.
    // if 10개-> 100개 된다면 ?
    // if 무한스크롤로 옵션값만 바꾸고싶다면 ?
    this._MEMO = {};
    // li.viewer_item
    this._currentViewer = this.element.querySelector('._current');
    this._prevViewer = this.element.querySelector('._prev');
    this._nextViewer = this.element.querySelector('._next');
  }

  getUrl(photo) {
    return photo ? photo.viewURL : DEFAULT_IMAGE_URL;
  }

  // image Reqeust 를 제거하기위해 캐싱
  getImageElement(photos, index) {
    if(!this._MEMO[index]) {
      const imageElement = getImageElement(this.getUrl(photos[index]));
      this._MEMO[index] = imageElement;
    } 
    return this._MEMO[index];
  }

  render() {
    const { items, currentIndex } = store.state;
    // MEMO 에 담긴 image 엘리먼트들 가져오기.
    const currentPhotos = this.getImageElement(items, currentIndex);
    const prevPhotos = this.getImageElement(items, currentIndex - 1);
    const nextPhotos = this.getImageElement(items, currentIndex + 1);
    // DOM 객체를 li 요소에 추가해줌.
    // 상위 component delegation 메서드
    this._renderImageFromMemo(this._currentViewer, currentPhotos);
    this._renderImageFromMemo(this._prevViewer, prevPhotos);
    this._renderImageFromMemo(this._nextViewer, nextPhotos);
  }
};