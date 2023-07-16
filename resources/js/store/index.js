import Vue from 'vue';
import Vuex from 'vuex';

import actions from "./actions.js";
import getters from "./getters.js";
import mutations from "./mutations.js";

import Input from "../validation/Input.js";

Vue.use(Vuex);

const url = new URL(window.location.href);

export default new Vuex.Store({
  state: {
    auth,
    categories: [
      // 
    ],
    contact: {
      address: null,
      email: null,
      phone: null,
    },
    env,
    filters: {
      favorite: false,
      id_category: new Input({
        requirements: 'nullable',
      }),
      id_location: new Input({
        requirements: 'nullable',
      }),
      page: url.searchParams.has('page') ? url.searchParams.get('page') : 1,
      results_per_page: 12,
      search: new Input({
        model: url.searchParams.has('search') ? url.searchParams.get('search') : null,
        requirements: 'nullable',
      }),
    },
    loading: false,
    locations: [
      // 
    ],
    media: 'mobile',
    properties: [
      // 
    ],
    property: null,
    url: {
      api: api_url,
      auth: auth_url,
      current: url,
      development: development_url,
      local: local_url,
      panel: panel_url,
    },
    width: 0,
  },
  actions,
  getters,
  mutations,
});