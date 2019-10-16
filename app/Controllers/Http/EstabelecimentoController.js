'use strict';

const Estabelecimento = use('App/Models/Estabelecimento');
const Database = use('Database');

class EstabelecimentoController {
	async create({ request, response }) {
		try {
			const data = request.only([ 'codigo', 'razao', 'cnpj', 'email' ]);
			await Estabelecimento.create(data);
			return response.send({ message: 'Estabelecimento criado com Sucesso!', response: true });
		} catch (error) {
			return response.send({
				message: 'Error ao criar novo estabelecimento:\n' + error.message,
				response: false
			});
		}
	}

	async show({ params, response }) {
		try {
			const estabelecimento = await Estabelecimento.find(params.id);
			return response.send({
				message: 'Estabelecimento localizado!',
				response: true,
				estabelecimento: estabelecimento
			});
		} catch (error) {
			return response.send({ message: 'Erro ao localizar Estabelecimento!\n' + error.message, response: false });
		}
	}

	async all({ response }) {
		try {
			const estabelecimentos = await Estabelecimento.all();
			return response.json({
				estabelecimentos: estabelecimentos,
				message: 'Listando Estabelecimentos',
				response: true
			});
		} catch (error) {
			return response.json({
				message: 'Erro ao listar estabelecimentos:\n' + error.message,
				response: false
			});
		}
	}

	async update({ request, response }) {
		try {
			const estabelecimento = await Estabelecimento.find(request.input('id'));
			estabelecimento.merge(request.all());
			await estabelecimento.save();
			return response.send({ message: 'Estabelecimento editado com sucesso!', response: true });
		} catch (error) {
			return response.send({ message: 'Erro ao editar estabelecimento:\n' + error.message, response: false });
		}
	}

	async delete({ params, response }) {
		try {
			const estabelecimento = await Estabelecimento.find(params.id);
			await estabelecimento.delete();
			return response.send({ message: 'Estabelecimento removido com sucesso!', response: true });
		} catch (error) {
			return response.send({ message: 'Erro ao remover estabelecimento:\n' + error.message, response: false });
		}
	}
}

module.exports = EstabelecimentoController;
