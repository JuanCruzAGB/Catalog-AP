export default {
  auth (state) {
    return state.auth;
  },
  categories (state) {
    return state.categories;
  },
  categoriesOptions (state) {
    return state.categories
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
  },
  contact (state) {
    return state.contact;
  },
  env (state) {
    return state.env;
  },
  filters (state) {
    return state.filters;
  },
  /**
   * * Returns if the media is mobile.
   * @returns {boolean}
   */
  isMobile (state) {
    return state.media == 'mobile';
  },
  /**
   * * Returns if the media is desktop.
   * @returns {boolean}
   */
  isDesktop (state) {
    return state.media == 'desktop';
  },
  loading (state) {
    return state.loading;
  },
  locations (state) {
    return state.locations;
  },
  locationsOptions (state) {
    return state.locations
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
  },
  media (state) {
    return state.media;
  },
  properties (state) {
    return state.properties;
  },
  property (state) {
    return state.property;
  },
  url (state) {
    return state.url;
  },
};