import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login/index.vue'
import Home from '../pages/Home'
import Article from '../pages/Article'
import Comment from '../pages/Comment'
import Fans from '../pages/Fans'
import Image from '../pages/Image'
import Publish from '../pages/Publish'
import Setting from '../pages/Setting'
Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/',
  name: 'home',
  component: Home,
  children: [{
    path: 'articles',
    name: 'articles',
    component: Article
  },
  {
    path: 'image',
    name: 'image',
    component: Image
  },
  {
    path: 'addArticle',
    name: 'addArticle',
    component: Publish
  },
  {
    path: 'comment',
    name: 'comment',
    component: Comment
  },
  {
    path: 'fans',
    name: 'fans',
    component: Fans
  },
  {
    path: 'settings',
    name: 'settings',
    component: Setting
  }
  ]
}]

const router = new VueRouter({
  routes
})

export default router
