<template>
	<div class="post-view">
		<div>
			<h1>{{ post.title }}</h1>
			<span>{{ post.id }}</span>
			<strong>{{ post.user.name }} {{ post.createdAt }}</strong>
		</div>
		<p>
			{{ post.contents }}
		</p>
	</div>
</template>

<script>
export default {
	name: 'PostView',
	props: {
		post: {
			type: Object,
			required: true,
			validator(post) {
				// post props에 대한 validation 추가
				const isValidPostId = typeof post.id === 'number';
				const isValidTitle = !!post.title && post.title.length;
				const isValidContents = post.contents && post.contents.length;
				return isValidPostId && isValidTitle && isValidContents;
			},
		},
	},
};
</script>

<style></style>
