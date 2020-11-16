
var slotState=false;
window.addEventListener('DOMContentLoaded', initAsync);  // load

var myActivities = [["Coding and", "☕️","🍵"], ["Listening to ", "UX Podcasts", "Tech Podcasts"],["Reading ", "Stackoverflow", "dev.to posts", "Hackernoon.com news"]];
var myLocations = [["Den Haag","Beach 🏖","At home 🏡", "Cycling 🚲"], ["Frankfurt","Main river"], ];



function appendStuff(where,what){
  document.getElementsByTagName(where)[0].appendChild(what);

}


async function initAsync() {
  //asyncCall(  checkElements('nav','MENU',adjustMenu) );
  //asyncCall(  checkElements('.slot-handle','SLUT',slotInit));
   
  (function() {

      // monitor the page for changes and reapply if necessary
      // use 'observer.disconnect()' in 'fnCheckChanges()' to stop monitoring
    
      var alvo = document.querySelector('nav');
      var observer = new MutationObserver(fnCheckChanges);
      observer.observe(alvo, { attributes: true, characterData: true, childList: true, subtree: true });
    
    })();
    
    function fnCheckChanges(changes, observer) {
    
      console.log('page changed');
      adjustMenu();
    }
    
    
}



  function slotInit(){
    //w3.hide('.profile-info')
    waitForElement('.profile-info');

    document.querySelector('.profile-info').style.display= "none";
    console.log('SLOT SUCCESS');
    document.querySelector('.slotresults').style.display="";


  }



  async function adjustMenu(){
    if (docTitle.includes("Resume")){
        document.querySelector('nav#cv').style.display="";
    }else if (docTitle.includes("Portfolio")) {
        document.querySelector('nav#portfolio').style.display="";
    }else{}
    console.log("NAV Element Added", element);
  }
  


function myfunction(){

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


function waitingFor (delay = 200, tries = 10) {
  var el = document.querySelector('nav');

  setTimeout(function () {
      tries--;
      if (el && el.length) {
          adjustMenu();
          // we have a match, do your stuff
          console.log('Yeah, match after: ' + tries);
      } else if (tries > 0) {
          // we are not ready, let's try again
          setTimeout(function () {
              waitingFor(delay, tries)
              adjustMenu();

          }, delay);
          console.log('Try: ' + tries);
      } else {
          // ok... we give up, maybe inform the client now
          // or execute alternative stuff
          console.log('Sorry, no match');
      }
  }, delay);
}
waitingFor(100, 20);