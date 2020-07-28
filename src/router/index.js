import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'PostListPage',
		component: () => import('@/pages/PostListPage.vue'),
	},
	{
		path: '/post/:postId',
		name: 'PostViewPage',
		props: true, // 컴포넌트의 props를 통해 라우트의 파라미터에 접근 설정
		component: () => import('@/pages/PostViewPage.vue'),
	},
	// route level code-splitting
	// this generates a separate chunk (about.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	// component: () =>
	// import(/* webpackChunkName: "about" */ "../views/About.vue")
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
