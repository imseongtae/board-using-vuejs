export default {
	isAuthorized(state) {
		// 토큰이 존재하고, me 사용자의 데이터가 있으면 true 반환
		return state.accessToken.length > 0 && !!state.me;
	},
};
