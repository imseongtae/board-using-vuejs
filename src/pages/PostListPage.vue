<template>
	<div class="post-list-page">
		<h1>포스트 게시글</h1>
		<post-list :posts="posts" />
	</div>
</template>

<script>
import PostList from '@/components/PostList.vue';

import api from '@/api';

export default {
	name: 'PostListPage',
	components: {
		PostList,
	},
	data() {
		return {
			posts: [],
		};
	},
	created() {
		api.get('/posts').then(res => {
			console.log(res.data);
			this.posts = res.data;
		});
	},
};
</script>

<style lang="scss"></style>
