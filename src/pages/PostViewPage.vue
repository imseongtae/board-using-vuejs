<template>
	<div class="post-view-page">
		<!-- 게시물 데이터가 있는 경우에 컴포넌트가 노출됨 -->
		<!-- post 변수에 접근하려고 할 때 이 변수가 null 값이 아니도록 조치 필요 -->
		<!-- 이를 위해 v-if 디렉티브 할당 -->
		<post-view v-if="post" :post="post" />
		<p v-else>게시글 불러오는 중</p>
		<router-link :to="{ name: 'PostEditPage', params: { postId } }"
			>수정</router-link
		>
		<button @click="onDelete">삭제</button>
		<router-link :to="{ name: 'PostListPage' }">목록</router-link>
		<!-- 댓글 목록 등록 -->
		<comment-list v-if="post" :comments="post.comments" />
		<!-- 등록된 컴포넌트와 submit의 이벤트 리스터를 Template에 추가 -->
		<comment-form @submit="onCommentSubmit" />
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import PostView from '@/components/PostView.vue';
import CommentList from '@/components/CommentList.vue';
import CommentForm from '@/components/CommentForm.vue';

import api from '@/api';

export default {
	name: 'PostViewPage',
	components: {
		PostView,
		CommentList,
		CommentForm,
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
		// isAuthorized를 통해 로그인 여부 검사
		...mapGetters(['isAuthorized']),
	},
	methods: {
		// 헬퍼함수를 컴포넌트 메소드에 매핑
		...mapActions(['fetchPost', 'createComment']),
		onDelete() {
			// mapState 헬퍼함수를 통해 매핑된 post의 id 값을 변수에 할당
			const { id } = this.post;
			console.log(id);
			api
				.delete(`/posts/${id}`)
				.then(() => {
					// 게시글 삭제 성공 시, 성공에 대한 메시지 노출
					alert('게시물이 삭제됨');
					// 더 이상 노출된 메시지가 없으므로 리스트로 이동
					this.$router.push({ name: 'PostListPage' });
				})
				.catch(err => {
					if (err.response.status === 401) {
						// HTTP 상태코드가 401인 경우 로그인 안내 메시지 출력
						alert('로그인이 필요합니다.');
						// 로그인 페이지로 이동
						this.$router.push({ name: 'Signin' });
					} else {
						// HTTP 상태코드가 401이 아닌 경우 서버에서 내려준 메시지를 노출
						alert(err.response.data.msg);
					}
				});
		},
		onCommentSubmit(comment) {
			//
			if (!this.isAuthorized) {
				// 인증되지 않은 사용자는 경고 메시지와 함께 로그인 페이지로 이동
				alert('로그인이 필요함');
				this.$router.push({ name: 'Signin' });
			} else {
				// 로그인한 사용자의 경우 액션을 통해 API 서버 호출
				this.createComment(comment)
					.then(() => {
						alert('댓글이 성공적으로 작성되었음');
					})
					.catch(err => {
						alert(err.response.data.msg);
					});
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
