import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Articles from '@/components/Articles'
import Music from '@/components/Music'
import Program from '@/components/Program'
import PDetails from '@/components/PDetails'
import ADetails from '@/components/ADetails'
import Dynamic from '@/components/Dynamic'
import Signin from '@/components/sign/Signin'
import Signup from '@/components/sign/Signup'
import Info from '@/components/sign/Info'

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
      path: '/info/:userid',
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
    {
      path: '/program/:programid',
      name: 'pdetails',
      component: PDetails,
      meta:{
        keepAlive: true
      }
    }
  ]
})
