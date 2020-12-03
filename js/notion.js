
// convert YouTube to embed


const ytEmbed = (sourceID) => {

    let embedTemplate = '<iframe width="500" height="300" src="https://www.youtube.com/embed/' + sourceID + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    return embedTemplate;

}

function replaceStuff(){

var amountSources = document.querySelectorAll('.source').length;
var amountProperties = document.querySelector('.properties').firstChild.querySelectorAll('tr').length;



    for(i=0;i < amountProperties;i++){
        let propContent = document.querySelector('.properties').firstChild.querySelectorAll('tr')[i].lastChild.innerHTML;
        if (propContent == ''){
            document.querySelector('.properties').firstChild.querySelectorAll('tr')[i].innerHTML="";
        }
        
    }
    
    for(i=0;i < amountSources;i++){
        let sourceID = document.querySelectorAll('.source')[i].firstChild.attributes.href.value.split("=")[1];
        let includesYT = document.querySelectorAll('.source')[i].firstChild.attributes.href.value.split("=")[0].includes('yout'); 
        if (sourceID && includesYT == true){
            includesYT = document.querySelectorAll('.source')[i].firstChild.innerHTML = ytEmbed(sourceID);
        }
        
    }

}



document.querySelectorAll('.source')[1].firstChild.attributes.href.value.split("=")[1];


// if
// document.querySelector('.properties').firstChild.querySelectorAll('tr')[7].lastChild.innerHTML

// for(i=0;)

// document

// <iframe width="1015" height="571" src="https://www.youtube.com/embed/DMcrWHLCsPE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>