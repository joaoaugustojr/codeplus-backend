'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Estabelecimento extends Model {
	estabelecimento() {
		return this.hasMany('App/Models/User');
	}
}

module.exports = Estabelecimento;
