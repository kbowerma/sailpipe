/**
* Bar.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  // mongo is my default connection so I will expliclity call postgres here.
  connection: 'herokuPostgres',
  attributes: {
    type: 'string',
    name: 'string',
    test: 'string',
    desc: 'string'

  }
};
