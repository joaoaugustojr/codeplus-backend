'use strict';

class UpdateUser {
	async fails(errorMessages) {
		return this.ctx.response.send(errorMessages);
	}

	get validateAll() {
		return true;
	}

	get rules() {
		const usuarioID = this.ctx.request.input('id');

		return {
			nome: 'required',
			login: `required|unique:users, login, id, ${usuarioID}`,
			email: `required|email|unique:users, email, id, ${usuarioID}`
		};
	}

	get messages() {
		return {
			'nome.required': 'O Campo Nome é de Preenchimento Obrigatório',
			'login.required': 'O Campo Login é de Preenchimento Obrigatório',
			'email.required': 'O Campo Email é de Preenchimento Obrigatório',
			'email.email': 'Forneça um email válido',
			'email.unique': 'O Email digitado já existe em outro cadastro',
			'login.unique': 'O Login digitado já existe em outro cadastro'
		};
	}
}

module.exports = UpdateUser;
