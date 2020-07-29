import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Vuex 인스턴스를 Vue 인스턴스에 store 옵션을 통해 주입
import Cookies from 'js-cookie';

Vue.config.productionTip = false;

// 쿠키에 저장된 토큰을 사용하여 인증
// 쿠키에서 토큰을 검사하는 과정은 애플리케이션 초기화될 때 필요하므로 main.js 파일에 작성
// const savedToken = Cookies.get('accessToken');
// if (savedToken) {
// 이 액션은 비동기식으로 작동하며, Vue 인스턴스가 생성될 때
// signinByToken 액션이 완료됨을 보장하지 못한다. 즉, 서버와 통신하는 과정으로 인해 Vue 인스턴스 생성이 더 빠를 수 있다.
// store.dispatch('signinByToken', savedToken);
// }
// --- 비동기식 처리를 위한 함수를 작성 ---
const init = () => {
	const savedToken = Cookies.get('accessToken');
	if (savedToken) {
		// 저장된 토큰이 존재한다면 signinByToken 액션을 반환
		return store.dispatch('signinByToken', savedToken);
	} else {
		// 토큰이 존재하지 않는다면 바로 Promise를 성공시킴
		return Promise.resolve();
	}
};

init().then(() => {
	// init 함수의 then 체이닝 메소드 내부는 init 함수가 종료되었음을 보장받음
	new Vue({
		router,
		store,
		render: h => h(App),
	}).$mount('#app');
});
