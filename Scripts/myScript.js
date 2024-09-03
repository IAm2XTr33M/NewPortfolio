var devMode = true;
var devStartingPage = 2;

document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.letter');

    function lightUpLetters(index) {
        if(letters[index] != null){
            letters[index].classList.add('letterLight');
            setTimeout(() => {
            const nextIndex = (index + 1);
            if(index < letters.length){
                lightUpLetters(nextIndex);
            }
            }, 200);
        }
    }

    lightUpLetters(0);
});

document.addEventListener('DOMContentLoaded', () => {

    setRandomHighlightColor();
    invertOff();

    async function invertOff(){
        if(!devMode){
            await delay(3000);
            for(var i = 1; i < 5; i++){
                document.getElementById("page"+i+"Content").style.display = "block";
                document.getElementById("page"+i+"Content2").style.display = "block";
                document.body.style.backgroundImage = ""
            }
        }
        else{
            document.getElementById("page"+devStartingPage+"Content").style.transform = "";
            document.getElementById("page"+devStartingPage+"Content2").style.transform = "";
            document.getElementById("page"+devStartingPage+"Content").style.display = "block";
            document.getElementById("page"+devStartingPage+"Content2").style.display = "block";
            document.body.style.transition = "";
            selectNavbarElement(devStartingPage);
        }
        document.body.classList.remove("inverted");
        document.getElementById("welcomeText").style.display = "none";
    }
});

document.onkeydown = checkKey;
function checkKey(e) {
    if (e.keyCode == '13') {
        setRandomHighlightColor();
    }
}

async function setRandomHighlightColor(){
    var root = document.querySelector(':root');

    var num = Math.round(Math.random() * (colors.length-1));
    var color = colors[num];

    root.style.setProperty('--ColorTransitionTIme', '3000ms');
    root.style.setProperty('--highlight', color);
    await delay(3000);
    root.style.setProperty('--ColorTransitionTIme', '50ms');
}



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var currentPage = 1;

function selectNavbarElement(number){
    var currentContent1 = document.getElementById("page"+currentPage+"Content");
    var currentContent2 = document.getElementById("page"+currentPage+"Content2");

    var nextContent1 = document.getElementById("page"+number+"Content");
    var nextContent2 = document.getElementById("page"+number+"Content2");


    if(number == currentPage){
        console.log("You are already on this page"); 
        return;
    }

    nextContent1.style.transform = "";
    nextContent2.style.transform = "";
    nextContent1.style.display = "block";
    nextContent2.style.display = "block";

    if(number > currentPage){
        currentContent1.style.transform = "translateX(-100vw)";
        currentContent2.style.transform = "translateX(-100vw)";
    }
    else if(number < currentPage){
        currentContent1.style.transform = "translateX(100vw)";
        currentContent2.style.transform = "translateX(100vw)";
    }
    else{
        console.log("You are already on this page"); 
        return;
    }

    document.getElementById("nav"+currentPage).classList.remove("selected");
    document.getElementById("nav"+number).classList.add("selected");
    currentPage = number;
}


var colors = [
"#4c06cd","#00bfff","#00bfff","#ae00ff","#ff00e6","#ff79f2","#ff2c7d","#ff0051","#386bd9","#38d9be","#91ffed","#00ff99","#97ffd5","#0dff00","#64f85c","#80ff00","#b700ff","#8c00ff","#ffd900","#ffa600","#ff6f00","#b3ff00","#ffbf00","#ff0000","#ff6d6d","#ffee6a"
];

var projects;

var selectedProject;
function selectProject(el){
    if(selectedProject != el){
        el.classList.add("selected");
        if(selectedProject != null){
            selectedProject.classList.remove("selected");
        }
        selectedProject = el;
        console.log(selectedProject);
    }
}

var projects;


async function getProjectData(){
    var path = "../projects.json";
    try {
        const res = await fetch(path);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Unable to fetch data:", error);
        return null; // Return null or handle the error as needed
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    projects = await getProjectData();  // Await the data

    console.log(projects)
    for(var i = 0; i < projects.length; i++){
        CreateProject(
            projects[i].projectName,
            projects[i].previewDescription, 
            projects[i].previewImage, 
            projects[i].rating, 
            projects[i].date, 
            i)
    }
});

function CreateProject(title, description, imageUrl, rating, date, index) {
    var parentElement = document.getElementById("projectSelectorProjects");

    var template = document.getElementById("projectTemplate");

    var projectClone = template.cloneNode(true);

    projectClone.removeAttribute("id");

    projectClone.dataset.projectsIndex = index;
    projectClone.dataset.rating = rating;
    projectClone.dataset.date = date;

    var projectTitle = projectClone.querySelector("h2");
    var projectDescription = projectClone.querySelector("h3");
    var projectImgDiv = projectClone.querySelector(".projectImg");

    projectTitle.textContent = title;
    projectDescription.textContent = description;

    if (imageUrl) {
        projectImgDiv.style.backgroundImage = "url('" + imageUrl + "')";
    }

    parentElement.appendChild(projectClone);
}


function ChangeProjectsSize(){
    var el = document.getElementById("projectSelectorProjects");

    if(el.classList.contains("projectLargeItems")){
        el.classList.remove("projectLargeItems");
        el.classList.add("projectSmallItems");
    }
    else if(el.classList.contains("projectSmallItems")){
        el.classList.remove("projectSmallItems");
        el.classList.add("projectLargeItems");
    }
}