'use strict';

class UpdateEstabelecimento {
	async fails(errorMessages) {
		return this.ctx.response.send(errorMessages);
	}

	get validateAll() {
		return true;
	}

	get rules() {
		const estabelecimentoId = this.ctx.request.input('id');

		return {
			razao: `required|unique:estabelecimentos, razao, id, ${estabelecimentoId}`,
			email: `required|email|unique:estabelecimentos, email, id, ${estabelecimentoId}`,
			cnpj: `required|unique:estabelecimentos, cnpj, id, ${estabelecimentoId}`
		};
	}

	get messages() {
		return {
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

module.exports = UpdateEstabelecimento;
