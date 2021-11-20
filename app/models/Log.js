class Log {
  constructor({card_number, datetime, allowed}) {
    this.card_number = card_number;
    this.datetime = datetime;
    this.allowed = allowed;
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Log',
    properties: {
      card_number: 'string',
      datetime: 'date',
      allowed: 'bool',
    },
  };
}

export default Log;
