'use strict';

class StoreUser {
	async fails(errorMessages) {
		return this.ctx.response.send(errorMessages);
	}

	get validateAll() {
		return true;
	}

	get rules() {
		return {
			nome: 'required',
			login: 'required|unique:users',
			email: 'required|email|unique:users,email',
			senha: 'required'
		};
	}

	get messages() {
		return {
			'nome.required': 'O Campo Nome é de Preenchimento Obrigatório',
			'login.required': 'O Campo Login é de Preenchimento Obrigatório',
			'login.unique': 'O Login digitado já existe em outro cadastro',
			'email.required': 'O Campo Email é de Preenchimento Obrigatório',
			'email.unique': 'O Email digitado já existe em outro cadastro',
			'email.email': 'Forneça um email válido',
			'senha.required': 'O Campo Senha é de Preenchimento Obrigatório'
		};
	}
}

module.exports = StoreUser;
