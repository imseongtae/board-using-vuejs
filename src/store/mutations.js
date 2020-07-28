// 추가한 스토어의 값을 변경할 수 있는 변이(Mutation) 추가
// mutations-types 에 선언한 변이 이름을 불러와서 사용하도록 함
import { FETCH_POST_LIST, FETCH_POST } from './mutations-types';

export default {
	[FETCH_POST_LIST](state, posts) {
		state.posts = posts;
	},
	[FETCH_POST](state, post) {
		state.post = post;
	},
};
