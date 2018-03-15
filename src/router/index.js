import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// 路由懒加载
const Program = () => import('@/components/Program')
const Articles = () => import('@/components/Articles')
const ADetails = () => import('@/components/ADetails')
const Dynamic = () => import('@/components/Dynamic')
const Music = () => import('@/components/Music')
const Info = () => import('@/components/sign/Info')
const Signup = () => import('@/components/sign/Signup')
const Signin = () => import('@/components/sign/Signin')

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if(savedPosition){
      return savedPosition
    }else{
      return { x:0,y:0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      redirect: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
      meta:{
        keepAlive: true
      }
    },
    {
      path: '/articles/:type/:articleid',
      name: 'adetails',
      component: ADetails,
      meta:{
        keepAlive: false
      }
    },
    {
      path: '/music',
      name: 'music',
      component: Music
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: Dynamic
    },
    {
      path: '/program',
      name: 'program',
      component: Program,
      meta:{
        keepAlive: true
      }
    },
  ]
})
