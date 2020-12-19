var slotState=0;
var slotTriggerCount=0;

var myActivities = [["👨🏽‍💻Coding and ", "☕️","🍵"],["🚴‍♀️ Cycling and ", "UX Podcasts","Tech Podcasts"], ["👂Listening to ", "UX Podcasts", "Tech Podcasts"],["🤓 Reading ", "Stackoverflow", "dev.to posts", "Hackernoon posts", "E-books"], ["🕵🏽‍♀️ Conducting ", "User tests", "Interviews"], ["🤖 Tinkering ", "Arduino", "Raspberry Pi", "with the soldering iron", "with ESP32"], ["👀 Watching ", "Online courses", "Tech YouTubers"], ["🏗 Building ", "Figma components ❖ ", "Design libraries", "HiFi Prototypes", "Testing setup", "Hardware prototypes"], ["🏃‍♀️Joining ", "Tech Meetups", "Design Meetups", "Tech Conferences","a Hackathon"]];
var myLocations = ["Den Haag", "Frankfurt","Las Palmas", "Sofia" ,"Berlin", "Amsterdam", "Santa Cruz de Tenerife", "Zoetermeer", "Utrecht", "Delft", "Rotterdam", "Kijkduin"];
var currentCity = myLocations[Math.floor(Math.random() * myLocations.length)];
var currentWeather = 'Cloudy';
var currentLocation;
var projectID;
const API_KEY_WEATHER = '79e426a88a82a92f97b3758741d3d619';

// project page stuff
var projectdata;
var projectUrl = window.location.search.replace(/\?/g, '');
console.log(projectUrl);

const slotBtn = function(){ dropEvent('#activity-slot-handle', slotInit);};
const newProjectBtn = function(){ dropEvent('#newproject', newProject);};
const shareBtn = function(){ dropEvent('#share', writeClipboard("test"));};


var authData = {
	access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5ZTNmYjVmNTY1MDI0ZDY3OTI2Nzk1NmU0ZTY4MTJjYiIsImlhdCI6MTYwMzQwNDMxMCwiZXhwIjoxOTE4NzY0MzEwfQ.XkyN-LGT6EC_nB0HcZaeipXL_mnkNxuzQ8wDAifXiVw",
	expires_in: 3600,
	token_type: "Bearer"
};


const request = async url => {
  const reponse = await fetch(url);
  return response.ok ? response.json() : Promise.reject({error: 500});
};



async function writeClipboard(clipBoardText){
  navigator.clipboard.writeText(newClipText);
}

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
  waitingFor(10,30, 'nav', adjustMenu);
  waitingFor(100, 5, '#activity-slot-handle', slotBtn );
  waitingFor(100, 5, '#newproject',  newProjectBtn);
  waitingFor(100, 5, '#share',  shareBtn);

if(docPath.includes('project' || 'portfolio')){
  fetchProject('projects.json',projectdata);
  if (projectUrl){
    // wait for project header loaded so it's safe to exchange fake url
    waitingFor(100, 5, '.project-header', loadProject );    
  }else if(docPath.includes("project")) {
    // redirect when no project:
    window.location.href = "./";
  }
}

if(docTitle.includes('Resume')){
  fetchProject('hackathons.json');
  waitingFor(500,5, '.hackathon .item', loadHackathons);
}else{}
}

async function dropEvent(eventSelector, eventFunction ){
  let selector = document.querySelectorAll(eventSelector); // Find the paragraph element in the page
  
  for (i=0; i < selector.length; i++){
    selector[i].onclick = eventFunction;
  }
  
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
  
       
        // document.querySelector('#conditions p').innerHTML = "⛅️" +"<br>" + Math.round((currentWeather.main.temp-273) * 10) / 10 + '°C' +"<br>" + currentWeather.weather[0].main +"<br>"+ time  ;
        document.querySelector('#conditions p').innerHTML = "⛅️" +"<br>" + Math.round((currentWeather.main.temp-273) * 10) / 10 + '°C' +"<br>" + currentWeather.weather[0].main   ;
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
            document.querySelector('.slot #explain').style.display="none";

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




  }



 
  


function getAPI(){
      // Call the API
    fetch('https://hass.philwornath.com/api/states/sensor.redmi_note_9s_geocoded_location', {
      method: 'GET',
      headers: {
        'Authorization': authData.token_type + ' ' + authData.access_token
      },
      // mode: 'no-cors', // 'cors' by default

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
  }else if(docPath.includes('project')){
    document.querySelector('nav#project').style.display="";
  }else{document.querySelector('nav#portfolio').style.display="";
}


  console.log("NAV Element Added", element);
}


async function fetchProject(input, output, callFunction){
  fetch('./' + input )
  .then(response => response.json())
  .then(projects => {
      // Do something with your data
      console.log(projects);
      projectdata = projects;

      for(var i = 0; i < projectdata.projects.length; i++)
      {
        if(projectdata.projects[i].slug == projectUrl)
        {
          projectID = i;
        }
      }

  });
  callFunction();
}

async function newProject(){
  
  let lenProj = projectdata.projects.length;
  let randProj = Math.floor(Math.random()*(lenProj));
  
  if(projectdata.projects[randProj].slug != projectUrl){
    var newProj =  projectdata.projects[randProj].slug;
    var newurl = '/project.html?' + newProj;
    location.replace(newurl);

  }else{newProject()}

  
}

async function loadProject(){
  // definitions
  LoadCSS('/css/notion.css');
  document.querySelector('main').style.marginTop = "25px";
  let dataSource = projectdata.projects[projectID];
  // document.querySelector("#NOTFOUND").outerHTML="";
  var projectPath = '/../../project/'+ projectUrl + '/';
  let projectTitle = dataSource.title;
  let projectDesc = dataSource.description;
  let projectLogo = projectPath + dataSource.logo;
  let projectWebsite = dataSource.website;
  let projectGitHub = dataSource.github;
  let projectType = dataSource.type;
  var dynHeader = dataSource.headhtml;
  var customJS = dataSource.customjs;


  projectPeriod = projectdata.projects[projectID].period;
  projectContent = projectdata.projects[projectID].content;
  document.title = projectTitle ;

  LoadJS(customJS);
  document.querySelector('.dynheader').innerHTML = dynHeader;

  document.querySelector('div h2 span').innerText = projectTitle;

  document.querySelector('.period').innerHTML = "<strong>Period: </strong>" +projectPeriod;
  document.querySelector('.type').innerHTML = "<strong>Type: </strong>" +projectType;

  document.querySelector('.project-header img.logo').src  = projectLogo;
  document.querySelector('.project-header a.cta').href = projectWebsite;
  document.querySelector('.project-header a.cta').innerHTML = '<span class="socicon-internet"></span> Website';

  if(projectGitHub){
    cloneElement('.project-header .button', 'github', "", projectGitHub,'<span class="socicon-github"></span> GitHub');
    
  }
  document.querySelector('.project-description').innerHTML = projectDesc;
  // document.querySelector('.project-content').innerHTML = projectContent;
  var content  = document.querySelector('.project-content');
  window.history.pushState("", "", '/project/'+projectUrl + '/');
  content.innerHTML += '<div w3-include-html="'  + basePath +  '/'+ projectContent + '.html"></div>';
  w3.includeHTML();
  waitingFor(100, 5, '.project-content style', function(){
    document.querySelector('.project-content style').innerHTML="";

  });
  waitingFor(10,30,'article',replaceStuff);
  waitingFor(10,30,'article',document.querySelector('.content-wrap').style.display = "");

}

async function loadHackathons(){

  let dataSource = projectdata.projects;

  for(i=0; i < dataSource.length; i++){
    let path = 'hackathons/';
    newNode = document.querySelector('#temp_item').cloneNode(true);
    let data = dataSource[i];
    document.querySelector('#temp_item').after(newNode);
    newNode.id = data.slug;
    newNode.querySelector('.time').innerHTML=data.period;
    newNode.querySelector('.job').innerHTML=data.job[0];
    newNode.querySelector('.logo img').src= path +  data.slug  + '/'+ data.logo;
    newNode.querySelector('.challenge h3').innerText= data.title;
    newNode.querySelector('.desc').innerHTML= data.description;
    if(data.slides.includes('pdf')){
      newNode.querySelector('#slides').href= path +  data.slug  + '/' + data.slides;
      newNode.querySelector('#slides').innerText = "View Pitch ❯";
    }else{
      newNode.querySelector('#slides').href= data.slides;
    }
    // newNode.querySelector('#project').style.background = 'rgb(98, 98, 98)';

    newNode.querySelector('#project').href= data.website;


  }
  document.querySelector('#temp_item').outerHTML="";
}


async function cloneElement(selector,cid,cclass, href, text ){

  var ele = document.querySelector(selector);
  var clone = ele.cloneNode(true);
  clone.id = cid;
  if(cclass){
    clone.classList.add(cclass);
  }
  clone.href = href;
  clone.innerHTML = text;
  // Inject it into the DOM
  ele.after(clone);
}

initAsync();
