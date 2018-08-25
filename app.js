var express = require ("express");
var request = require ("request");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
var myJSON ={
                "Tell me a bit about yourself" : "Hi ! I am Klanti. I recent grad with a CS degree",
                "What excites you about technology":"The fact that there is no limit to one's creativity",
                "What is you preferred technology stack":"MERN",
                "What are you favorite hobbies":"I love journaling, it is not a hobby per say but more of a self care practice for me"
             };
// var myObj = JSON.parse(myJSON);
app.get("/",function(req, res){
  res.send("Hello from my assignment");
});
app.get("/posts", function(req,res){
  var url = "https://jsonplaceholder.typicode.com/posts";
  request(url, function(error, response, body){
    if(!error && response.statusCode == 200){
      var data = JSON.parse(body);
      // res.send(parseData[0]);
      res.render("posts", {data: data});
    }
    else{
      console.log("Something went wrong");
    }
  });
});
app.get("/aboutme",function(req,res){
  res.send(myJSON);
});
app.get("/aboutme/:question",function(req,res){
  var responses = {
    description: "Tell me a little bit about yourself? : Hi ! I am Klanti. I recent grad with a CS degree",
    tech: "What excites you about technology? : The fact that there is no limit to one's creativity",
    techstack: "What is your preferred technology stack? : MERN",
    hobbies: "What are your favorite hobbies? :  love journaling, it is not a hobby per say but more of a self care practice for me"
  };
  var question = req.params.question.toLowerCase();
  //The reason I added toLowerCase() is because I donot know what the user
  // will type in, in absence of toLowerCase function what happens is
  //if the user enters TECH I will get  -- The  TECG says undefined
  var response = responses[question];

  res.send("The param is " + question + ": " + response);
});
app.get("*",function(req,res){
  res.send("Not Found");
});
app.listen(3000, function(){
  console.log("Server has started");
});
