import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Vuex 인스턴스를 Vue 인스턴스에 store 옵션을 통해 주입

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
