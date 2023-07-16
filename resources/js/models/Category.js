import Model from "./Model.js";

/**
 * * Manage the Category class.
 * @export
 * @class Category
 * @extends {Model}
 */
export default class Category extends Model {
  /**
   * * Creates an instance of Category.
   * @param {object} [data]
   * @param {number} [data.id_created_by=null]
   * @param {number} [data.id_category=null]
   * @param {string} [data.name=null]
   * @param {string} [data.slug=null]
   * @memberof Category
   */
  constructor (data = {
    id_created_by: null,
    id_category: null,
    name: null,
    slug: null,
  }) {
    super(data);
  }
};