import Model from "./Model.js";

/**
 * * Manage the Location class.
 * @export
 * @class Location
 * @extends {Model}
 */
export default class Location extends Model {
  /**
   * * Creates an instance of Property.
   * @param {object} [data]
   * @param {boolean} [data.favorite=false]
   * @param {number} [data.id_created_by=null]
   * @param {number} [data.id_location=null]
   * @param {string} [data.name=null]
   * @param {string} [data.slug=null]
   * @memberof Property
   */
  constructor (data = {
    favorite: false,
    id_created_by: null,
    id_location: null,
    name: null,
    slug: null,
  }) {
    super(data);
  }
};