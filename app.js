// 1* to create a new app
const express = require("express");
//5b* NODE (hTTPS MODEL) is used here to perform a Get Request
const https = require("https");

//20a* Body parser is a package that is going to allow us to llok through the body of the post request and fetch the data based on the name of my input (see html form for input name), which is called (cityName)
const bodyParser = require("body-parser");



// 2* it intializes  a new express app
const app = express();

//20b* use the body parser, always like that
app.use(bodyParser.urlencoded({extended: true}));

// 5 a, b
// 5a* instead of sending ("Server is up and running"), we want to realese weather data ! for that, we have to do get request to  Openweather Server (the website), and fetch the data from an API as JSON data,  and Parse the data to get the relevant data (the one the user want)
// 5a in short; how make a call to a API external inside express server
// 5a or make get request to external server node

// 4* we found the chanel to get to the server, it works
app.get("/", function(req, res) {
  // res.send("Server is up and running"); I stopped this in step 12* becuase we cant have 2 res.send

  // 17* for checking, to send the html file to the browaer;
   res.sendFile(__dirname + "/index.html");
});

// 19* we have to catch the post when the post is done on our website by users
app.post("/", function(req, res) {

  // 21* to make it dynamic, based on what what user types as input (what ever the city name) is
  console.log(req.body.cityName);
  // console.log("Post request recieved.");



  // 16 a,b,c
  //16*a we break down our URL to small parts to allow us to tempreture of wherever we want
  // const query ="London";

  //22* the cityName which the user adds (write), it becomes variable now
  const query = req.body.cityName; // this query it goes in to the URL as a parameter too :)
  // 16* take out the appid as well
  const apiKey = "eb9adad45b61efd10476bc83c21c7388&units=metric";
  // 16c*
  const unit = "metric"

  // 6 a,b
  // 6a* > kaka the url needs https:// at the begning
  // const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=";

  //16b*
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

// 23|* for the location (cityNmae) which is added by the user, we get the data for it below
  // 6b*  this is get request across internet = fetch data from an external server
  https.get(url, function(response) { // 6b* we add the url into here
    console.log(response);
    // 7* to see what is in this call back:
    console.log(response.statusCode); // statusCode is asscociated with the call back

    //
    // 8* we use (.on model) to the call back (response from Open weather website), chacking for the data if exist
    response.on("data", function(data) {
      console.log(data);
      // 9*a to have the data in JSON format
      // JSON.parse(data)  lets save it in a variable
      // // 9*b JSON.parse means change it to JSON and showed nicly and vertically
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      // 10* from the weatherData vsrisble get temp >>>> kaka in the call back you can get this path dont worry :)
      const temp = weatherData.main.temp
      console.log(temp);
      //11* for another element from the call back
      const weatherDescription = weatherData.weather[0].description
      console.log(weatherDescription);
      // 15 a,b
      // 15a* to get the icon
      const icon = weatherData.weather[0].icon
      const imageURL = "http:/openweathermap.org/img/wn/" + icon + "@2x.png"


      //12 a b c
      //   12*a after we succesfuly could get data  from an external API, now we try to put it on our website.
      //12b* so, inorder to pass the data into our app.get (line 20, this is our server not the external), we have to tap in to our response (res). awara Response is from the external to our server, now we sent it back from our server to the client



      // 24* then here we send back the data for that cityName (add by the user) to the browser

      //12c*
      // res.send("The tempreture in London is " + temp + "degree Celcius.");
      // res.send("<h1>The tempreture in London is " + temp + "degree Celcius.</h1>")

      // 13*becuase we have to have only one res.send, we change it to res.write like that
      // res.write("<h1>The tempreture in London is " + temp + "degree Celcius.</h1>");
      res.write("<h1>The tempreture in " +  query + " is " + temp + "degree Celcius.</h1>");

      res.write("<p>The weather is currently " + weatherDescription + "<p>");

      // res.write("<p>The weather in " + query + " is currently " + weatherDescription + "<p>");
      // 15*
      res.write("<img src=" + imageURL + ">") // imageURL used as the sourse of the image :)
      // 14*
      res.send();

      //     })
      //     // res.send("Server is up and running");
    });

  });
});





// 3*
app.listen(3000, function() {
  console.log("server is running on port 3000.")
})
