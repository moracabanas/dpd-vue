import Vue from "vue";
import Router from "vue-router";
import MobileDetails from "./views/MobileDetails.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "mobiledetails",
      component: MobileDetails,
      props: route => ({
        hash: route.query.hash,
        lang: route.query.lang
      })
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
