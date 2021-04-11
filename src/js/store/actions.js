export default {
  setPhotoList(context, payload) {
    context.reducer('setPhotoList', payload);
  },
  setCurrentIndex(context, payload) {
    context.reducer('setCurrentIndex', payload);
  }
};