'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
	up() {
		this.create('users', (table) => {
			table.increments('id');
			table.integer('estabelecimento_id').unsigned().references('id').inTable('estabelecimentos');
			table.string('nome', 80).notNullable();
			table.string('login', 45).notNullable().unique();
			table.string('senha', 60).notNullable();
			table.string('email', 254).notNullable().unique();
			table.string('status', 60).defaultTo('ATIVO');
			table.timestamps();
		});
	}

	down() {
		this.drop('users');
	}
}

module.exports = UserSchema;
