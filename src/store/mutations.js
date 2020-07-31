import Cookies from 'js-cookie'; // 1. js-cookie 라이브러리를 불러옴

// 추가한 스토어의 값을 변경할 수 있는 변이(Mutation) 추가
// mutations-types 에 선언한 변이 이름을 불러와서 사용하도록 함
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

import api from '@/api';

export default {
	[FETCH_POST_LIST](state, posts) {
		state.posts = posts;
	},
	[FETCH_POST](state, post) {
		state.post = post;
	},
	[SET_ACCESS_TOKEN](state, accessToken) {
		// this.accessToken = accessToken;
		console.log(accessToken);
		// 서버가 로그인 처리한 후 토큰을 내려줌
		// HTTP 메시지의 헤더에 토큰을 등록 필요함
		// 스토어 상태의 토큰을 업데이트하고, api 모듈을 사용해 HTTP 헤더에 토큰을 심어줌
		if (accessToken) {
			state.accessToken = accessToken;
			api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
			// 2. 쿠키에 토큰을 저장
			Cookies.set('accessToken', accessToken);
		}
	},
	[SET_MY_INFO](state, me) {
		// 사용자 정보를 스토어 상태에 반영
		// 사용자 정보는 로그인이라는 과정 속에서 필요함
		if (me) {
			state.me = me;
		}
	},
	[DESTROY_ACCESS_TOKEN](state) {
		state.accessToken = '';
		delete api.defaults.headers.common.Authorization;
		Cookies.remove('accessToken');
	},
	[DESTROY_MY_INFO](state) {
		state.me = null;
	},
	[UPDATE_COMMENT](state, payload) {
		state.post.comments.push(payload);
	},
	[EDIT_COMMENT](state, payload) {
		// console.log('payload', payload);
		const { id: commentId, contents, updatedAt } = payload;
		// Array 자료형의 find 메서드를 사용하여 주입받은 아이디와 같은 아이디를 가진 댓글 객체를 찾는다
		const targetComment = state.post.comments.find(
			comment => comment.id === commentId,
		);
		targetComment.contents = contents;
		targetComment.updatedAt = updatedAt;
	},
	[DELETE_COMMENT](state, commentId) {
		const targetIndex = state.post.comments.findIndex(
			comment => comment.id === commentId,
		);
		state.post.comments.splice(targetIndex, 1);
	},
};
