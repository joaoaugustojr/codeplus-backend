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
		try {
			const user = await User.find(params.id);
			return response.send({ message: 'Usuário localizado!', response: true, usuario: user });
		} catch (error) {
			return response.send({ message: 'Erro ao localizar Usuário!\n' + error.message, response: false });
		}
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
		try {
			const user = await User.find(request.input('id'));

			user.login = request.input('login');
			user.nome = request.input('nome');
			user.email = request.input('email');
			user.status = request.input('status');
			user.senha = request.input('senha') != null ? request.input('senha') : user.senha;

			await user.save();

			return response.send({ message: 'Usuário editado com sucesso!', response: true });
		} catch (error) {
			return response.send({ message: 'Erro ao editar usuário:\n' + error.message, response: false });
		}
	}

	async delete({ params, response }) {
		try {
			const user = await User.find(params.id);
			await user.delete();
			return response.send({ message: 'Usuário removido com sucesso!', response: true });
		} catch (error) {
			return response.send({ message: 'Erro ao remover usuário:\n' + error.message, response: false });
		}
	}
}

module.exports = UserController;
