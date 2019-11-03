'use strict';

const Hash = use('Hash');
const Model = use('Model');

class User extends Model {
	static boot() {
		super.boot();
		this.addHook('beforeSave', async (userInstance) => {
			if (userInstance.dirty.senha) {
				userInstance.senha = await Hash.make(userInstance.senha);
			}
		});
	}

	static get hidden() {
		return [ 'senha' ];
	}

	static castDates(field, value) {
		if (field == 'created_at' || field == 'updated_at') return value ? value.format('DD/MM/YYYY') : value;
	}

	tokens() {
		return this.hasMany('App/Models/Token');
	}

	estabelecimento() {
		return this.belongsTo('App/Models/Estabelecimento');
	}
}

module.exports = User;
