import Vue from 'vue';
import VueRouter from 'vue-router';

// import AppHeader from '@/components/AppHeader';
// import PostViewPage from '@/pages/PostViewPage.vue';

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
