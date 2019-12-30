import utils from '../utils/index.js';
import Component from '../lib/component.js';
import store from '../store/index.js';
import getImageElement from '../templates/PhotoImage.js';
const DEFAULT_IMAGE_URL = './public/images/no_image.png';
const { 
  getRemainder, 
  getCurrentPageIndex,
  getPrevPageIndex,
  getNextPageIndex,
  debounce,
  isEqual,
  isEmpty
} = utils;

export default class PhotoList extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.PhotoList')
    });
    // Network 탭의 img request를 방지하기 위해 MEMO를 만듬.
    // 중복된 이미지에 대해 브라우저 캐시를 활용하는것보다
    // 요청자체를 줄이는 것이 확장성에 의미가 있다고 생각했음.
    // if 10개-> 100개 된다면 ?
    // if 무한스크롤로 바꾸고싶다면 ? 
    this._MEMO = {};
    // li elements
    this._currentElements = this.element.querySelectorAll('._current');
    this._prevElements = this.element.querySelectorAll('._prev');
    this._nextElements = this.element.querySelectorAll('._next');
    // event binding
    this.handleClick = debounce(this.handleClick.bind(this)); // debounce delay는 default parameter 걸어둠
    this.element.addEventListener('click', this.handleClick);
  }
  
  // 이 앱에서는 페이지단위로 인덱스를 찾아 실제 인덱스값을 찾기때문에 굳이 ID값을 이중으로 쓸 필요가 없음.
  handleClick(e) {
    e.preventDefault();
    // 하위 li 요소에만 이벤트 델리게이션
    if(!e.target.classList.contains('photo_item') || !e.target.children.length) return; 
    const { currentIndex, limit } = store.state;
    // 실질적으로는 ._current 중의 인덱스만 찾으면 됌.
    const selectedIndex = Array.prototype.slice.call(this._currentElements).indexOf(e.target); 
    // 현재 페이지 인덱스 범위.
    const currentPageIndex = getCurrentPageIndex(currentIndex, limit); 
    // 실제 인덱스값
    const value = selectedIndex + currentPageIndex;
    // 같은 아이템을 클릭한것인지 체크
    if(!isEqual(currentIndex, value)) {
      store.dispatch('setCurrentIndex', { value });
    }
  }
  
  // dataset id 추출
  getDataId(el) { 
    return el.dataset.id;
  }

  getUrl(photo) {
    return photo ? photo.thumbURL : DEFAULT_IMAGE_URL;
  }

  // 현재 페이지 기준으로 선택된 인덱스를 반환.
  // 항상(0 ~ 9)사이값을 반환
  // if 43 -> 나머지 3 반환
  getSelectedtIndexFromPage(current, limit) { 
    return getRemainder(current, limit);
  }
  
  // image Reqeust 를 제거하기위해 캐싱
  getImageElement(photos, pageIndex, limit) {
    if(!this._MEMO[pageIndex]) {
      const slicedPhotos = photos.slice(pageIndex, pageIndex + limit);
      this._MEMO[pageIndex] = [];

      slicedPhotos.map((photo) => {
        const imageElement = getImageElement(this.getUrl(photo));
        this._MEMO[pageIndex].push(imageElement);
      });
    }
    return this._MEMO[pageIndex];
  }

  _toggleSelected(el, selectedIndex, index) {
    if(isEqual(selectedIndex, index)) {
      this._addClass(el, 'is_selected');
    } else {
      this._removeClass(el, 'is_selected');
    }
  }

  render() {
    const { items, currentIndex, limit } = store.state;
    // if currentIndex = 43
    const currentPageIndex = getCurrentPageIndex(currentIndex, limit); // 40
    const prevPageIndex = getPrevPageIndex(currentIndex, limit); // 30
    const nextPageIndex = getNextPageIndex(currentIndex, limit); // 50

    // 메모이제이션에 담겨있는 DOM(image) 배열 가져옴
    const currentPhotos = this.getImageElement(items, currentPageIndex, limit); // photos[40 ~ 50] <- MEMO[40]
    const prevPhotos = this.getImageElement(items, prevPageIndex, limit);       // photos[30 ~ 40] <- MEMO[30]
    const nextPhotos = this.getImageElement(items, nextPageIndex, limit);       // photos[50 ~ 60] <- MEMO[50]

    // 현재 페이지 기준에서 선택된 인덱스를 가져옴
    const selectedIndex = this.getSelectedtIndexFromPage(currentIndex, limit); // 3

    // 현재 페이지 리스트 나열
    // 이전 목록이 없으면 굳이 N번 돌지 않음
    if(!isEmpty(currentPhotos)) {
      // li.photo_item._current (10개)
      Array.prototype.map.call(this._currentElements, (el, index) => {
        if(currentPhotos[index]) {
          // MEMO 에 캐시해두었던 이미지객체를 하나씩 돔에 그려줌
          this._renderImageFromMemo(el, currentPhotos[index]);
        }
        // .is_selected 클래스 on/off
        this._toggleSelected(el, selectedIndex, index);
      });
    }

    // 이전 페이지 리스트 나열
    // 이전 목록이 없으면 굳이 N 번 돌지않음.
    if(!isEmpty(prevPhotos)) {
      // li.photo_item._prev (10개)
      Array.prototype.map.call(this._prevElements, (el, index) => {
        if(prevPhotos[index]) {
          // MEMO 에 캐시해두었던 이미지객체를 하나씩 돔에 그려줌
          this._renderImageFromMemo(el, prevPhotos[index]);
        }
      });
    }
    
    // 다음 페이지 리스트 나열
    // 다음 목록이 없으면 굳이 N 번 돌지않음.
    if(!isEmpty(nextPhotos)) {
      // li.photo_item._next (10개)
      Array.prototype.map.call(this._nextElements, (el, index) => {
        if(nextPhotos[index]) {
          // MEMO 에 캐시해두었던 이미지객체를 하나씩 돔에 그려줌
          this._renderImageFromMemo(el, nextPhotos[index]);
        } 
      });
    }

  }
};