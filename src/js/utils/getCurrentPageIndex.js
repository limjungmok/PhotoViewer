import getQuotient from './getQuotient.js';

// 현재 페이지의 기준점을 잡아줌
// 1  -> (1 % 10)  -> 1
// 33 -> (33 % 10) -> 3
// 49 -> (49 % 10) -> 9
const getCurrentPageIndex = (current, limit) => {
  return getQuotient(current, limit) * limit;
};

export default getCurrentPageIndex;