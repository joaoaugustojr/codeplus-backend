'use strict';

const User = use('App/Models/User');

class AuthController {
	async login({ request, auth, response }) {
		const { estabelecimento_id, login, senha } = request.all();

		const user = await User.findBy({ estabelecimento_id: estabelecimento_id, login: login });

		try {
			if (user) {
				const auths = await auth.attempt(login, senha);
				var estabelecimento = await user.estabelecimento().fetch();
				return await response.json({
					message: 'Usuário logado com sucesso!',
					response: true,
					token: auths,
					user: { usuario: user, estabelecimento: estabelecimento }
				});
			} else {
				return await response.json({
					message: 'Usuário não localizado! Verificar dados fornecidos.',
					response: false
				});
			}
		} catch (error) {
			return await response.json({
				message: 'Usuário não localizado! Verificar dados fornecidos.\n' + error.message,
				response: false
			});
		}
	}

	//passar header token como parametro
	async isLogin({ response, auth }) {
		try {
			const user = await auth.getUser();
			if (await user) {
				var estabelecimento = await user.estabelecimento().fetch();
				return response.json({
					message: 'Usuário Logado!',
					response: true,
					user: { usuario: user, estabelecimento: estabelecimento }
				});
			} else {
				return response.json({ message: 'Não existe usuário logado!', response: false });
			}
		} catch (error) {
			return response.json({ message: 'Não existe usuário logado!', response: false });
		}
	}

	//passar header token como parametro
	async logout({ response, auth }) {
		try {
			const user = await auth.getUser();
			const token = await auth.getAuthHeader();

			await user.tokens().where('token', token).update({ is_revoked: true });

			return response.json({ message: 'Logout realizado com sucesso!', response: true });
		} catch (error) {
			return response.json({ message: 'Erro inesperado ao Fazer Logout:\n' + error.message, response: false });
		}
	}
}

module.exports = AuthController;
