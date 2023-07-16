import Model from "./Model.js";

/**
 * * Manage the Property class.
 * @export
 * @class Property
 * @extends {Model}
 */
export default class Property extends Model {
  /**
   * * Creates an instance of Property.
   * @param {object} [data]
   * @param {string} [data.description=null]
   * @param {boolean} [data.enabled=true]
   * @param {boolean} [data.favorite=false]
   * @param {string} [data.folder=null]
   * @param {number} [data.id_created_by=null]
   * @param {number} [data.id_location=null]
   * @param {number} [data.id_property=null]
   * @param {string} [data.name=null]
   * @param {string} [data.slug=null]
   * @memberof Property
   */
  constructor (data = {
    description: null,
    enabled: true,
    favorite: false,
    folder: null,
    id_created_by: null,
    id_location: null,
    id_property: null,
    name: null,
    slug: null,
  }) {
    super(data);
  }
};