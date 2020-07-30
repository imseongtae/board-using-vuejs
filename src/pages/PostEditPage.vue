<template>
	<div class="post-edit-page">
		<h1>게시물 수정</h1>
		<post-edit-form v-if="post" :post="post" @submit="onSubmit" />
		<!-- 게시물이 없는 경우 -->
		<p v-else>게시물 불러오는 중</p>
	</div>
</template>

<script>
import PostEditForm from '@/components/PostEditForm.vue';

// 비로그인 상태에서 게시물 수정 시도 : 로그인 안내하며 로그인 페이지로 이동
// 게시물 제목 없이 작성 시도 : 미입력 안내
// 게시물 제목은 있지만 내용 없이 작성시도 : 미입력 안내
// 255자, 500자 테스트
//

import { mapState } from 'vuex';

import api from '@/api';

export default {
	name: 'PostEditPage',
	components: {
		PostEditForm,
	},
	props: {
		// 라우터의 파라미터를 받아오기 위한 props를 선언
		postId: {
			type: String,
			required: true,
		},
	},
	computed: {
		// PostEditPage beforeEnter 훅에서 저장한 게시물 정보를 가져옴
		...mapState(['post']),
	},
	created() {
		console.log(this.post);
	},
	methods: {
		onSubmit(payload) {
			// console.log(payload);
			const { title, contents } = payload;
			// put 메소드를 사용해 서버로 게시물 데이터를 전송
			api
				.put(`/posts/${this.postId}`, { title, contents })
				.then(res => {
					// 게시물 수정에 성공했다면 사용자를 다시 게시물 페이지로 이동
					alert('게시물 수정 완료');
					this.$router.push({
						name: 'PostViewPage',
						params: { postId: res.data.id.toString() },
					});
				})
				.catch(err => {
					if (err.response.status === 401) {
						// 비로그인 사용자가 게시물 수정을 시도했을 때 로그인 페이지로 이동시킴
						alert('로그인이 필요합니다.');
						this.$router.push({ name: 'Signin' });
					} else if (err.response.status === 403) {
						// 사용자가 게시물을 수정할 권한이 없다면 이전 페이지로 이동시킴
						alert(err.response.data.msg);
						this.$router.back();
					} else {
						// 그 외의 경우 서버에서 보내준 에러 메시지 노출
						alert(err.response.data.msg);
					}
				});
		},
	},
};
</script>

<style></style>
