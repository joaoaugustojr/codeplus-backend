'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProdutosSchema extends Schema {
	up() {
		this.create('produtos', (table) => {
			table.increments();
			table.integer('codigo').notNullable().unique();
			table.integer('estabelecimento_id').unsigned().references('id').inTable('estabelecimentos');
			table.string('descricao', 80);
			table.double('preco');
			table.string('unidade', 60);
			table.string('secao', 60);
			table.string('status', 60).defaultTo('ATIVO');
			table.timestamps();
		});
	}

	down() {
		this.drop('produtos');
	}
}

module.exports = ProdutosSchema;
