import Vue from 'vue'
import Router from 'vue-router'

import Users from '../pages/Users'
import Customers from '../pages/Customers'
import Groups from '../pages/Groups'
import Teams from '../pages/Teams'
import Apps from '../pages/Apps'

Vue.use(Router)

export default new Router({
  // hashbang: false,
  // base: '/',
  // mode: 'history',
  routes: [
    {
      path: '/',
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
