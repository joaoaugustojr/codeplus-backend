'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EstabelecimentosSchema extends Schema {
	up() {
		this.create('estabelecimentos', (table) => {
			table.increments();
			table.integer('codigo').notNullable().unique();
			table.string('razao', 254).notNullable();
			table.string('cnpj', 45).notNullable().unique();
			table.string('email', 254).notNullable().unique();
			table.timestamps();
		});
	}

	down() {
		this.drop('estabelecimentos');
	}
}

module.exports = EstabelecimentosSchema;
