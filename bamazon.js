var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 8080,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(function(err){
    if (err) throw err;
    console.log('Connected at ' + connection.threadId + '\n');
    readDB();
});

function readDB() {
    console.log('List of products ready to purchase: \n');
    connection.query('SELECT * FROM bamazon', function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i]);
        }
    });
}
