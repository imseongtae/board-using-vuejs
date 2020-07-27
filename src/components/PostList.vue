<template>
	<div>
		<table>
			<colgroup>
				<col style="width: 10%;" />
				<col style="width: 60%;" />
				<col style="width: 10%;" />
				<col style="width: 20%;" />
			</colgroup>
			<thead>
				<tr>
					<th scope="col">번호</th>
					<th scope="col">제목</th>
					<th scope="col">작성자</th>
					<th scope="col">작성일</th>
				</tr>
			</thead>
			<tbody>
				<!-- 예제 게시물 내용 작성 -->
				<tr v-for="post in posts" :key="post.id">
					<!-- 게시물 번호 -->
					<td scope="col">{{ post.id }}</td>
					<!-- 게시물 제목과 댓글 수 -->
					<td scope="col">
						<router-link :to="{ name: 'PostListPage' }">{{
							post.title
						}}</router-link>
						[{{ post.comments.length }}]
					</td>
					<!-- 게시물작성자 -->
					<td scope="col">{{ post.user.name }}</td>
					<!-- 게시물 작성일 -->
					<td scope="col">{{ post.createdAt }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'PostList',
	props: {
		posts: {
			type: Array,
		},
	},
};
</script>

<style></style>
