const mysql = require('mysql');
const assert = require('assert');

describe('Connecting to MySQL', () => {
    it('should connect to mysql', done => {
        const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'empdb'
        });
    
        connection.connect(err => {
        assert.equal(err, null);
        done();
        });
    }).timeout(5000);


});