<template>
	<ul class="comments">
		<!-- comments props 데이터를 컴포넌트에 주입 -->
		<li v-for="comment in comments" :key="comment.id">
			<!-- HTML DOM 대신 CommentItem 컴포넌트 사용 -->
			<comment-item :comment="comment" @edit="onEdit" @delete="onDelete" />
		</li>
		<!-- 댓글이 없는 경우 '입력된 댓글이 없습니다' 라는 문구 노출 -->
		<li v-if="comments.length <= 0">
			입력된 댓글이 없습니다.
		</li>
	</ul>
</template>

<script>
import CommentItem from '@/components/CommentItem.vue';

import { mapActions } from 'vuex';

export default {
	name: 'CommentList',
	components: {
		CommentItem,
	},
	props: {
		comments: {
			type: Array,
			dafault() {
				return [];
			},
		},
	},
	methods: {
		...mapActions(['editComment', 'deleteComment']),
		onEdit({ id, comment }) {
			this.editComment({ commentId: id, comment })
				.then(() => {
					alert('댓글 내용이 수정되었습니다.');
				})
				.catch(err => {
					if (err.response.status === 401) {
						alert('로그인이 필요합니다.');
						this.$router.push({ name: 'Signin' });
					} else {
						alert(err.response.data.msg);
					}
				});
		},
		onDelete(commentId) {
			this.deleteComment(commentId)
				.then(() => {
					alert('댓글이 삭제되었습니다.');
				})
				.catch(err => {
					// 삭제 실패시, 상황에 따라 분기
					if (err.response.status === 401) {
						alert('로그인이 필요합니다.');
					} else {
						alert(err.response.data.msg);
					}
				});
		},
	},
};
</script>

<style></style>
