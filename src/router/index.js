import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'

import Users from '../components/Users'
import Customers from '../components/Customers'
import Groups from '../components/Groups'
import Teams from '../components/Teams'
import Apps from '../components/Apps'

Vue.use(Router)

export default new Router({
  hashbang: false,
  base: '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      redirect: { name: 'Users' }
    },
    {
      path: '/user-admin/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/user-admin/customers',
      name: 'Customers',
      component: Customers
    },
    {
      path: '/user-admin/groups',
      name: 'Groups',
      component: Groups
    },
    {
      path: '/user-admin/teams',
      name: 'Teams',
      component: Teams
    },
    {
      path: '/user-admin/apps',
      name: 'Apps',
      component: Apps
    },
  ]
})
