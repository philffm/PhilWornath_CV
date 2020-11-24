
var docTitle = document.title;
var docPath = window.location.href;
var basePath = './';
var pageType;


function prereqs(){
    document.write ('<div w3-include-html="./scripts.html"></div>');
}

prereqs();

if (docTitle.includes("Resume")){
    renderPage('resume_content.html');
}else if (docTitle.includes("Portfolio")){
    renderPage('portfolio_content.html');
}else if (docTitle.includes("Project")){
    renderPage('project_content.html')
}



function renderPage(whichContent) {

    // if(docPath.includes("project")){
    //     basePath= '../';
    // }
    


    document.write('<div w3-include-html="' + basePath +'menu.html"></div>');
    document.write('<div w3-include-html="' + basePath +'header.html"></div>');

    // content

    document.write (`<div w3-include-html="${basePath}${whichContent}"></div>`);


    document.write('<div w3-include-html="' + basePath +'footer.html"></div>');
    w3.includeHTML();

}

