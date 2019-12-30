import utils from './utils/index.js';
import store from './store/index.js';
// components
import PhotoList from './components/PhotoList.js';
import PhotoViewer from './components/PhotoViewer.js';
import PrevPaginateButton from './components/PrevPaginateButton.js';
import NextPaginateButton from './components/NextPaginateButton.js';
import PrevPhotoButton from './components/PrevPhotoButton.js';
import NextPhotoButton from './components/NextPhotoButton.js';

const API_PATH = '../../json/sample.json';
const { 
  deepCopy, 
  fetchData, 
  getHashCode 
} = utils;

// sample 받은뒤, deepCopy 실행.
// 필요없는 property 제거 
const getRefinedData = (data) => {
  const refinedData = deepCopy(data);
  refinedData.items.map(item => {
    Object.defineProperty(item, 'id', { // 이 앱에서는 굳이 id값을 쓰지 않아도 되지만, 추후를 위해 미리 만들어둠.
      value: getHashCode()              // index 대신 사용할 유니크한 ID값. (실제로는 서버에서 보내주는 UUID정도)
    });
    delete item['index'];               // 나중에 index 를 그대로 쓰는건 리스크가 있음.
    delete item['imgDesc'];
    delete item['originURL'];
  });

  delete refinedData['code'];
  delete refinedData['imageCount'];
  delete refinedData['type'];

  return refinedData;
};

const App = (function() {
  'use strict';
  // components 인스턴스들 생성 (component에서는 'setState'이벤트를 subscirbe)
  const photoList = new PhotoList();
  const photoViewer = new PhotoViewer();
  const prevPaginateButton = new PrevPaginateButton();
  const nextPaginateButton = new NextPaginateButton();
  const prevPhotoButon = new PrevPhotoButton();
  const nextPhotoButton = new NextPhotoButton();

  // 초기 data ajax call
  new Promise((resolve, reject) => {
    fetchData(API_PATH, response => {
      const data = JSON.parse(response);
      // 앱에 맞게 데이터 정제
      resolve(getRefinedData(data));
    });
  }).then((refinedData) => {
    const { items } = refinedData;
    // 데이터 dispatch. -> Proxy setState -> 자동으로 render함수 호출
    store.dispatch('setPhotoList', { items });
  });
})();