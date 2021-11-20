class Log {
  constructor({card_number, datetime}) {
    this.card_number = card_number;
    this.datetime = datetime;
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Log',
    properties: {
      card_number: 'string',
      datetime: 'date',
    },
  };
}

export default Log;
