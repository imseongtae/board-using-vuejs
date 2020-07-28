<template>
	<div class="sign-up-page">
		<h3>회원가입 페이지</h3>
		<signup-form @submit="onSubmit" />
		<!-- 로그인 페이지가 없으므로 임의로 Signup 컴포넌트 부여 -->
		<p>
			이미 가입하셨나요?
			<router-link :to="{ name: 'Signup' }">로그인하러 가기</router-link>
		</p>
	</div>
</template>

<script>
import SignupForm from '@/components/SignupForm.vue';

import api from '@/api';

export default {
	name: 'Signup',
	components: {
		SignupForm,
	},
	methods: {
		onSubmit(payload) {
			// payload를 통해 사용자가 입력한 정보 확인
			console.log(payload);
			const { email, password, name } = payload;
			api
				.post('/auth/signup', { email, password, name })
				.then(res => {
					alert('회원가입이 완료되었습니다.');
					console.log(res);
					this.$router.push('/');
				})
				.catch(err => {
					alert(err.response.data.msg);
				});
		},
	},
};
</script>

<style></style>
