const { chai, app, db, expect, baseServive, constant } = require('./common')

let companyData = {
  title: 'company test 1',
  description: 'this is for test'
}

let departmentData = {
  title: 'department test',
  description: 'this is for test'
}

let departmentData1 = {
  title: 'department test 1',
  description: 'this is for test'
}

let teamData = {
  title: 'team test',
  description: 'this is for test'
}

let teamData1 = {
  title: 'team test 1',
  description: 'this is for test'
}

let userData = {
  firstName: 'test',
  lastName: 'test',
  email: 'test',
  description: 'this is for test',
  role: constant.ROLE_ADMIN
}

let userData1 = {
  firstName: 'test1',
  lastName: 'test1',
  email: 'test1@gmail.com',
  description: 'this is for test'
}

let userData2 = {
  firstName: 'test2',
  lastName: 'test2',
  email: 'test2@gmail.com',
  description: 'this is for test'
}

let userData3 = {
  firstName: 'test3',
  lastName: 'test3',
  email: 'test3@gmail.com',
  description: 'this is for test'
}

const accountData = {
  userName: 'admin',
  passWord: 'admin'
}

const accountData1 = {
  userName: 'user1',
  passWord: 'user1'
}

const accountData2 = {
  userName: 'user2',
  passWord: 'user2'
}
const accountData3 = {
  userName: 'user3',
  passWord: 'user3'
}

const accountData4 = {
  userName: 'user4',
  passWord: 'user4',
  isActive: false
}

const BASE_URL_USER = '/api/users'
const BASE_URL_LOGIN = '/api/accounts/login'

let adminToken, userToken, departmentLeadToken, teamLeadToken

describe('Test all APIs users management', () => {
  before('Clean data for test', done => {
    db.sequelize.sync({ force: true })
      .then(() => {
        return baseServive.insert(db.company, companyData)
      })
      .then((data) => {
        companyData = data
        departmentData.companyId = companyData.companyId
        departmentData1.companyId = companyData.companyId
      })
      .then(() => {
        return baseServive.insert(db.department, departmentData)
      })
      .then((data) => {
        departmentData = data
        return baseServive.insert(db.department, departmentData1)
      })
      .then((data) => {
        departmentData1 = data
        userData.companyId = companyData.companyId
        userData1.companyId = companyData.companyId
        userData2.companyId = companyData.companyId
        userData3.companyId = companyData.companyId
      })
      .then(() => {
        return baseServive.insert(db.user, userData)
      })
      .then((data) => {
        userData = data
        return baseServive.insert(db.user, userData1)
      })
      .then((data) => {
        userData1 = data
        return baseServive.insert(db.user, userData2)
      })
      .then((data) => {
        userData2 = data
        return baseServive.insert(db.user, userData3)
      })
      .then((data) => {
        userData3 = data
        const usersDepartmentsData = [
          {
            userId: userData1.userId,
            departmentId: departmentData.departmentId,
            role: constant.ROLE_ADMIN
          },
          {
            userId: userData2.userId,
            departmentId: departmentData.departmentId
          },
          {
            userId: userData3.userId,
            departmentId: departmentData.departmentId
          }
        ]
        return baseServive.bulkInsert(db.usersDepartments, usersDepartmentsData)
      })
      .then(() => {
        teamData.departmentId = departmentData.departmentId
        return baseServive.insert(db.team, teamData)
      })
      .then((data) => {
        teamData = data
        teamData1.departmentId = departmentData1.departmentId
        return baseServive.insert(db.team, teamData1)
      })
      .then((data) => {
        teamData1 = data
        const usersteamsData = [
          {
            userId: userData2.userId,
            teamId: teamData.teamId,
            role: constant.ROLE_ADMIN
          },
          {
            userId: userData3.userId,
            teamId: teamData.teamId
          }
        ]
        return baseServive.bulkInsert(db.usersTeams, usersteamsData)
      })
      .then(() => {
        accountData.userId = userData.userId
        accountData1.userId = userData1.userId
        accountData2.userId = userData2.userId
        accountData3.userId = userData3.userId
      })
      .then(() => {
        return baseServive.bulkInsert(db.account, [accountData, accountData1, accountData2, accountData3, accountData4])
      })
      .then(() => {
        done()
      })
  })
  describe('Login user', () => {
    describe('with correct username and password', () => {
      describe('role is admin', () => {
        it('shout be success and return token', done => {
          chai.request(app)
            .post(BASE_URL_LOGIN)
            .send({
              'username': accountData.userName,
              'password': accountData.passWord
            })
            .end((req, res) => {
              adminToken = res.body
              expect(res.statusCode).to.equal(200)
              expect(adminToken).to.have.property('accessToken')
              expect(adminToken).to.have.property('refreshToken')
              expect(adminToken).to.have.property('userName')
              done();
            })
        })
      })
      describe('role is department lead', () => {
        it('shout be success and return token', done => {
          chai.request(app)
            .post(BASE_URL_LOGIN)
            .send({
              'username': accountData1.userName,
              'password': accountData1.passWord
            })
            .end((req, res) => {
              departmentLeadToken = res.body
              expect(res.statusCode).to.equal(200)
              expect(adminToken).to.have.property('accessToken')
              expect(adminToken).to.have.property('refreshToken')
              expect(adminToken).to.have.property('userName')
              done();
            })
        })
      })
      describe('role is team lead', () => {
        it('shout be success and return token', done => {
          chai.request(app)
            .post(BASE_URL_LOGIN)
            .send({
              'username': accountData2.userName,
              'password': accountData2.passWord
            })
            .end((req, res) => {
              teamLeadToken = res.body
              expect(res.statusCode).to.equal(200)
              expect(adminToken).to.have.property('accessToken')
              expect(adminToken).to.have.property('refreshToken')
              expect(adminToken).to.have.property('userName')
              done();
            })
        })
      })
      describe('role is user', () => {
        it('shout be success and return token', done => {
          chai.request(app)
            .post(BASE_URL_LOGIN)
            .send({
              'username': accountData3.userName,
              'password': accountData3.passWord
            })
            .end((req, res) => {
              userToken = res.body
              expect(res.statusCode).to.equal(200)
              expect(adminToken).to.have.property('accessToken')
              expect(adminToken).to.have.property('refreshToken')
              expect(adminToken).to.have.property('userName')
              done();
            })
        })
      })
      describe('user inactive', () => {
        it('shout be retun unauthentication', done => {
          chai.request(app)
            .post(BASE_URL_LOGIN)
            .send({
              'username': accountData4.userName,
              'password': accountData4.passWord
            })
            .end((req, res) => {
              expect(res.statusCode).to.equal(401)
              done();
            })
        })
      })
    })
  })
  describe('Request get user', () => {
    describe('with correct request', () => {
      it('should be return success', done => {
        chai.request(app).get(BASE_URL_USER)
          .set('Authorization', `Bearer ${adminToken.accessToken}`)
          .end(function (req, res) {
            expect(res.statusCode).to.equal(200)
            done()
          })
      })
      it('should be return correct properties', done => {
        chai.request(app).get(BASE_URL_USER)
          .set('Authorization', `Bearer ${adminToken.accessToken}`)
          .end(function (req, res) {
            expect(res.body).to.have.property('count')
            expect(res.body).to.have.property('page_index')
            expect(res.body).to.have.property('page_size')
            expect(res.body).to.have.property('data')
            done()
          })
      })
      it('should be return correct properties on each item', done => {
        chai.request(app).get(BASE_URL_USER)
          .set('Authorization', `Bearer ${adminToken.accessToken}`)
          .end(function (req, res) {
            expect(res.body.data[0]).to.have.property('user_id')
            expect(res.body.data[0]).to.have.property('first_name')
            expect(res.body.data[0]).to.have.property('last_name')
            expect(res.body.data[0]).to.have.property('email')
            expect(res.body.data[0]).to.have.property('role')
            expect(res.body.data[0]).to.have.property('departments')
            expect(res.body.data[0]).to.have.property('teams')
            expect(res.body.data[0].departments[0]).to.have.property('department_id')
            expect(res.body.data[0].departments[0]).to.have.property('role')
            expect(res.body.data[0].departments[0]).to.have.property('title')
            expect(res.body.data[0].teams[0]).to.have.property('team_id')
            expect(res.body.data[0].teams[0]).to.have.property('role')
            expect(res.body.data[0].teams[0]).to.have.property('title')
            done()
          })
      })
    })
    describe('to validate authentication', () => {
      describe('without token', () => {
        it('should be return unauthentication', done => {
          chai.request(app).get(BASE_URL_USER)
            .end(function (req, res) {
              expect(res.statusCode).to.equal(401)
              done()
            })
        })
      }),
        describe('with incorrect token', () => {
          it('should be return forbiden', done => {
            chai.request(app).get(BASE_URL_USER)
              .set('Authorization', 'Bearer sasdajshdashdjashd')
              .end(function (req, res) {
                expect(res.statusCode).to.equal(403)
                done()
              })
          })
        }),
        describe('with correct token', () => {
          it('should be return success', done => {
            chai.request(app).get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .end(function (req, res) {
                expect(res.statusCode).to.equal(200)
                done()
              })
          })
        })
    })
    describe('to validate parameter', () => {
      describe('without parameter',()=>{
        it('should be return success and response with default data', done => {
          chai.request(app)
            .get(BASE_URL_USER)
            .set('Authorization', `Bearer ${adminToken.accessToken}`)
            .end(function (req, res) {
              expect(res.statusCode).to.equal(200)
              expect(res.body.page_index).to.equal(1)
              expect(res.body.page_size).to.equal(10)
              done()
            })
        })
      })
      describe('page index', () => {
        describe('is correct value', () => {
          it('should be return success', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ page_index: 1 })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(200)
                done()
              })
          })
          it('should be return data has correct page index', done => {
            const pageIndex = 1;
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ page_index: pageIndex })
              .end(function (req, res) {
                expect(res.body.page_index).to.equal(pageIndex.toString())
                done()
              })
          })
        })
        describe('is not a number', () => {
          it('should be return bad request', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ page_index: 'a' })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(400)
                done()
              })
          })
        })
        describe('is nagative number', () => {
          it('should be return bad request', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ page_index: -1 })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(400)
                done()
              })
          })
        })
        describe('is float number', () => {
          it('should be return bad request', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ page_index: 1.5 })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(400)
                done()
              })
          })
        })
        describe('has special characters', () => {
          it('should be return bad request', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ page_index: '1@' })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(400)
                done()
              })
          })
        })
      })
      describe('page size', () => {
        describe('is correct value', () => {
          it('should be return success', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ page_size: 1 })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(200)
                done()
              })
          })
          it('should be return data has correct page index', done => {
            const pageSize = 1;
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ page_size: pageSize })
              .end(function (req, res) {
                expect(res.body.page_size).to.equal(pageSize.toString())
                done()
              })
          })
        })
        describe('is not a number', () => {
          it('should be return bad request', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ page_size: 'a' })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(400)
                done()
              })
          })
        })
        describe('is nagative number', () => {
          it('should be return bad request', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ page_size: -1 })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(400)
                done()
              })
          })
        })
        describe('is float number', () => {
          it('should be return bad request', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ page_size: 1.5 })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(400)
                done()
              })
          })
        })
        describe('has special characters', () => {
          it('should be return bad request', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ page_size: '1@' })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(400)
                done()
              })
          })
        })
      })
      describe('filter', () => {
        describe('is correct value', () => {
          const filter = '1';
          it('should be return success', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ filter: filter })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(200)
                done()
              })
          })
          it('should be return correct data', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ filter: filter })
              .end(function (req, res) {
                expect(res.body.count).to.equal(1)
                done()
              })
          })
        })
        describe('is a number', () => {
          it('should be return sucess', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ filter: 1 })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(200)
                done()
              })
          })
        })
        describe('has special characters', () => {
          it('should be return bad request', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ filter: '1@' })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(400)
                done()
              })
          })
        })
      })
      describe('sort field', () => {
        describe('is correct value', () => {
          it('should be return success', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ sort_field: 'userId' })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(200)
                done()
              })
          })
        })
        describe('is a field not existed', () => {
          it('should be return sucess', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ filter: 1 })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(200)
                done()
              })
          })
        })
      })
      describe('sort type', () => {
        describe('is DESC', () => {
          it('should be return success', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ sort_field: 'userId' })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(200)
                done()
              })
          })
        })
        describe('is ASC', () => {
          it('should be return success', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ sort_field: 'userId' })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(200)
                done()
              })
          })
        })
        describe('is a another string', () => {
          it('should be return sucess', done => {
            chai.request(app)
              .get(BASE_URL_USER)
              .set('Authorization', `Bearer ${adminToken.accessToken}`)
              .query({ filter: 1 })
              .end(function (req, res) {
                expect(res.statusCode).to.equal(200)
                done()
              })
          })
        })
      })
    })
    describe('to validate data accoding to permission',()=>{
      describe('is director',()=>{
        it('should be return data all users in the same company', done => {
          chai.request(app).get(BASE_URL_USER)
            .set('Authorization', `Bearer ${adminToken.accessToken}`)
            .end(function (req, res) {
              expect(res.statusCode).to.equal(200)
              expect(res.body.count).to.equal(4)
              done()
            })
        })
      })
      describe('is department lead',()=>{
        it('should be return data all users in the same department', done => {
          chai.request(app).get(BASE_URL_USER)
            .set('Authorization', `Bearer ${departmentLeadToken.accessToken}`)
            .end(function (req, res) {
              expect(res.statusCode).to.equal(200)
              expect(res.body.count).to.equal(3)
              done()
            })
        })
      })
      describe('is team lead',()=>{
        it('should be return data all users in the same team lead', done => {
          chai.request(app).get(BASE_URL_USER)
            .set('Authorization', `Bearer ${teamLeadToken.accessToken}`)
            .end(function (req, res) {
              expect(res.statusCode).to.equal(200)
              expect(res.body.count).to.equal(2)
              done()
            })
        })
      })
      describe('is user',()=>{
        it('should be return data just user', done => {
          chai.request(app).get(BASE_URL_USER)
            .set('Authorization', `Bearer ${userToken.accessToken}`)
            .end(function (req, res) {
              expect(res.statusCode).to.equal(200)
              expect(res.body.count).to.equal(1)
              done()
            })
        })
      })
    })
  })
})
