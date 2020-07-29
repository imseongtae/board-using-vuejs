<template>
	<div id="app">
		<!-- header라는 이름의 router-view -->
		<!-- 이름을 부여한 RouterView 컴포넌트는 원하는 컴포넌트를 렌더할 수 있음 -->
		<router-view name="header" />
		<!-- main | 처럼 이름이 없으면 default 라는 name을 부여 받는다. -->
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
};
</script>

<style lang="scss">
// style 적용
// @import 'http://localhost:8000/assets/index.css';
@import './assets/reset.css';
</style>
