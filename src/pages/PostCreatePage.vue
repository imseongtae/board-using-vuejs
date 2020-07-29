<template>
	<div class="post-create-page">
		<h3>게시물 작성하기</h3>
		<post-create-form @submit="onSubmit" />
	</div>
</template>

<script>
import PostCreateForm from '@/components/PostCreateForm.vue';

// api 모듈 추가
import api from '@/api';

export default {
	name: 'PostCreatePage',
	components: {
		PostCreateForm,
	},
	methods: {
		onSubmit(payload) {
			// console.log(payload);
			const { title, contents } = payload;
			// 2 /api/posts 엔드 포인트로 통신 시작
			api
				.post('/posts', { title, contents })
				.then(res => {
					alert('게시물이 성공적으로 작성되었음');
					this.$router.push({
						name: 'PostViewPage',
						params: { postId: res.data.id.toString() },
					});
				})
				.catch(err => {
					// 게시물 작성에 실패한 경우
					if (err.response.status === 401) {
						// HTTP 상태코드가 401 UnAuthorized 라면 사용자를 로그인 페이지로 이동시킴
						alert('로그인이 필요함');
						this.$router.push({ name: 'Signin' });
					} else {
						// 그 외의 경우 서버가 응답으로 내려준 에러 메시지를 사용자에게 노출시킨다.
						alert(err.response.data.msg);
					}
				});
		},
	},
};
</script>

<style></style>
