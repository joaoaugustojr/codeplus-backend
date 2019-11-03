'use strict';

const Helpers = use('Helpers');
const Arquivo = use('App/Models/Arquivo');

class UploadController {
	async upload({ request, response }) {
		const file = request.file('file');

		await file.move(Helpers.tmpPath('uploads'), {
			name: file.clientName,
			overwrite: true
		});

		if (!file.moved()) {
			return file.error();
		}

		try {
			const arquivo = new Arquivo();

			arquivo.estabelecimento_id = 1;
			arquivo.user_id = 1;
			arquivo.descricao = file.fileName;
			arquivo.anexo = Helpers.tmpPath('uploads/');

			await arquivo.save();

			return response.send({ response: 'OK', message: 'Upload Realizado com sucesso' });
		} catch (error) {
			return response.send({ response: 'ERROR', message: 'Erro ao realizar Upload\n' + error.message });
		}
	}

	async listUpload({ request, response }) {
		try {
			const arquivos = await Arquivo.query()
				.where(function() {
					if (request.input('status')) this.where('arquivos.status', request.input('status'));
				})
				.where(function() {
					if (request.input('estabelecimento_id'))
						this.where('estabelecimento_id', request.input('estabelecimento_id'));
				})
				.innerJoin('users as c', 'c.id', 'arquivos.user_id')
				.select('arquivos.id', 'c.nome', 'arquivos.descricao', 'arquivos.created_at', 'arquivos.status')
				.fetch();

			return response.send({
				response: 'OK',
				message: 'Arquivos Listados com Sucesso',
				arquivos
			});
		} catch (error) {
			return response.send({ response: 'ERROR', message: 'Erro ao realizar Upload\n' + error.message });
		}
	}
}

module.exports = UploadController;
