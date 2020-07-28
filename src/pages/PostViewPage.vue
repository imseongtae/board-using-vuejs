<template>
	<div class="post-view-page">
		<!-- 게시물 데이터가 있는 경우에 컴포넌트가 노출됨 -->
		<!-- post 변수에 접근하려고 할 때 이 변수가 null 값이 아니도록 조치 필요 -->
		<!-- 이를 위해 v-if 디렉티브 할당 -->
		<post-view v-if="post" :post="post" />
		<p v-else>게시글 불러오는 중</p>
		<router-link :to="{ name: 'PostListPage' }">목록</router-link>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import PostView from '@/components/PostView.vue';

export default {
	name: 'PostViewPage',
	components: {
		PostView,
	},
	props: {
		// PostViewPage 컴포넌트의 path에 정의한 동적 세그먼트 값 postId에 대한 props 값을 설정
		// this.postId와 같은 문법으로 라우트의 파라미터에 접근 가능
		postId: {
			type: String,
			required: true,
		},
	},
	created() {
		this.fetchPost(`/${this.postId}`).catch(err => {
			alert(err.response.data.msg);
			this.$router.back();
		});
	},
	computed: {
		// 헬퍼함수를 통해 컴포넌트의 데이터에 post 매핑
		...mapState(['post']),
	},
	methods: {
		// 헬퍼함수를 컴포넌트 메소드에 매핑
		...mapActions(['fetchPost']),
	},
};
</script>

<style lang="scss" scoped></style>
