require("./product_data.js"); 

for (var item_number = 1; eval("typeof name"+i) != 'undefined'; item_number++) {
    console.log (`${item_number}.${eval('name' + item_number)}`);
}
console.log("That's all we have!");