'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
	Route.post('/', 'AuthController.login');
	Route.get('/islogin', 'AuthController.isLogin');
	Route.get('/logout', 'AuthController.logout');
}).prefix('auth');

Route.group(() => {
	Route.post('create', 'UserController.create').validator('storeUser');
	Route.post('update', 'UserController.update').validator('updateUser');
	Route.get('delete/:id', 'UserController.delete');
	Route.get('show/:id', 'UserController.show');
	Route.get('all', 'UserController.all');
}).prefix('users');

Route.group(() => {
	Route.post('create', 'EstabelecimentoController.create').validator('storeEstabelecimento');
	Route.post('update', 'EstabelecimentoController.update').validator('updateEstabelecimento');
	Route.get('delete/:id', 'EstabelecimentoController.delete');
	Route.get('show/:id', 'EstabelecimentoController.show');
	Route.get('all', 'EstabelecimentoController.all');
}).prefix('estabelecimentos');

Route.group(() => {
	Route.post('/', 'UploadController.upload');
	Route.get('/list', 'UploadController.listUpload');
}).prefix('upload');
