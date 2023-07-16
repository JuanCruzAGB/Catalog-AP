import VueRouter from "vue-router";

import Layout from "./components/layouts/Index.vue";

import Property from "./components/views/Property.vue";
import Home from "./components/views/Home.vue";
import Catalog from "./components/views/Catalog.vue";

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'Layout',
      path: '/',
      component: Layout,
      children: [
        {
          name: 'Home',
          path: '',
          component: Home,
        },
        {
          name: 'Catalog',
          path: 'properties',
          component: Catalog,
        },
        {
          name: 'Property',
          path: 'properties/:slug',
          component: Property,
        },
      ],
    }
  ],
});