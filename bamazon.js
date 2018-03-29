var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected at id ' + connection.threadId + '\n');
    readDB();
});

function readDB() {
    console.log('List of products ready to purchase: \n');
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log('id: ' + res[i].item_id + '\n' +
                'Product: ' + res[i].product_name + '\n' +
                'Price: $' + res[i].price + '\n' +
                '----------------------');
        }
        buy(res);
    });
};

function buy(res) {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What is the id of the item you would like to purchase?'
        },
        {
            name: 'units',
            type: 'input',
            message: 'How many units would you like to purchase?'
        }
    ]).then(function (answers) {
        var itemObject = res[answers.id - 1];
        if (itemObject.stock_quantity - answers.units < 0) {
            return console.log('----------------------\nNot enough in stock!');
        }
        else {
            // console.log(typeof (parseInt(answers.id)));
            console.log('----------------------\nThere are currently ' + itemObject.stock_quantity + ' in stock.');
            connection.query('UPDATE products SET ? WHERE ?',
                [
                    {
                        stock_quantity: itemObject.stock_quantity - answers.units
                    },
                    {
                        item_id: parseInt(answers.id)
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log('----------------------\n' + res.affectedRows + ' rows affected!');
                    console.log('----------------------\nORDER SUMMARY:' +
                        '\nProduct: ' + itemObject.product_name +
                        '\nPrice: $' + itemObject.price +
                        '\nQuantity: ' + answers.units +
                        '\nTotal Cost: $' + itemObject.price * answers.units
                    );
                    
                }
            );
            connection.end();
        }
    });
};
