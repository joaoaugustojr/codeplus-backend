'use strict';

class UpdateUser {
	async fails(errorMessages) {
		return this.ctx.response.send(errorMessages);
	}

	get validateAll() {
		return true;
	}

	get rules() {
		return {
			nome: 'required',
			login: 'required',
			email: 'required|email'
			// senha: 'required'
		};
	}

	get messages() {
		return {
			'nome.required': 'O Campo Nome é de Preenchimento Obrigatório',
			'login.required': 'O Campo Login é de Preenchimento Obrigatório',
			'email.required': 'O Campo Email é de Preenchimento Obrigatório',
			'email.email': 'Forneça um email válido',
			'senha.required': 'O Campo Senha é de Preenchimento Obrigatório'
		};
	}
}

module.exports = UpdateUser;
