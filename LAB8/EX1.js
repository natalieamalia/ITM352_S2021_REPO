require("./product_data.js"); 
var num_products = 5;
var item_number = 1;

while (item_number < (num_products + 1)) {
    console.log (`${item_number}.${eval('name' + item_number)}`);
    item_number++;
}
console.log("That's all we have!");