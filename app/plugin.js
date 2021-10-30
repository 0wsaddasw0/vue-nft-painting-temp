import nftpainting from './views/home.vue';
nftpainting.install = function(Vue) {
  Vue.component(nftpainting.name, nftpainting);
};
export default nftpainting;