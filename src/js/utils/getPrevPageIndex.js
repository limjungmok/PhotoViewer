import getCurrentPageIndex from './getCurrentPageIndex.js';

// 이전 페이지의 기준점을 잡아줌
// 4  -> (4 /10) * 10   -> 0  - 10 > -10
// 33 -> (33 / 10) * 10 -> 30 - 10 > 20
// 49 -> (49 / 10) * 10 -> 40 - 10 > 30
const getPrevPageIndex = (current, limit) => {
  return getCurrentPageIndex(current, limit) - limit;
};

export default getPrevPageIndex;