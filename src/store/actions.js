import api from '@/api';
import {
	FETCH_POST_LIST,
	FETCH_POST,
	SET_ACCESS_TOKEN,
} from './mutations-types';

// API 서버와 통신을 통해 변이를 일으킬 액션
export default {
	fetchPostList({ commit }) {
		// 서버로부터 받아온 데이터를
		// FETCH_POST_LIST 변이의 실행과 함께 인자로 넘겨줌
		return api.get('/posts').then(res => {
			commit(FETCH_POST_LIST, res.data);
		});
	},
	fetchPost({ commit }, postId) {
		// 인자로 받은 postId를 URI에 포함
		return api.get(`/posts/${postId}`).then(res => {
			// 받아온 데이터와 함께 FETCH_POST 변이 실행
			commit(FETCH_POST, res.data);
		});
	},
	signin({ commit }, payload) {
		// 1. Signin 컴포넌트 onSubmit 메서드의 내용을 그대로 작성한다.
		const { email, password } = payload;
		return api.post('/auth/signin', { email, password }).then(res => {
			const { accessToken } = res.data;
			// 요청이 성공적으로 종료되어 토큰을 받았다면 SET_ACCESS_TOKEN 변이를 커밋
			commit(SET_ACCESS_TOKEN, accessToken);
		});
	},
};
