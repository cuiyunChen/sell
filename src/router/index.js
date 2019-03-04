import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = (resolve) => {
    import('components/home/home').then((module) => {
        resolve(module)
    })
}
const Goods = (resolve) => {
    import('components/goods/goods').then((module) => {
        resolve(module)
    })
}
const Seller = (resolve) => {
    import('components/seller/seller').then((module) => {
        resolve(module)
    })
}
const Ratings = (resolve) => {
    import('components/ratings/ratings').then((module) => {
        resolve(module)
    })
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Goods',
      component: Goods
    },
    {
        path: '/goods',
        name: 'Goods',
        component: Goods
    },
    {
        path: '/seller',
        name: 'Seller',
        component: Seller
    },
    {
        path: '/ratings',
        name: 'Ratings',
        component: Ratings
    }
  ]
})
