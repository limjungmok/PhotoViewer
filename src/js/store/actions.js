export default {
  setPhotoList(context, payload) {
    context.commit('setPhotoList', payload);
  },
  setCurrentIndex(context, payload) {
    context.commit('setCurrentIndex', payload);
  }
};