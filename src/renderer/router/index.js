import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/compare',
      name: 'compare',
      component: require('@/components/Compared').default
    },
    {
      path: '/startup',
      name: 'startup',
      component: require('@/components/startup').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
