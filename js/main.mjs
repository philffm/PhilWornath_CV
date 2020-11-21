var slotState=false;

var myActivities = [["Coding and ", "☕️","🍵"],["🚴‍♀️ Cycling and ", "UX Podcasts","Tech Podcasts"], ["Listening to ", "UX Podcasts", "Tech Podcasts"],["🤓 Reading ", "Stackoverflow", "dev.to posts", "Hackernoon posts", "E-books"], ["🕵🏽‍♀️ Conducting ", "User tests", "Interviews"], ["🤖 Tinkering ", "Arduino", "Raspberry Pi", "Rapid Prototypes", "with ESP32"], ["Watching 👀", "You", "Tech YouTubers"], ["🏗 Building ", "Figma components ❖ ", "Design libraries", "HiFi Prototypes", "Testing setup"]];
var myLocations = [["Den Haag","Beach 🏖","At home 🏡", "Cycling 🚲"], ["Frankfurt","Main river"], ];


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

    if (slotState == false) {
      document.querySelector('.profile-info').style.transition = "all .5s"; 
      document.querySelector('.profile-info').style.opacity = "0"; 
      document.querySelector('.slotresults').style.opacity = "0"; 

      setTimeout(function(){ 
      document.querySelector('.profile-info').style.display= "none";     
      document.querySelector('.slotresults').style.display="";    
      },500);

      setTimeout(function(){ 
        document.querySelector('.slotresults').style.opacity = "0"; 
        document.querySelector('.slotresults').style.transition = "all 1s"; 
        document.querySelector('.slotresults').style.opacity = "1"; 
          },500);

      
      console.log('SLOT SUCCESS');
      slotState = true;

    }else if (slotState == true) {
      var randActivity = Math.floor(Math.random() * myActivities.length);
      var newActivity = myActivities[randActivity][0] ;
      var s = [Math.floor(Math.random() * myActivities[randActivity].length)];
      if (s == 0){s++}; 
      var subActivity = myActivities[randActivity][s];
      document.querySelector('#activity p').innerText = newActivity + subActivity;
    }


    var slotBtn = function(){ dropEvent('#slot-handle', slotInit);};

  }



 
  


function getAPI(){

  var xhr = new XMLHttpRequest();

  xhr.open("GET", "https://hass.philwornath.com/api/states/sensor.redmi_note_9s_geocoded_location", false);
  xhr.setRequestHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5ZTNmYjVmNTY1MDI0ZDY3OTI2Nzk1NmU0ZTY4MTJjYiIsImlhdCI6MTYwMzQwNDMxMCwiZXhwIjoxOTE4NzY0MzEwfQ.XkyN-LGT6EC_nB0HcZaeipXL_mnkNxuzQ8wDAifXiVw");
  xhr.send("");
  console.log(xhr);


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
