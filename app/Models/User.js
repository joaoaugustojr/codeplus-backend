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

	tokens() {
		return this.hasMany('App/Models/Token');
	}

	estabelecimento() {
		return this.belongsTo('App/Models/Estabelecimento');
	}
}

module.exports = User;
