import axios from "axios";
import Input from "../validation/Input";

/**
 * * Parse the filters and generates a query URL.
 * @param {object} filters
 * @returns {string}
 */
function getFiltersURL (filters) {
  let filters_url = '?';

  Object
    .keys(filters)
    .map(key => {
      if (filters_url != '?') {
        filters_url += '&';
      }

      if (filters[key] instanceof Input) {
        if (filters[key].model) {
          if (typeof filters[key].model == 'object') {
            filters_url += `${ key }=${ filters[key].model.code }`;
          } else {
            filters_url += `${ key }=${ filters[key].model }`;
          }
        }
      } else {
        filters_url += `${ key }=${ filters[key] }`;
      }
    });

  return filters_url;
}

export default {
  /**
   * * Get the Contact.
   * @returns {Promise}
   */
  getContact () {
    return axios
      .get(`${ api_url }/contact`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  },
  /**
   * * Get the Categories.
   * @param {object} filters
   * @returns {Promise}
   */
  getCategories (filters) {
    let filters_url = getFiltersURL(filters);

    return axios
      .get(`${ api_url }/categories${ filters_url }`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  },
  /**
   * * Get the Locations.
   * @param {object} filters
   * @returns {Promise}
   */
  getLocations (filters) {
    let filters_url = getFiltersURL(filters);

    return axios
      .get(`${ api_url }/locations${ filters_url }`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  },
  /**
   * * Get the Properties.
   * @param {object} filters
   * @returns {Promise}
   */
  getProperties (filters) {
    let filters_url = getFiltersURL(filters);

    return axios
      .get(`${ api_url }/properties${ filters_url }`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  },
  /**
   * * Get a Property.
   * @param {string} slug
   * @returns {Promise}
   */
  getProperty (slug) {
    return axios
      .get(`${ api_url }/properties/${ slug }`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  },
};