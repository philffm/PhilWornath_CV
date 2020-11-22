var slotState=0;
var slotTriggerCount=0;

var myActivities = [["👨🏽‍💻Coding and ", "☕️","🍵"],["🚴‍♀️ Cycling and ", "UX Podcasts","Tech Podcasts"], ["👂Listening to ", "UX Podcasts", "Tech Podcasts"],["🤓 Reading ", "Stackoverflow", "dev.to posts", "Hackernoon posts", "E-books"], ["🕵🏽‍♀️ Conducting ", "User tests", "Interviews"], ["🤖 Tinkering ", "Arduino", "Raspberry Pi", "Rapid Prototypes", "with ESP32"], ["👀 Watching ", "Online courses", "Tech YouTubers"], ["🏗 Building ", "Figma components ❖ ", "Design libraries", "HiFi Prototypes", "Testing setup", "Hardware prototypes"], ["🏃‍♀️Joining ", "Tech Meetups", "Design Meetups", "Tech Conferences","a Hackathon"]];
var myLocations = ["Den Haag", "Frankfurt","Las Palmas", "Sofia" ,"Berlin", "Amsterdam", "Santa Cruz de Tenerife", "Zoetermeer", "Utrecht", "Delft", "Rotterdam", "Kijkduin"];
var currentCity = myLocations[Math.floor(Math.random() * myLocations.length)];
var currentWeather = 'Cloudy';
var currentLocation;
const API_KEY_WEATHER = '79e426a88a82a92f97b3758741d3d619';

var authData = {
	access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5ZTNmYjVmNTY1MDI0ZDY3OTI2Nzk1NmU0ZTY4MTJjYiIsImlhdCI6MTYwMzQwNDMxMCwiZXhwIjoxOTE4NzY0MzEwfQ.XkyN-LGT6EC_nB0HcZaeipXL_mnkNxuzQ8wDAifXiVw",
	expires_in: 3600,
	token_type: "Bearer"
};


const request = async url => {
  const reponse = await fetch(url);
  return response.ok ? response.json() : Promise.reject({error: 500});
};


function weatherBalloon( cityName ) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName+ '&appid=' + API_KEY_WEATHER)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
    currentWeather = data;
  })
  .catch(function() {
    // catch any errors
  });
}

// const getWeatherInfo = async ( element ) => {
//   try {
//       const q = document.querySelector('#location p').innerText;
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY_WEATHER}`;
//       const response = await request(url);
//       const weatherElememt = document.querySelector('#conditions p');
//       weatherElememt.innerText = JSON.stringify(response);

//   } catch(err) {
//       console.log(err);
//   }
// };
function appendStuff(where,what){
  document.getElementsByTagName(where)[0].appendChild(what);

}

async function initAsync() {
  //asyncCall(  checkElements('nav','MENU',adjustMenu) );
  //asyncCall(  checkElements('.slot-handle','',slotInit));
  waitingFor(100, 5, 'nav', adjustMenu);
  var slotBtn = function(){ dropEvent('#slot-handle', slotInit);};
  waitingFor(100, 5, '#slot-handle', slotBtn );

}

async function dropEvent(eventSelector, eventFunction ){
  const selector = document.querySelector(eventSelector); // Find the paragraph element in the page
  selector.onclick = eventFunction;
  
}

function showAlert(event) {
    alert("onclick Event triggered!");
}



async function slotInit(){
    //w3.hide('.profile-info')
    slotTriggerCount++;

    switch(slotState) {
      case 0:
        weatherBalloon(currentCity);
        document.querySelector('#conditions p').innerText = "❓";
        document.querySelector('#location p').innerText = "❓";
        document.querySelector('#activity p').innerText = "❓";
  
        document.querySelector('.profile-info').style.transition = "all .5s"; 
        document.querySelector('.profile-info').style.opacity = "0"; 
        document.querySelector('.slotresults').style.opacity = "0"; 
  
        setTimeout(function(){ 
        document.querySelector('.profile-info').style.display= "none";     
        document.querySelector('.profile-img').style.display= "none";     

        document.querySelector('.resultwrapper').style.display="";    
        LoadCSS('dm.css');
        },500);
  
        setTimeout(function(){ 
          document.querySelector('.slotresults').style.opacity = "0"; 
          document.querySelector('.slotresults').style.transition = "all 1s"; 
          document.querySelector('.slotresults').style.opacity = "1"; 
            },500);
  
        
        console.log('SLOT SUCCESS');
        getAPI();

        slotState++;

      break;

      case 1:

        document.querySelector('#location p').innerText = currentWeather.name + ', ' + currentWeather.sys.country ;
        // document.querySelector('#location p').innerText = currentLocation;
        slotState++;
      break;
      case 2:

        var timeEpoch = currentWeather.dt + currentWeather.timezone;
        
        var date = new Date( timeEpoch *1000);

        var time = date.getHours() + ':' + date.getMinutes();
  
       
        document.querySelector('#conditions p').innerHTML = "⛅️" +"<br>" + Math.round((currentWeather.main.temp-273) * 10) / 10 + '°C' +"<br>" + currentWeather.weather[0].main +"<br>"+ time  ;
        slotState++;

      break;

      case 3:

        var randActivity = Math.floor(Math.random() * myActivities.length);
        var newActivity = myActivities[randActivity][0] ;
        var s = [Math.floor(Math.random() * myActivities[randActivity].length)];
        if (s == 0){s++}; 
        var subActivity = myActivities[randActivity][s];
        document.querySelector('#activity p').innerText = newActivity + subActivity;
        if (slotTriggerCount>10){
          slotTriggerCount=0;
          slotState++;
        }
      break;
      case 4:
        
          if(slotTriggerCount < 2){
            document.querySelector('.slotresults').style.display="none";    
            document.querySelector('.bigwin').style.display="";   

          }else{

            slotState--;
            slotTriggerCount=0;
            document.querySelector('.slotresults').style.display="";    
            document.querySelector('.bigwin').style.display="none";   

          }
            
          
          break;

      default:
        document.querySelector('.profile-info').style.display= "";     
        document.querySelector('.profile-img').style.display= "";     

        document.querySelector('.resultwrapper').style.display="none";    

    



    }



    var slotBtn = function(){ dropEvent('#slot-handle', slotInit);};

  }



 
  


function getAPI(){
      // Call the API
    fetch('https://hass.philwornath.com/api/states/sensor.redmi_note_9s_geocoded_location', {
      mode: 'no-cors', // 'cors' by default
      method: 'GET',
      headers: {
        'Authorization': authData.token_type + ' ' + authData.access_token	}
    }).then(function (resp) {

      // Return the response as JSON
      return resp.json();

    }).then(function (data) {

      // Log the API data
      console.log('token', data);
      currentLocation=data.attributes.Locality +', ' + data.attributes.Country ;

    }).catch(function (err) {

      // Log any errors
      console.log('something went wrong', err);

});



  // xhr.open("GET", "https://hass.philwornath.com/api/states/sensor.redmi_note_9s_geocoded_location", false);
  // xhr.setRequestHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5ZTNmYjVmNTY1MDI0ZDY3OTI2Nzk1NmU0ZTY4MTJjYiIsImlhdCI6MTYwMzQwNDMxMCwiZXhwIjoxOTE4NzY0MzEwfQ.XkyN-LGT6EC_nB0HcZaeipXL_mnkNxuzQ8wDAifXiVw");
  // xhr.send("");
  // console.log(xhr);

  }


  

async function LoadCSS(cssurl){
  var link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = cssurl;
  document.head.appendChild(link);
}

async function RemoveCSS(cssurl){
    document.querySelector('link[href$="'+cssurl+'"]').remove();
}


async function LoadJS(jsurl){
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', jsurl);
    document.head.appendChild(script);
}

async function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
  }
  

async function initFonts(){
    LoadCSS("https://fonts.gstatic.com");
    LoadCSS("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400&display=swap");
}


async function waitingFor(delay=100, tries=10, selector, runFunction) {
  selector = selector;
  var el = document.querySelector(selector);
  setTimeout( function () {
      tries--;
      if (el) {
        runFunction();
          // we have a match, do your stuff
          console.log('Yeah, match after: ' + tries);
          tries=0;
      } else if (tries > 0) {
          // we are not ready, let's try again
          setTimeout(function () {
              waitingFor(delay, tries, selector, runFunction);

          }, delay);
          console.log('Try: ' + tries);
      } else {
          // ok... we give up, maybe inform the client now
          // or execute alternative stuff
          console.log('Sorry, no match');
      }
  }, delay);
}


async function adjustMenu(){
  if (docTitle.includes("Resume")){
      document.querySelector('nav#cv').style.display="";
  }else if (docTitle.includes("Portfolio")) {
      document.querySelector('nav#portfolio').style.display="";
  }else{}
  console.log("NAV Element Added", element);
}


initAsync();
