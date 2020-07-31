<template>
	<div class="comment-item">
		<!-- CommentList 컴포넌트에 있던 사용자 이름 부분 재사용 -->
		<strong>{{ comment.user.name }}</strong>
		<span>{{ comment.createdAt }}</span>
		<!-- 댓글을 수정할 수 있는 textarea 태그와 수정완료 버튼 작성 -->
		<div v-if="isEditing">
			<textarea v-model="editMessage" rows="3"></textarea>
			<button @click="onEdit">수정완료</button>
		</div>
		<!-- 댓글의 내용은 isEditing이 false일 때만 노출 -->
		<p v-else>{{ comment.contents }}</p>
		<!-- 댓글 수정과 삭제 버튼 추가 -->
		<ul v-if="isMyComment">
			<li>
				<!-- <button @click="toggleEditMode">수정</button> -->
				<button @click="toggleEditMode">
					{{ editButtonText }}
				</button>
			</li>
			<li><button @click="onDelete">삭제</button></li>
		</ul>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
	name: 'CommentItem',
	// 컴포넌트 외부로부터 props 속성을 통해 댓글 데이터를 주입받음
	props: {
		comment: {
			type: Object,
			required: true,
			validator(comment) {
				const isValidCommentId = typeof comment.id === 'number';
				const isValidContents = comment.contents && comment.contents.length;
				const isValidUser = !!comment.user;
				return isValidCommentId && isValidContents && isValidUser;
			},
		},
	},
	data() {
		return {
			// 수정 모드와 읽기 모드를 구분할 수 있도록 isEditing 변수를 추가
			isEditing: false,
			// 댓글 수정 폼과 연동될 반응형 문자열 변수 선언
			editMessage: '',
		};
	},
	created() {
		console.log('me', this.me);
		console.log('comment', this.comment);
	},
	computed: {
		// 현재 로그인한 사용자의 정보를 스토어의 상태를 참조하여 가져옴
		...mapState(['me']),
		// 현재 로그인 여부를 확인하기 위해
		...mapGetters(['isAuthorized']),
		// 댓글 작성자와 현재 로그인한 사용자를 비교
		isMyComment() {
			return this.isAuthorized && this.comment.user.id === this.me.id;
		},
		editButtonText() {
			return this.isEditing ? '수정 취소' : '수정';
		},
		isValidComment() {
			// 수정된 댓글이 1자 이상 255자 이하면 참을 반환하고, 아니면 거짓을 반환
			return this.editMessage.length > 0 && this.editMessage.length < 256;
		},
	},
	methods: {
		toggleEditMode() {
			this.isEditing = !this.isEditing;
			// 수정 모드로 변할 때마다 댓글의 내용을 수정할 메시지에 바인딩
			if (this.isEditing) {
				this.editMessage = this.comment.contents;
			}
		},
		onEdit() {
			// 수정된 데이터가 유효할 경우에만 컴포넌트 외부로 데이터 노출
			// 유효성 isValidComment 를 통과해야만 edit 이벤트 실행
			if (this.isValidComment) {
				this.isEditing = false;
				const { id } = this.comment;
				this.$emit('edit', { id, comment: this.editMessage });
			} else {
				alert('댓글은 1자 이상 255자 이하여야 합니다.');
			}
		},
		onDelete() {
			const { id } = this.comment;
			// 이벤트 발생시, comment의 id값을 넘김
			this.$emit('delete', id);
		},
	},
};
</script>

<style></style>
