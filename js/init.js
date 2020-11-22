
var docTitle = document.title;

function prereqs(){
    document.write ('<div w3-include-html="scripts.html"></div>');
}

function renderPage() {

    document.write('<div w3-include-html="header.html"></div>');
    document.write('<div w3-include-html="headernew.html"></div>');

    
    if (docTitle.includes("Resume")){
        document.write ('<div w3-include-html="cv.html"></div>');
    }else{
        document.write ('<div w3-include-html="pcontent.html"></div>');
    }

    document.write('<div w3-include-html="footer.html"></div>');
    w3.includeHTML();

}

prereqs();
renderPage();
