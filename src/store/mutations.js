// 추가한 스토어의 값을 변경할 수 있는 변이(Mutation) 추가
// mutations-types 에 선언한 변이 이름을 불러와서 사용하도록 함
import {
	FETCH_POST_LIST,
	FETCH_POST,
	SET_ACCESS_TOKEN,
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
		}
	},
};
