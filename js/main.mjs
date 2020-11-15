//import {} from 'koiosf_util.mjs';

var slotState=false;
window.addEventListener('DOMContentLoaded', initAsync);  // load
s



async function initAsync() {
  //asyncCall(  checkElements('nav','MENU',adjustMenu) );
  //asyncCall(  checkElements('.slot-handle','SLUT',slotInit));
waitForStuff();
slotInit();
}



async function waitForStuff(){
    waitForElement('nav').then(function(element) {
      adjustMenu();

    });
    
}

function waitForElement(selector) {
  return new Promise(function(resolve, reject) {
    var element = document.querySelector(selector);
  
    if(element) {
      resolve(element);
      return;
    }
  
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        var nodes = Array.from(mutation.addedNodes);
        for(var node of nodes) {
          if(node.matches && node.matches(selector)) {
            observer.disconnect();
            resolve(node);
            return;
          }
        };
      });
    });
  
    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
  }
  

  function slotInit(){
    //w3.hide('.profile-info')
    waitForElement('.profile-info');

    document.querySelector('.profile-info').style.display= "none";
    console.log('SLOT SUCCESS');
    document.querySelector('.slotresults').style.display="";


  }



function adjustMenu(){
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
