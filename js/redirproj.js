const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1);
var path = document.location.pathname;
path = path.substring(0, path.length - 1);
// document.location = ""
var newurl = '/project.html?' + getLastItem(path);
location.replace(newurl);