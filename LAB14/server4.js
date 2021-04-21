var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');
const { exit } = require('process');

app.use(myParser.urlencoded({ extended: true }));

//var user_data = require('./user_data.json');
//reads the user data file
var user_file = "./user_data.json";
if (fs.existsSync(user_file)) {
    var file_stats = fs.readFileSync(user_file, 'utf-8');
    //console.log(`${user_file} has ${file_stats["size"]} characters.`);
    var user_data = JSON.parse(fs.readFileSync(user_file, 'utf-8'));
    console.log("user_data=", user_data);
} else {
    console.log(`Sorry, ${user_file} does not exist.`);
}

//This adds a new user to the database
username = 'newuser';
users_data[username] = {};
user_data[username].password = 'newpass';
user_data[username].email = 'newuser@user.com';
user_data[username].name = 'New Name';
//Saves new user data into database
fs.writeFileSync(user_file, JSON.stringify(user_data));

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="/login" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log("Got a POST login request");
    POST = request.body;
    user_name_from_form = POST["username"];
    console.log("User name from form=" + user_name_from_form);
    if (user_data[user_name_from_form] != undefined) {
        response.send(`<H3> User ${POST["username"]} logged in`);
    } else {
        response.send(`Sorry`);
    }
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="/register" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/register", function (request, response) {
    // process a simple register form
    POST = request.body;
    console.log("Got register POST");
    if (POST["username"] != undefined && POST['password'] != undefined) {          // Validate user input
        username = POST["username"];
        user_data[username] = {};
        user_data[username].name = username;
        user_data[username].password = POST['password'];
        user_data[username].email = POST['email'];

        data = JSON.stringify(user_data);
        fs.writeFileSync(user_file, data, "utf-8");

        response.send("User " + username + " logged in");
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));