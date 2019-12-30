import getCurrentPageIndex from './getCurrentPageIndex.js';

// 다음 페이지의 기준점을 잡아줌
// 4  -> (4 /10) * 10   -> 0  + 10 > 10
// 33 -> (33 / 10) * 10 -> 30 + 10 > 40
// 49 -> (49 / 10) * 10 -> 40 + 10 > 50
const getNextPageIndex = (current, limit) => {
  return getCurrentPageIndex(current, limit) + limit;
};

export default getNextPageIndex;