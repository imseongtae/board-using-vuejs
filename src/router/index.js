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
		path: '/post/:postId/edit',
		name: 'PostEditPage',
		components: {
			header: () => import('@/components/AppHeader'),
			default: () => import('@/pages/PostEditPage.vue'),
		},
		// postId 파라미터를 URL에 담아주면 컴포넌트의 props 속성으로 전달됨
		props: {
			default: true,
		},
		beforeEnter(to, from, next) {
			const { isAuthorized } = store.getters;
			if (!isAuthorized) {
				alert('로그인이 필요합니다.');
				next({ name: 'Signin' });
				return false;
			}
			// next(); // 다르다.. 나는 next()를 통한 진행이 필요할 거라고 생각했는데
			// 게시물 뷰 페이지에서 사용햇던 fetchPost Action의 재사용
			store
				.dispatch('fetchPost', to.params.postId) // action을 호출하기 위한 dispatch
				.then(() => {
					const post = store.state.post;
					// console.log('post', post);
					// console.log('me', store.state.me);
					// 게시물 작성자의 id와 현재 로그인된 사용자의 아이디가 일치하는지 확인
					const isAuthor = post.user.id === store.state.me.id;
					if (isAuthor) {
						// 일치한다면 라우팅을 그대로 진행
						next();
					} else {
						alert('게시물의 작성자만 게시물을 수정할 수 있음');
						// console.log('from 객체', from);
						next(from);
						// return false; // return false를 넣어줬더니 해결이 된다..!
					}
				})
				.catch(err => {
					alert(err.response.data.msg);
					next(from);
				});
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
