<template>
	<div class="sign-in-page">
		<h3>로그인</h3>
		<signin-form @submit="onSubmit" />
		<p>
			회원이 아니신가요?
			<router-link :to="{ name: 'Signup' }">회원가입하러 가기</router-link>
		</p>
	</div>
</template>

<script>
import SigninForm from '@/components/SigninForm.vue';

// 1. mapActions 헬퍼 함수 로드
import { mapActions } from 'vuex';

export default {
	name: 'Signin',
	components: {
		SigninForm,
	},
	methods: {
		onSubmit(payload) {
			// 기존 로직 삭제 후 Action으로 대체
			this.signin(payload)
				.then(() => {
					alert('로그인이 완료되었습니다.');
					this.$router.push({ name: 'PostListPage' });
				})
				.catch(err => {
					alert(err.response.data.msg);
				});
			// /auth/signin 엔드 포인트로 사용자가 입력한 값을 보낸다.
			// HTTP 헤더에 토큰을 실어주는 부분을 Mutations로 옮긴다.
			// 서버가 로그인을 처리한 후 토큰을 내려줌. res.data.accessToken로 확인 가능
			// console.log(res.data.accessToken);
			// HTTP 메시지의 헤더에 토큰 등록 필요함
			// api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
			// 사용자에게 로그인이 성공했음을 알려주고 메인 페이지로 이동
		},
		// 2. signin 액션을 컴포넌트에 등록
		...mapActions(['signin']),
	},
};
</script>

<style></style>
