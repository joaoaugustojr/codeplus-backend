'use strict';

const User = use('App/Models/User');
const Database = use('Database');
const { validate } = use('Validator');

class UserController {
	async create({ request, response }) {
		try {
			const data = request.only([ 'estabelecimento_id', 'nome', 'login', 'senha', 'email', 'status' ]);
			await User.create(data);
			return response.send({ message: 'Usuário criado com sucesso!', response: true });
		} catch (error) {
			return response.send({ message: 'Error ao criar novo usuário:\n' + error.message, response: false });
		}
	}

	async show({ params, response }) {
		const user = await User.find(params.id);
		const estabelecimento = await user.estabelecimento().fetch();
		return response.json(estabelecimento);
	}

	async all({ response }) {
		try {
			const user = await User.all();
			return response.json({
				usuarios: user,
				message: 'Listando usuários',
				response: true
			});
		} catch (error) {
			return response.json({
				message: 'Erro ao listar usuários:\n' + error.message,
				response: false
			});
		}
	}

	async update({ request, response }) {
		const user = await User.find(request.input('id'));
		user.merge(request.all());
		await user.save();

		return response.json(user);
	}

	async delete({ params, response }) {
		const user = await User.find(params.id);
		await user.delete();

		return response.send({ message: 'Usuário removido com sucesso' });
	}
}

module.exports = UserController;
