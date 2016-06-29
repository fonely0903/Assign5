/*
Skycons is a set of ten animated weather glyphs, procedurally generated by JavaScript using the HTML5 canvas tag.
http://darkskyapp.github.io/skycons/
*/
var skycons = new Skycons();
"clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"

  // you can add a canvas by it's ID...
  skycons.add("today", Skycons.PARTLY_CLOUDY_DAY);
  skycons.add("day1", Skycons.CLEAR_DAY);
  skycons.add("day2", Skycons.CLOUDY);
  skycons.add("day3", Skycons.RAIN);

  // start animation!
  skycons.play();  
  // want to change the icon? no problem:
  skycons.set("today", Skycons.PARTLY_CLOUDY_NIGHT);
  
/*
Get value from Bootstrap dropdown menu
*/
$('button').click(function(){
  $('a').each(function(index, element){    
      $.getJSON(getCityJSON($(element).attr('data')),function(data){
        var cityTemp = data.query.results.channel.item.condition.temp;
        $(element).children('span').text(changeCelsius(cityTemp)+ "˚C"); 
      });
  });
});

$('#dropdown li a').on('click', function(){
    // alert($(this).attr("data"));
    getJSONInform(getCityJSON($(this).attr("data")));
    $('button').text($(this).text().slice(0,3));
});

var getCityJSON = function(city){
  var cityName = city.split(' ');
  return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + cityName[0] + "%20" + cityName[1] + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
};

var getJSONInform = function(url){
  $.getJSON(url ,function(data){
    console.log (data) ; // 可以比較方便你找到你要的資料在這個物件的哪個位置

    var curTemp = data.query.results.channel.item.condition.temp  ;
    var curDate = data.query.results.channel.item.forecast[0].date;
    var curWeather = data.query.results.channel.item.condition.text;
    var secDate = data.query.results.channel.item.forecast[1].date;
    var secHighTemp = data.query.results.channel.item.forecast[1].high;
    var secLowTemp = data.query.results.channel.item.forecast[1].low;
    var secWeather = data.query.results.channel.item.forecast[1].text;
    var thirdDate = data.query.results.channel.item.forecast[2].date;
    var thirdHighTemp = data.query.results.channel.item.forecast[2].high;
    var thirdLowTemp = data.query.results.channel.item.forecast[2].low;
    var thirdWeather = data.query.results.channel.item.forecast[2].text;
    var fourthDate = data.query.results.channel.item.forecast[3].date;
    var fourthHighTemp = data.query.results.channel.item.forecast[3].high;
    var fourthLowTemp = data.query.results.channel.item.forecast[3].low;
    var fourthWeather = data.query.results.channel.item.forecast[3].text;


    $('.date').text(curDate);
    $('.weather').text(curWeather);
    $('.temperature').text(changeCelsius(curTemp));
    //draw skycons
    if($('.weather:contains("Cloudy")').length){
      skycons.set("today", Skycons.CLOUDY);
    }else if ($('.weather:contains("Sunny")').length) {
      skycons.set("today", Skycons.CLEAR_DAY);
    }else if($('.weather:contains("Rain")').length || $('.weather:contains("Thunderstorms")').length || $('.weather:contains("Showers")').length){
      skycons.set("today", Skycons.RAIN);
    }else if($('.weather:contains("Fog")').length){
      skycons.set("today", Skycons.FOG);
    }else if($('.weather:contains("Wind")').length){
      skycons.set("today", Skycons.WIND);
    };

    $('.forecast-date > th:first-child').text(secDate);
    $('.forecast-temperature > td:first-child').text(changeCelsius(secLowTemp) + "-" + changeCelsius(secHighTemp) + "˚C");
    $('.forecast-weather > td > #day1').text(secWeather);
    if($('#day1:contains("Cloudy")').length){
      skycons.set("day1", Skycons.CLOUDY);
    }else if($('#day1:contains("Sunny")').length) {
      skycons.set("day1", Skycons.CLEAR_DAY);
    }else if($('#day1:contains("Rain")').length || $('#day1:contains("Thunderstorms")').length || $('#day1:contains("Showers")').length){
        skycons.set("day1", Skycons.RAIN);
    }else if($('#day1:contains("Fog")').length){
        skycons.set("day1", Skycons.FOG);
    }else if($('#day1:contains("Wind")').length){
        skycons.set("day1", Skycons.WIND);
    };

    $('.forecast-date > th:nth-child(2)').text(thirdDate);
    $('.forecast-temperature > td:nth-child(2)').text(changeCelsius(thirdLowTemp) + "-" + changeCelsius(thirdHighTemp) + "˚C");
    $('.forecast-weather > td > #day2').text(thirdWeather);
    if($('#day2:contains("Cloudy")').length) {
      skycons.set("day2", Skycons.CLOUDY);
    }else if($('#day2:contains("Sunny")').length) {
      skycons.set("day2",Skycons.CLEAR_DAY);
    }else if($('#day2:contains("Rain")').length || $('#day2:contains("Thunderstorms")').length || $('#day2:contains("Showers")').length){
      skycons.set("day2", Skycons.RAIN);
    }else if($('#day2:contains("Fog")').length ){
      skycons.set("day2", Skycons.FOG);
    }else if($('#day2:contains("Wind")').length){
      skycons.set("day2", Skycons.WIND);
    };

    $('.forecast-date > th:last-child').text(fourthDate);
    $('.forecast-temperature > td:last-child').text(changeCelsius(fourthLowTemp) + "-" + changeCelsius(fourthHighTemp) + "˚C");
    $('.forecast-weather > td > #day3').text(fourthWeather);
    if($('#day3:contains("Cloudy")').length) {
      skycons.set("day3", Skycons.CLOUDY);
    }else if($('#day3:contains("Sunny")').length) {
      skycons.set("day2",Skycons.CLEAR_DAY);
    }else if($('#day3:contains("Rain")').length || $('#day3:contains("Thunderstorms")').length || $('#day3:contains("Showers")').length){
      skycons.set("day3", Skycons.RAIN);
    }else if($('#day3:contains("Fog")').length ){
      skycons.set("day3", Skycons.FOG);
    }else if($('#day3:contains("Wind")').length){
      skycons.set("day3", Skycons.WIND);
    };
});
};

var changeCelsius = function(temp){
  return Math.round(((temp - 32) * 5) / 9);
};

getJSONInform(getCityJSON("taipei city"));
