const assert =  require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const should = chai.should();
const server = require('../server.js');
const sequelize = require('../db');
const User = require('../models/User');
const Website = require('../models/Website');

chai.use(chaiHttp)

let newUser = {
	email: 'some@email.com',
	password: '123456'
}

let token = null;

describe('POST /website/add', () => {
	before(done => {
		sequelize.sync({ force: true })
		.then(() => {
			User.create(newUser)
			.then(() => {
				chai.request(server)
				.post('/users/login')
				.send(newUser)
				.end((err, res) => {
					token = res.body.token;
					Website.create({
						name: 'Yahoo',
						url: 'www.yahoo.com',
						userId: 1
					})
					.then(() => done())
				})

			})
		})
		.catch(err => done(err)); 
	})

	it('should return 200 after post request', done => {
		let newWebsite = {
			name: 'Google',
			url: 'www.google.com'
		}
		chai.request(server)
		.post('/website/add')
		.set('Authorization', token)
		.send(newWebsite)
		.end((err, res) => {
			res.should.have.status(200);
			done()
		})
	})

	it('should return 400 if data is null', done => {
		chai.request(server)
		.post('/website/add')
		.set('Authorization', token)
		.send(null)
		.end((err, res) => {
			res.should.have.status(400);
			done()
		})
	})

	it('should return 400 if URL is invalid', done => {
		chai.request(server)
		.post('/website/add')
		.set('Authorization', token)
		.send({
			name: 'Facebook',
			url: 'face@123'
		})
		.end((err, res) => {
			res.should.have.status(400);
			done()
		})
	})

	it('should return 400 if URL or name already exist', done => {
		chai.request(server)
		.post('/website/add')
		.set('Authorization', token)
		.send({
			name: 'Yahoo',
			url: 'www.yahoo.com'
		})
		.end((err, res) => {
			res.should.have.status(400);
			done()
		})
	})

	it('should return 401 if user is not authenticated', done => {
		chai.request(server)
		.post('/website/add')
		.send({
			name: 'Facebook',
			url: 'www.facebook.com'
		})
		.end((err, res) => {
			res.should.have.status(401);
			done()
		})
	})
})

describe('GET /list', () => {
	before(done => {
		sequelize.sync({ force: true })
		.then(() => {
			User.create(newUser)
			.then(() => {
				chai.request(server)
				.post('/users/login')
				.send(newUser)
				.end((err, res) => {
					token = res.body.token;
					done()
				})

			})
		})
	});

	it('should return an empty array if there are no websites', done => {
		chai.request(server)
		.get('/website/list')
		.set('Authorization', token)
		.end((err, res) => {
			res.should.have.status(200);
			expect(res.body).to.be.an('array').that.is.empty;
			done()
		})
	})

	describe('Inserting data', done => {
		before(done => {
			Website.create({
						name: 'Yahoo',
						url: 'www.yahoo.com',
						userId: 1
					})
			.then(() => done());
		})

		it('should return an array if there is data', done => {
			chai.request(server)
			.get('/website/list')
			.set('Authorization', token)
			.end((err, res) => {
				res.should.have.status(200);
				expect(res.body).to.be.an('array').that.is.not.empty;
				done()
			})
		})
	})

	it('should return 401 if the user is not authenticated', done => {
		chai.request(server)
			.get('/website/list')
			.end((err, res) => {
				res.should.have.status(401);
				done()
			})
	})
})