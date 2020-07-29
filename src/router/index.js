import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'PostListPage',
		components: {
			header: () => import('@/components/AppHeader'),
			default: () => import('@/pages/PostListPage.vue'),
		},
	},
	// /create 라우터가 /postId 위에 선언되도록 변경
	// create 와 일치하는 URL을 가졌는지 먼저 검사하고, 일치하지 않는다면, postId로 이동
	{
		path: '/post/create',
		name: 'PostCreatePage',
		components: {
			header: () => import('@/components/AppHeader'),
			default: () => import('@/pages/PostCreatePage'),
		},
		beforeEnter(to, from, next) {
			const { isAuthorized } = store.getters;
			if (!isAuthorized) {
				alert('로그인이 필요합니다!');
				// 로그인이 되어 있지 않은 사용자라면 로그인 페이지로 이동
				next({ name: 'Signin' });
			}
			next();
		},
	},
	{
		path: '/post/:postId',
		name: 'PostViewPage',
		components: {
			// header: AppHeader,
			// default: PostViewPage,
			header: () => import('@/components/AppHeader'),
			default: () => import('@/pages/PostViewPage.vue'),
		},
		props: {
			// 컴포넌트의 props를 통해 라우트의 파라미터에 접근 설정
			default: true, // 대상 컴포넌트의 이름으로 수정
		},
	},
	{
		path: '/signup',
		name: 'Signup',
		// components 속성을 사용하면 여러개의 router-view에 컴포넌트를 렌더할 수 있음
		components: {
			header: () => import('@/components/AppHeader'),
			default: () => import('@/pages/Signup.vue'),
		},
		// component: () => import('@/pages/Signup.vue'),
	},
	{
		path: '/signin',
		name: 'Signin',
		// component를 사용하면 이름이 없는 router-view에만 컴포넌트를 렌더함
		components: {
			header: () => import('@/components/AppHeader'),
			default: () => import('@/pages/Signin.vue'),
		},
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
