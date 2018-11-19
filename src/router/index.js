import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Movie from '@/components/Movie'
import Event from '@/components/event'
import About from '@/components/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path:'/movie',
    	name:'Movie',
    	component:Movie
    },
    {
    	path:'/event',
    	name:'Event',
    	component:Event
    },
    {
    	path:'/about',
    	name:'About',
    	component:About
    }
  ]
})
