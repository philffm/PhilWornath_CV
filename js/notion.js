
// convert YouTube to embed


const ytEmbed = (sourceID) => {

    let embedTemplate = '<iframe width="500" height="300" src="https://www.youtube.com/embed/' + sourceID + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    return embedTemplate;

}

function replaceStuff(){

var elSources = document.querySelectorAll('.source');
var elProperties = document.querySelector('.properties').firstChild.querySelectorAll('tr');
var elCode = document.querySelectorAll('code');

    for(i=0;i < elProperties.length;i++){
        let propContent = elProperties[i].lastChild.innerHTML;
        if (propContent == ''){
            elProperties[i].innerHTML="";
        }
        
    }
    
    for(i=0;i < elSources.length;i++){
        let sourceID = elSources[i].firstChild.attributes.href.value.split("=")[1];
        let includesYT = elSources[i].firstChild.attributes.href.value.split("=")[0].includes('yout'); 
        if (sourceID && includesYT == true){
            includesYT = elSources[i].firstChild.innerHTML = ytEmbed(sourceID);
        }
        
    }

    for(i=0;i < elCode.length;i++){
        let code = elCode[i].innerText;
        let includeCode = code.includes('@include'); 
        let codeClean = code.replaceAll('@include','');
        if (includeCode){
            elCode[i].parentElement.outerHTML=codeClean;
        }
        
    }


}



// document.querySelectorAll('.source')[1].firstChild.attributes.href.value.split("=")[1];


// if
// document.querySelector('.properties').firstChild.querySelectorAll('tr')[7].lastChild.innerHTML

// for(i=0;)

// document

// <iframe width="1015" height="571" src="https://www.youtube.com/embed/DMcrWHLCsPE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>