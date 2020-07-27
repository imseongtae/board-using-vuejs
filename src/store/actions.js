import api from '@/api';
import { FETCH_POST_LIST } from './mutations-types';

export default {
	fetchPostList({ commit }) {
		// api.get('/posts').then(res => {
		// 	console.log(res.data);
		// 	this.posts = res.data;
		// });
		// 서버로부터 받아온 데이터를
		// FETCH_POST_LIST 변이의 실행과 함께 인자로 넘겨줌
		return api.get('/posts').then(res => {
			commit(FETCH_POST_LIST, res.data);
		});
	},
};
