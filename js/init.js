
var docTitle = document.title;
var docPath = window.location.href;
var basePath = './';
var pageType;
var header = true;


function prereqs(){
    document.write ('<div w3-include-html="./scripts.html"></div>');
}

prereqs();

if (docTitle.includes("Resume")){
    renderPage('resume_content.html');
}else if (docTitle.includes("Portfolio")){
    renderPage('portfolio_content.html');
}else if (docPath.includes("project")){
    header = false;
    renderPage('project_content.html');
}

pageDetails = {}



function renderPage(whichContent) {

    document.write('<div w3-include-html="' + basePath +'menu.html"></div>');
    if (header == true){
        document.write('<div w3-include-html="' + basePath +'header.html"></div>');
    }else{
    }

    // content

    document.write (`<div w3-include-html="${basePath}${whichContent}"></div>`);


    document.write('<div w3-include-html="' + basePath +'footer.html"></div>');

    w3.includeHTML();

}


