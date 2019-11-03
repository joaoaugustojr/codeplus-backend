'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Estabelecimento extends Model {
	usuarios() {
		return this.hasMany('App/Models/User');
	}

	arquivos() {
		return this.hasMany('App/Models/Arquivo');
	}
}

module.exports = Estabelecimento;
