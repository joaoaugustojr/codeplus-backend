'use strict';

const User = use('App/Models/User');
const Database = use('Database');

class UserController {
	async create({ request, response }) {
		const data = request.only([ 'estabelecimento_id', 'nome', 'login', 'senha', 'email' ]);
		await User.create(data);

		return response.send({ message: 'usuário criado com sucesso' });
	}

	async show({ params, response }) {
		const user = await User.find(params.id);
		const estabelecimento = await user.estabelecimento().fetch();
		return response.json(estabelecimento);
	}

	async all({ response }) {
		const user = await User.all();
		return response.json(user);
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
