<template>
	<div class="app-header">
		<h1>Community</h1>
		<div v-if="isAuthorized">
			<strong>
				<!-- <button>사용자님 환영합니다.</button> -->
				<button @click="toggle">
					{{ me.name }} 님 환영합니다.
					<!-- isActive 값에 따라 변경되는 화살표 아이콘 추가 -->
					<i v-if="!isActive" class="fas fa-sort-down"></i>
					<i v-else class="fas fa-sort-up"></i>
				</button>
			</strong>
			<!-- isActive 가 true 일때만 보이는 박스 UI를 추가 -->
			<ul v-if="isActive">
				<li><button @click="onClickSignout">로그아웃</button></li>
			</ul>
		</div>
		<div v-else>
			<!-- 비로그인 상태라면 로그인 버튼 노출 -->
			<router-link :to="{ name: 'Signin' }">로그인</router-link>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
	name: 'AppHeader',
	data() {
		return {
			isActive: false,
		};
	},
	computed: {
		// isAuthorized 게터 등록
		...mapGetters(['isAuthorized']),
		// state의 me 상태 추가
		...mapState(['me']),
	},
	methods: {
		toggle() {
			// toggle 메서드가 호출되면 isActive의 값은 반전됨
			this.isActive = !this.isActive;
		},
		onClickSignout() {
			this.signout();
			// PostListPage로 이동시킴
			this.$router.push({ name: 'PostListPage' });
		},
		// mapActions 헬퍼함수를 이용해 signout 액션 등록
		...mapActions(['signout']),
	},
};
</script>

<style></style>
