var express = require('express');
var app = express();
var myParser = require("body-parser");
var qs = require('qs');
var fs = require('fs');

app.use(myParser.urlencoded({ extended: true }));

app.all('*', function (request, response, next) {
    console.log(request.method, request.path);
    next();
});

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="process_login" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/process_login", function (request, response) {
        // Process login form POST and redirect to logged in page if ok, back to login page if not
        let username_enetered = request.body["username"];
        let password_entered = request.bod["password"];
        if (typeof user_data == users_reg_data
            [request.body.username].password) {
                response.send(`Thank you ${request.body.password}for logging in.`);
            } else {
                response.send (`Hey! ${request.body.password} does not match what we have for you`);
            }
    });

app.listen(8080, () => console.log(`listening on port 8080`));