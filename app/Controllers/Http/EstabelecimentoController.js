'use strict';

const Estabelecimento = use('App/Models/Estabelecimento');
const Database = use('Database');

class EstabelecimentoController {
	async create({ request, response }) {
		const data = request.all();
		await Estabelecimento.create(data);

		return response.send({ message: 'Estabelecimento criado com Sucesso' });
	}

	async show({ params, response }) {
		const estabelecimento = await Estabelecimento.find(params.id);
		return response.json(estabelecimento);
	}

	async all({ response }) {
		const estabelecimento = await Estabelecimento.all();
		return response.json(estabelecimento);
	}

	async update({ request, response }) {
		const estabelecimento = await Estabelecimento.find(request.input('id'));
		estabelecimento.merge(request.all());
		await estabelecimento.save();

		return response.json(estabelecimento);
	}

	async delete({ params, response }) {
		const estabelecimento = await Estabelecimento.find(params.id);
		await estabelecimento.delete();

		return response.send({ message: 'Estabelecimento removido com sucesso' });
	}
}

module.exports = EstabelecimentoController;
