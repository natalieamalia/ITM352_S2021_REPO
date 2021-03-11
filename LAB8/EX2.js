require("./product_data.js"); 
var num_products = 5;
var item_number = 0;

while (item_number < (num_products)) {
    item_number++;
    if(item_number >= 0.25*num_products && item_number <= 0.75*num_products) {
        console.log('Dont ask for anything else');
        process.exit();
    }
    console.log (`${item_number}.${eval('name' + item_number)}`);
}
console.log("That's all we have!");