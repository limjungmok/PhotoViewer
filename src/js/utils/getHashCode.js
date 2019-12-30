// 실제로는 서버에서 유니크한 ID값을 전송해줘야합니다.
// 단순히 주어진 index 값을 쓰는 리스크보다는 
// 앱이 시작될때마다 난수 해시를 발생시키는 쪽을 선택했습니다.
const getHashCode = () => {
  const hash = Math.random().toString(36).substring(3);
  return hash;
};

export default getHashCode;