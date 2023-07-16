/**
 * * Manage the Model class.
 * @export
 * @class Model
 */
export default class Model {
  /**
   * * Creates an instance of Model.
   * @param {object} data
   * @memberof Model
   */
  constructor (data) {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const value = data[key];

        this[key] = value;
      }
    }
  }
};