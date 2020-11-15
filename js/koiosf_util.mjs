export var loadScriptAsync = function(uri){
    return new Promise((resolve, reject) => {
        var tag = document.createElement('script');
        tag.src = uri;
        tag.async = true;
        tag.onload = () => {
            resolve();
        };
        document.head.appendChild(tag);
    });
}

export function sleep(ms) {
    try {var prom=new Promise(resolve => setTimeout(resolve, ms)); } catch (error) {console.log(error); }
    return prom
}

export function LinkButton(nameButton,funct) {  
    var button=getElement(nameButton);
    if (button)
        button.title=nameButton; // add hoover text
    
    if (button) 
        button.addEventListener("click", ButtonClick);           
    
    async function ButtonClick(event) {
        event.preventDefault();
        var orgcolor=button.style.color;
        var buttonchildren=button.getElement("w-button")
        for (const element of buttonchildren) 
            element.style.color="white" //"#13c4a3";
        await Promise.all( [
            sleep(1000), // show color for at least 1 sec.
            funct(button)
        ]);          
    }
}

function ShowButton(button,fFirst) {    
    var buttonchildren=button.getElement("w-button")
    buttonchildren[0].style.display=fFirst?"block":"none"
    buttonchildren[1].style.display=!fFirst?"block":"none"
}    

export function HideButton(nameButton,fHide) {
    getElement(nameButton).dispatchEvent(new CustomEvent(fHide?"hide":"show"));
}    

export function LinkClickButton(domid_or_name,callback,location) {
	var domid=domid_or_name;
    if (domid_or_name && (typeof domid_or_name) =="string") 
        domid=getElement(domid_or_name,location)
		
    if (!domid) {
		console.error(`LinkClickButton: Can't find ${domid_or_name}`);
		return
	}
    domid.addEventListener('animatedclick',callback)    
}    
  
