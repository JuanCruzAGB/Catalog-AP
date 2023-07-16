import Vue from 'vue';
import VueRouter from "vue-router";

import router from "./router.js";

import store from "./store/index.js";

import category from "./models/Category.js";
import location from "./models/Location.js";
import property from "./models/Property.js";

import input from "./validation/Input.js";

import banner from "../assets/images/banner.jpg";
import sample from "../assets/images/sample.svg";
import propertySample from "../assets/images/sample.png";
import logoRegularDefault from "../assets/images/logo/01-regular.png";
import logoRegularWhite from "../assets/images/logo/02-regular-white.png";
import logoSmallDefault from "../assets/images/logo/03-small.png";
import logoSmallWhite from "../assets/images/logo/04-small-white.png";

import App from "./components/App.vue";

Vue.use(VueRouter);

const app = new Vue({
  el: '#app',
  template: `<App />`,
  components: {
    App,
  },
  provide: {
    images: {
      banner,
      logo: {
        regular: {
          default: logoRegularDefault,
          white: logoRegularWhite,
        },
        small: {
          default: logoSmallDefault,
          white: logoSmallWhite,
        },
      },
      property: {
        sample: propertySample,
      },
      sample: sample,
    },
    models: {
      category,
      location,
      property,
    },
    objects: {
      input,
    },
  },
  store,
  router,
});