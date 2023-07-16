import Category from "../models/Category.js";
import Location from "../models/Location.js";
import Property from "../models/Property.js";

const url = new URL(window.location.href);

export default {
  /**
   * * Set the auth value.
   * @param {object} state
   * @param {boolean} value
   */
  setAuth (state, value) {
    state.auth = value;
  },
  /**
   * * Set the Categories value.
   * @param {object} state
   * @param {string} value
   */
  setCategories (state, value) {
    state.categories = [];

    value.map(data => {
      state.categories.push(new Category(data));
    });

    state.filters.id_category.options = state.categories
      .sort((a, b) => {
        if (a.name < b.name)
          return -1;

        if (a.name > b.name)
          return 1;

        return 0;
      })
      .map(category => {
        return {
          code: category.id_category,
          label: category.name,
        };
      });

    if (url.searchParams.has('id_category')) {
      state.filters.id_category.model = state.filters.id_category.options
        .find(category => category.code == url.searchParams.get('id_category'));
    }
  },
  /**
   * * Set the contact value.
   * @param {object} state
   * @param {string} value
   */
  setContact (state, value) {
    state.contact = value;
  },
  /**
   * * Set the loading value.
   * @param {object} state
   * @param {string} value
   */
  setLoading (state, value) {
    state.loading = value;
  },
  /**
   * * Set the Locations value.
   * @param {object} state
   * @param {string} value
   */
  setLocations (state, value) {
    state.locations = [];

    value.map(data => {
      if (data.properties)
        data.properties = data.properties.map(property => new Property(property));

      state.locations.push(new Location(data));
    });

    state.filters.id_location.options = state.locations
      .sort((a, b) => {
        if (a.name < b.name)
          return -1;

        if (a.name > b.name)
          return 1;

        return 0;
      })
      .map(location => {
        return {
          code: location.id_location,
          label: location.name,
        };
      });

    if (url.searchParams.has('id_location')) {
      state.filters.id_location.model = state.filters.id_location.options
        .find(location => location.code == url.searchParams.get('id_location'));
    }
  },
  /**
   * * Set the media value.
   * @param {object} state
   * @param {string} value
   */
  setMedia (state, value) {
    state.media = value;
  },
  /**
   * * Set the Properties value.
   * @param {object} state
   * @param {string} value
   */
  setProperties (state, value) {
    state.properties = [];

    value.map(data => {
      state.properties.push(new Property(data));
    });
  },
  /**
   * * Set the Property value.
   * @param {object} state
   * @param {string} value
   */
  setProperty (state, value) {
    state.property = new Property(value);
  },
  /**
   * * Set the width value.
   * @param {object} state
   * @param {string} value
   */
  setWidth (state, value) {
    state.width = value;
  },
};