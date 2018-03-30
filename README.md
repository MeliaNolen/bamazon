# bamazon
bamazon is a command line app(CLI) that mimics the marketplace functionality of amazon.

### MODIFICATIONS:
In [bamazon.js](./bamazon.js):
1. bamazon will run on port 3306 by default.  If your local device requires a different port, you will need to change the port value on line 7.
2. You may also need to change the password for MySQL on line 8.

In [bamazonDB.sql](./bamazonDB.sql):
1. There are 8 seed data entries so far.  If you would like to change those, or add more, you may do so in this file.

### SET UP:
1. Clone this repository
2. In the command line: cd into the bamazon folder, install the packages needed in package.json by running
```npm i```
3. Create the database and table used by running [bamazonDB.sql](./bamazonDB.sql) in MySQL 
    * [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

*Now you are ready to use the app on your machine.*

### TO USE THIS APP:
1. In command line: 
![](screenshots/1.png)
