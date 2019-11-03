'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ArquivosSchema extends Schema {
	up() {
		this.create('arquivos', (table) => {
			table.increments();
			table.integer('estabelecimento_id').unsigned().references('id').inTable('estabelecimentos');
			table.integer('user_id').unsigned().references('id').inTable('users');
			table.string('descricao', 80);
			table.text('anexo');
			table.string('status', 60).defaultTo('ATIVO');
			table.timestamps();
		});
	}

	down() {
		this.drop('arquivos');
	}
}

module.exports = ArquivosSchema;
