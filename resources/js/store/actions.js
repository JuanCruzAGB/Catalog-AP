import router from "../router.js";

import APIService from "../services/APIService.js";

export default {
  async filter ({ dispatch, state, }) {
    state.filters.page = 1;

    dispatch('setQuery');

    await dispatch('getProperties');
  },
  /**
   * * Search the Categories into the API.
   * @returns {Promise}
   */
  getCategories ({ commit, state, }) {
    commit('setLoading', true);

    return new Promise((resolve, reject) => {
      APIService.getCategories(state.filters)
        .then(response => {
          commit('setCategories', response.data.categories);

          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
        .finally(response => {
          commit('setLoading', false);
        });
    });
  },
  /**
   * * Search the Contact into the API.
   * @returns {Promise}
   */
  getContact ({ commit, }) {
    commit('setLoading', true);

    return new Promise((resolve, reject) => {
      APIService.getContact()
        .then(response => {
          commit('setContact', response.data.contact);

          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
        .finally(response => {
          commit('setLoading', false);
        });
    });
  },
  /**
   * * Search the Locations into the API.
   * @returns {Promise}
   */
  getLocations ({ commit, state, }) {
    commit('setLoading', true);

    return new Promise((resolve, reject) => {
      APIService.getLocations(state.filters)
        .then(response => {
          commit('setLocations', response.data.locations);

          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
        .finally(response => {
          commit('setLoading', false);
        });
    });
  },
  /**
   * * Search the Properties into the API.
   * @returns {Promise}
   */
  getProperties ({ commit, state, }) {
    commit('setLoading', true);

    return new Promise((resolve, reject) => {
      APIService.getProperties(state.filters)
        .then(response => {
          commit('setProperties', response.data.properties);

          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
        .finally(response => {
          commit('setLoading', false);
        });
    });
  },
  /**
   * * Search the Property into the API.
   * @param {string} slug
   * @returns {Promise}
   */
  getProperty ({ commit, }, slug) {
    commit('setLoading', true);

    return new Promise((resolve, reject) => {
      APIService.getProperty(slug)
        .then(response => {
          commit('setProperty', response.data.property);

          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
        .finally(response => {
          commit('setLoading', false);
        });
    });
  },
  /**
   * * Resize the application.
   */
  resize ({ commit, }) {
    let media = 'mobile';

    let width = window.innerWidth;

    if (width >= 1024)
      media = 'desktop';

    else if (width >= 768)
      media = 'tablet';

    commit('setMedia', media);

    commit('setWidth', width);
  },
  /**
   * * Set the loading state.
   * @param {boolean} value
   */
  setLoading ({ commit, }, value) {
    commit('setLoading', value);
  },
  setQuery ({ state, }) {
    let query = {
      // 
    };

    if (state.filters.page)
      query.page = state.filters.page;

    if (state.filters.favorite)
      query.favorite = state.filters.favorite;

    if (state.filters.search.model)
      query.search = state.filters.search.model;

    if (state.filters.id_category.model)
      query.id_category = state.filters.id_category.model.code;

    if (state.filters.id_location.model)
      query.id_location = state.filters.id_location.model.code;

    router.push({
      query,
    });
  },
};