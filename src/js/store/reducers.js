export default {
  setPhotoList(state, payload) {
    return {
      items: payload.items
    };
  },
  setCurrentIndex(state, payload) {
    return {
      currentIndex: payload.value
    };
  }
};