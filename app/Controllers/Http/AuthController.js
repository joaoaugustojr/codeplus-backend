'use strict';

const User = use('App/Models/User');

class AuthController {
	async login({ request, auth, response }) {
		const { estabelecimento_id, login, senha } = request.all();

		const user = await User.findBy({ estabelecimento_id: estabelecimento_id, login: login });

		if (user) {
			const auths = await auth.attempt(login, senha);
			return response.json({ message: 'Usuário logado com sucesso!', response: auths });
		} else {
			return response.json({ message: 'Usuário não localizado!', response: false });
		}
	}

	async isLogin({ response, auth }) {
		const user = await auth.getUser();
		if (user) {
			return response.json({ message: 'Usuário Logado!', response: true, user: user });
		} else {
			return response.json({ message: 'Não existe usuário logado!', response: true });
		}
	}

	async logOut(response, auth) {
		await auth.logout();
		return response.json({ message: 'Usuário logout', response: true });
	}
}

module.exports = AuthController;
