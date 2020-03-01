import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Register2 from '../views/Register2.vue'
import NotFound from '../views/404.vue'
import Login from '../views/login.vue'
import Home from  '../views/Home.vue'
import Infoshow from '../views/Infoshow'
import FundList from '../views/FundList'
import UserList from '../views/UserList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children:[
      {path:'',component:Home},
      {path:'/home', name:'home', component:Home},
      {path:'/infoshow', name:'infoshow', component:Infoshow},
      {path:'/fundList', name:'fundList', component:FundList},
      {path:'/userlist', name:'userlist', component:UserList}
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/register2',
    name: 'register2',
    component: Register2
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin=localStorage.eleToken?true:false;
  if(to.path == '/login'|| to.path == '/register'){
    next();
  }else{
    isLogin ? next() : next('/login');
  }
})

export default router
