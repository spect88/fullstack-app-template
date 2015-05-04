import app from '../../server/app';
import request from 'supertest';

let verifyRequest = (done) => {
  return (err) => (err == null) ? done() : done.fail(err);
};

describe('server app', () => {
  it('returns 404 on non-existing path', (done) => {
    request(app)
      .get('/nonexisting')
      .expect(404)
      .end(verifyRequest(done));
  });

  it('serves static assets', (done) => {
    request(app)
      .get('/favicon.png')
      .expect(200)
      .end(verifyRequest(done));
  });

  it('renders index html page with asset paths', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect(/src="\/app\.js"/)
      .expect(/href="\/app\.css"/)
      .end(verifyRequest(done));
  });
});
