import {BSON} from 'realm';

class User {
  constructor({
    id = new BSON.ObjectId(),
    first_name,
    last_name,
    card_number,
    employee_id,
  }) {
    this._id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.card_number = card_number;
    this.employee_id = employee_id;
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      first_name: 'string',
      last_name: 'string',
      card_number: 'string',
      employee_id: 'string',
    },
  };
}

export default User;
