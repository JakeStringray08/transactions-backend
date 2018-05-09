import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app';
import fakeTransaction from '../src/util/fakeTransaction';

describe('API Integration Tests', function() {
    let transaction = fakeTransaction();

    describe('#GET /api/transactions', function() { 
      it('should get all transactions', function(done) { 
        request(app).get('/api/transactions')
          .end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body).to.be.an('array'); 
            expect(res.body).to.be.empty; 
            done(); 
          });
      });
    });
    describe('#POST /api/transactions', function() { 
        it('should create a transaction', function(done) { 
          request(app).post('/api/transactions')
          .send(transaction)
          .end(function(err, res) { 
            expect(res.statusCode).to.equal(201); 
            expect(res.body.id).to.equal(transaction.id); 
            done(); 
          }); 
        }); 
      }); 

      describe('#GET /api/transactions/:id', function() { 
        it('should get the transaction by id', function(done) { 
          request(app).get(`/api/transactions/${transaction.id}`)
          .end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body.id).to.equal(transaction.id); 
            done();
          }); 
        }); 
      }); 

      describe('#DELETE /api/transactions/:id', function() { 
        it('should delete the transaction by id', function(done) { 
          request(app).delete(`/api/transactions/${transaction.id}`)
          .end(function(err, res) { 
            expect(res.statusCode).to.equal(200);
            done();
          }); 
        }); 
      }); 
  });