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
            return console.log('Not enough in stock!');
        }
        else {
            // console.log(typeof (parseInt(answers.id)));
            console.log(itemObject.stock_quantity);
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
                    console.log(res.affectedRows + ' rows affected!');
                    if (answers.units > 1 && itemObject.department_name != 'shoes') {
                        console.log('Congratulations! You just bought ' + answers.units + ' '
                            + itemObject.product_name + 's for $' + itemObject.price * answers.units + '.');
                    }
                    else if (itemObject.department_name = 'shoes') {
                        if (answers.units > 1) {
                            console.log('Congratulations! You just bought ' + answers.units + ' pairs of '
                                + itemObject.product_name + ' for $' + itemObject.price * answers.units + '.');
                        }
                        else {
                            console.log('Congratulations! You just bought ' + answers.units + ' pair of '
                                + itemObject.product_name + ' for $' + itemObject.price * answers.units + '.');
                        }
                    }
                    else {
                        console.log('Congratulations! You just bought ' + answers.units + ' '
                            + itemObject.product_name + ' for $' + itemObject.price * answers.units + '.');
                    }
                }
            );
        }
    });
};
