'use strict';

class StoreEstabelecimento {
	async fails(errorMessages) {
		return this.ctx.response.send(errorMessages);
	}

	get validateAll() {
		return true;
	}

	get rules() {
		return {
			codigo: 'required|unique:estabelecimentos',
			razao: 'required|unique:estabelecimentos',
			email: 'required|email|unique:estabelecimentos,email',
			cnpj: 'required|unique:estabelecimentos'
		};
	}

	get messages() {
		return {
			'codigo.required': 'O Campo Código é de Preenchimento Obrigatório',
			'codigo.unique': 'O Código digitado já existe em outro cadastro',
			'razao.required': 'O Campo Razão é de Preenchimento Obrigatório',
			'razao.unique': 'A Razão Social digitada já existe em outro cadastro',
			'email.required': 'O Campo Email é de Preenchimento Obrigatório',
			'email.unique': 'O Email digitado já existe em outro cadastro',
			'email.email': 'Forneça um email válido',
			'cnpj.required': 'O Campo CNPJ é de Preenchimento Obrigatório',
			'cnpj.unique': 'O CNPJ digitado já existe em outro cadastro'
		};
	}
}

module.exports = StoreEstabelecimento;
