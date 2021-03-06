import api from '@/api';
import {
	FETCH_POST_LIST,
	FETCH_POST,
	SET_ACCESS_TOKEN,
	SET_MY_INFO,
	DESTROY_ACCESS_TOKEN,
	DESTROY_MY_INFO,
	UPDATE_COMMENT,
	EDIT_COMMENT,
	DELETE_COMMENT,
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
		return api
			.post('/auth/signin', { email, password })
			.then(res => {
				const { accessToken } = res.data;
				// 요청이 성공적으로 종료되어 토큰을 받았다면 SET_ACCESS_TOKEN 변이를 커밋
				commit(SET_ACCESS_TOKEN, accessToken);

				// 2. 토큰을 스토어에 저장하면 api모듈의 headers에 토큰이 저장되므로 바로 사용자 정보를 불러올 수 있다.
				return api.get('/users/me');
			})
			.then(res => {
				// 3. 사용자 정보 요청이 성공했다면 변이를 사용하여 스토어에 사용자 정보를 저장
				commit(SET_MY_INFO, res.data);
			});
	},
	signinByToken({ commit }, token) {
		// 1. 토큰을 스토어에 커밋한다.
		commit(SET_ACCESS_TOKEN, token);
		// 2. 사용자의 정보를 받아온 후 스토어에 커밋
		return api.get('/users/me').then(res => {
			commit(SET_MY_INFO, res.data);
		});
	},
	signout({ commit }) {
		// signin의 반대 작업
		// DESTROY_ACCESS_TOKEN 과 DESTROY_MY_INFO 변이를 하나의 signout action으로 정의
		commit(DESTROY_ACCESS_TOKEN);
		commit(DESTROY_MY_INFO);
	},
	createComment({ commit, state }, comment) {
		// 현재 포스팅의 ID를 상태에 접근해서 가져옴
		const postId = state.post.id;
		return api
			.post(`/posts/${postId}/comments`, { contents: comment })
			.then(res => {
				commit(UPDATE_COMMENT, res.data);
			});
	},
	// 댓글 수정 API를 요청하기 위해선 게시물 id, 댓글 id, 수정된 댓글 내용까지 3개의 데이터가 필요함
	editComment({ commit, state }, { commentId, comment }) {
		const postId = state.post.id;
		return api
			.put(`/posts/${postId}/comments/${commentId}`, {
				contents: comment,
			})
			.then(res => {
				commit(EDIT_COMMENT, res.data);
			});
	},
	deleteComment({ commit, state }, commentId) {
		const postId = state.post.id;
		return api.delete(`/posts/${postId}/comments/${commentId}`).then(() => {
			commit(DELETE_COMMENT, commentId);
		});
	},
};
