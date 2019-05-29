let mysql = require("mysql");
let inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

// function afterConnection() {
//     connection.query("SELECT * FROM products", function(err, res) {
//         if (err) throw err;
//         res.forEach(function (item) {
//             console.log(item.product_name);
//             // =================${item.title}===================
//             // Artist: ${item.artist}
//             // Genre: ${item.genre}
    
//         });   
        
//     connection.end();
//   });
// }

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      displayAllProducts(res);
      purchasePrompt(res);

      

});
}

function displayAllProducts(res) {
  res.forEach(function (item) {
    let idString = "ID: " + item.id.toString().padEnd(3, " ");
    let productNameString = "Product: " + item.product_name.toString().padEnd(28, " ");
    let categoryString = "Department: " + item.department_name.toString().padEnd(25, " ");
    let priceString = "Price: " + item.price.toFixed(2).padEnd(12, " ");
    let stockQuantityString = "Stock: " + item.stock_quantity.toString().padEnd(10, " ");

    console.log(idString + productNameString + categoryString + priceString + stockQuantityString);
    

});   

}

function purchasePrompt (res) {

  inquirer
  .prompt([
    {
      type: "input",
      message: "What is the ID of the product you would like to purchase?",
      name: "purchaseId"
    },
    {
      type: "input",
      message: "How many would you like to purchase?",
      name: "purchaseQuantity"
    }
  ])
  .then(function(inquirerResponse) {
    console.log(inquirerResponse.purchaseId);


    if (inquirerResponse.purchaseQuantity < 0) {
      console.log("Purchase quantity must be greater than zero");
      purchasePrompt(res);
    }
    else if (inquirerResponse.purchaseId < 0) {
      console.log("Purchase ID must be greater than zero");
      purchasePrompt(res);

    }
    else {
      order(inquirerResponse.purchaseId, inquirerResponse.purchaseQuantity);
    }

    });
  };

function order(id, quantity) {
  console.log("ORDER!"
   + id + quantity);

   connection.query("SELECT * FROM products WHERE id = " + id, function(err, res) {
    if (err) throw err;

    if (!res.id) {
      console.log ("Ivalid Product ID");
    }
    console.log(res);



  connection.end(); 
  
  });
}