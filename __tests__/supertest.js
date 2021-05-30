 
/*
  BEFORE TESTING:
    - Install Jest and Supertest
    - Configure the application package.json test script
*/

const request = require('supertest');
   
const server = `http://localhost:${8080}`;
 
  describe('Route integration', () => { 
    describe('/', () => { 
      describe('GET', () => { 
        it('Responds with status code 200 and json content type ', () => { 
          return request(server) 
            .get('/') 
            .expect('Content-Type',  /json/) 
            .expect(200) 
        }); 
      }); 
    });
 
      describe('/signup', () => { 
        describe('POST', () => { 
          it('Responds with status code 200 and json content type ', () => { 
            return request(server) 
              .post('/signup') 
              .send({username:"test", password:"test", emailaddress:"test"}) 
              .expect('Content-Type',  /json/) 
              .expect(200) 
          }); 
        }); 
    });
 
      describe('/login', () => { 
        describe('POST', () => { 
          it('Responds with status code 200 and json content type ', () => { 
            return request(server) 
              .post('/login') 
              .send({username:"test", password:"test"}) 
              .expect('Content-Type',  /json/) 
              .expect(200) 
          }); 
        }); 
    });
 
      describe('/tweets', () => { 
        describe('GET', () => { 
          it('Responds with status code 200 and json content type ', () => { 
            return request(server) 
              .get('/tweets') 
              .expect('Content-Type',  /json/) 
              .expect(200) 
          }); 
        }); 
    });
 
  }); 
