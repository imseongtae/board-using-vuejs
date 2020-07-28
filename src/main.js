import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Vuex 인스턴스를 Vue 인스턴스에 store 옵션을 통해 주입
import Cookies from 'js-cookie';

Vue.config.productionTip = false;

// 쿠키에 저장된 토큰을 사용하여 인증
// 쿠키에서 토큰을 검사하는 과정은 애플리케이션 초키화될 때 필요하므로 main.js 파일에 작성
const savedToken = Cookies.get('accessToken');
if (savedToken) {
	store.dispatch('signinByToken', savedToken);
}

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
