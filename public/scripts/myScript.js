var devMode = false;
var devStartingPage = 4;


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
                document.getElementById("page"+i+"Content").style.display = "flex";
                document.getElementById("page"+i+"Content2").style.display = "flex";
                document.body.style.backgroundImage = ""
            }
        }
        else{
            document.getElementById("page"+devStartingPage+"Content").style.transform = "";
            document.getElementById("page"+devStartingPage+"Content2").style.transform = "";
            document.getElementById("page"+devStartingPage+"Content").style.display = "flex";
            document.getElementById("page"+devStartingPage+"Content2").style.display = "flex";
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

async function selectNavbarElement(number){
    var currentContent1 = document.getElementById("page"+currentPage+"Content");
    var currentContent2 = document.getElementById("page"+currentPage+"Content2");

    var nextContent1 = document.getElementById("page"+number+"Content");
    var nextContent2 = document.getElementById("page"+number+"Content2");

    if(number == currentPage){
        console.log("You are already on this page"); 
        return;
    }

    var transform = "translateX(100vw)"
    var transformReverse = "translateX(-100vw)"
    if(number > currentPage){
        transform = "translateX(-100vw)";
        transformReverse = "translateX(100vw)";
    }
    else if(number == currentPage){return;}

    currentContent1.style.transform = transform;
    currentContent2.style.transform = transform;

    nextContent1.style.transition = "none";
    nextContent2.style.transition = "none";

    await delay(10);

    nextContent1.style.transform = transformReverse;
    nextContent2.style.transform = transformReverse;

    await delay(10);

    nextContent1.style.transition = "transform 500ms";
    nextContent2.style.transition = "transform 500ms";

    await delay(10);

    nextContent1.style.transform = "";
    nextContent2.style.transform = "";
    nextContent1.style.display = "flex";
    nextContent2.style.display = "flex";

    document.getElementById("nav"+currentPage).classList.remove("selected");
    document.getElementById("nav"+number).classList.add("selected");
    var oldPage = currentPage;
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
        document.getElementById("projectContainer").scrollTop = 0;
        LoadAllInformation(selectedProject.dataset.projectsIndex);
    }
}

function LoadAllInformation(index){
    var currentProject = projects[index]

    var headerImg = currentProject.headerImg;
    var headerImgEl = document.getElementById("projectHeaderImg");
    if(typeof headerImg === "string" && headerImg.length !== 0 && headerImg !== null){
        headerImgEl.style.display = "block";
        headerImgEl.src = "../" + headerImg;
    }
    else{
        headerImgEl.style.display = "none";
    }

    var projectName = currentProject.projectName;
    var projectNameEl = document.getElementById("projectTitle");
    if(typeof projectName === "string" && projectName.length !== 0 && projectName !== null){
        projectNameEl.style.display = "block";
        projectNameEl.innerText = projectName;
    }
    else{
        projectNameEl.style.display = "none";
    }

    var headerText = currentProject.headerText;
    var headerTextEL = document.getElementById("projectHeaderText");
    if(typeof headerText === "string" && headerText.length !== 0 && headerText !== null){
        headerTextEL.style.display = "block";
        headerTextEL.innerText = headerText;
    }
    else{
        headerTextEL.style.display = "none";
    }

    var date = currentProject.date;
    var dateEL = document.getElementById("projectDate");
    if(date !== null){
        dateEL.style.display = "block";
        dateEL.innerText = formatDate(date);
    }
    else{
        dateEL.style.display = "none";
    }

    var rating = currentProject.rating;
    var ratingEL = document.getElementById("projectRating");
    if(rating !== null){
        ratingEL.style.display = "block";
        ratingEL.innerText = "I rate this project: "+rating+" / 10";
    }
    else{
        ratingEL.style.display = "none";
    }

    var section1 = document.getElementById("projectSection1");
    section1.style.display = "none";
    
    var img1 = currentProject.img1;
    var img1EL = document.getElementById("projectSection1Img");
    if(img1EL.classList.contains("projectImgBig")){
        img1EL.classList.remove("projectImgBig")
    }
    if(typeof img1 === "string" && img1.length !== 0 && img1 !== null){
        img1EL.style.display = "block";
        section1.style.display = "flex";
        img1EL.src = "../" + img1;
    }
    else{
        img1EL.style.display = "none";
    }

    var paragraph1 = currentProject.paragraph1;
    var paragraph1EL = document.getElementById("projectSection1Text");
    if(typeof paragraph1 === "string" && paragraph1.length !== 0 && paragraph1 !== null){
        paragraph1EL.style.display = "block";
        section1.style.display = "flex";
        paragraph1EL.innerText = paragraph1;
    }
    else{
        paragraph1EL.style.display = "none";
        if(typeof img1 === "string" && img1.length !== 0 && img1 !== null){
            img1EL.classList.add("projectImgBig")
        }
    }

    var section2 = document.getElementById("projectSection2");
    section2.style.display = "none";
    

    var img2 = currentProject.img2;
    var img2EL = document.getElementById("projectSection2Img");
    if(img2EL.classList.contains("projectImgBig")){
        img2EL.classList.remove("projectImgBig")
    }
    if(typeof img2 === "string" && img2.length !== 0 && img2 !== null){
        img2EL.style.display = "block";
        section2.style.display = "flex";
        img2EL.src = "../" + img2;
    }
    else{
        img2EL.style.display = "none";
    }

    var paragraph2 = currentProject.paragraph2;
    var paragraph2EL = document.getElementById("projectSection2Text");
    if(typeof paragraph2 === "string" && paragraph2.length !== 0 && paragraph2 !== null){
        paragraph2EL.style.display = "block";
        section2.style.display = "flex";
        paragraph2EL.innerText = paragraph2;
    }
    else{
        paragraph2EL.style.display = "none";
        if(typeof img2 === "string" && img2.length !== 0 && img2 !== null){
            img2EL.classList.add("projectImgBig")
        }
    }

    var section3 = document.getElementById("projectSection3");
    section3.style.display = "none";
    

    var img3 = currentProject.img3;
    var img3EL = document.getElementById("projectSection3Img");
    if(img3EL.classList.contains("projectImgBig")){
        img3EL.classList.remove("projectImgBig")
    }
    if(typeof img3 === "string" && img3.length !== 0 && img3 !== null){
        img3EL.style.display = "block";
        section3.style.display = "flex";
        img3EL.src = "../" + img3;
    }
    else{
        img3EL.style.display = "none";
        
    }

    var paragraph3 = currentProject.paragraph3;
    var paragraph3EL = document.getElementById("projectSection3Text");
    if(typeof paragraph3 === "string" && paragraph3.length !== 0 && paragraph3 !== null){
        paragraph3EL.style.display = "block";
        section3.style.display = "flex";
        paragraph3EL.innerText = paragraph3;
    }
    else{
        paragraph3EL.style.display = "none";
        if(typeof img3 === "string" && img3.length !== 0 && img3 !== null){
            img3EL.classList.add("projectImgBig")
        }
    }

    var learned = currentProject.learned;
    var learnedEL = document.getElementById("projectLearned");
    if(typeof learned === "string" && learned.length !== 0 && learned !== null){
        learnedEL.style.display = "block";
        learnedEL.innerText = learned;
    }
    else{
        learnedEL.style.display = "none";
    }

    var link = currentProject.link;
    var linkEL = document.getElementById("projectLink");
    if(typeof link === "string" && link.length !== 0 && link !== null){
        linkEL.style.display = "block";
        linkEL.href = link;
        linkEL.innerText = link;
    }
    else{
        linkEL.style.display = "none";
    }
}

function formatDate(num) {
    let numStr = num.toString();
    
    let year = numStr.substring(0, 4);
    let month = numStr.substring(4, 6);
    let day = numStr.substring(6, 8);
    
    return `${day} / ${month} / ${year}`;
}


var projects;


async function getProjectData(){
    var path = "projects.json";
    try {
        const res = await fetch(path);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Unable to fetch data:", error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    projects = await getProjectData();

    for(var i = 0; i < projects.length; i++){
    CreateProject(
        projects[i].projectName,
        projects[i].previewDescription, 
        projects[i].previewImage, 
        projects[i].rating, 
        projects[i].date, 
        i,
        projects[i].titleHeight,
        projects[i].titleLineHeight,
        projects[i].titleFontSize)

        if(i == 0){
            LoadAllInformation(0);
        }
    }

    SortProjects();

    selectedSortButton = document.getElementById("sortButtonRating");
    selectedSizeButton = document.getElementById("largeSizeButton")
});

function CreateProject(title, description, imageUrl, rating, date, index, titleHeight, titleLineHeight, titleFontSize) {
    var parentElement = document.getElementById("projectSelectorProjects");

    var template = document.getElementById("projectTemplate");

    var projectClone = template.cloneNode(true);

    projectClone.removeAttribute("id");

    projectClone.dataset.projectsIndex = index;
    projectClone.dataset.rating = rating;
    projectClone.dataset.date = date;

    var projectTitle = projectClone.querySelector("h2");

    if(titleHeight != null){
        projectTitle.style.height = titleHeight;
    }
    if(titleLineHeight != null){
        projectTitle.style.lineHeight = titleLineHeight;
    }
    if(titleFontSize != null){
        projectTitle.style.fontsize = titleFontSize;
    }

    var projectDescription = projectClone.querySelector("h3");
    var projectImgDiv = projectClone.querySelector(".projectImg");

    projectTitle.textContent = title;
    projectDescription.textContent = description;

    if (imageUrl) {
        projectImgDiv.style.backgroundImage = "url('" + imageUrl + "')";
    }

    if(index == 0){
        projectClone.classList.add("selected");
        selectedProject = projectClone;
    }

    parentElement.appendChild(projectClone);
}


var selectedSizeButton;

function ChangeProjectsSize(size,el){

    selectedSizeButton.classList.remove("selected");
    selectedSizeButton = el;
    selectedSizeButton.classList.add("selected");

    var el = document.getElementById("projectSelectorProjects");

    if(size == 1){
        el.classList.remove("projectLargeItems");
        el.classList.add("projectSmallItems");
    }
    else if(size == 0){
        el.classList.remove("projectSmallItems");
        el.classList.add("projectLargeItems");
    }
}

var sortFlipped = true;
var sortSubject = "[data-rating]";
var selectedSortButton;

function SortRating(el){
    selectedSortButton.classList.remove("selected");
    selectedSortButton = el;
    selectedSortButton.classList.add("selected");
    sortSubject = "[data-rating]";
    SortProjects();
}

function SortDate(el){
    selectedSortButton.classList.remove("selected");
    selectedSortButton = el;
    selectedSortButton.classList.add("selected");
    sortSubject = "[data-date]";
    SortProjects();
}

function FlipOrder(){
    sortFlipped = !sortFlipped;
    SortProjects();
}

function comparator(a, b) {
    if (sortSubject == "[data-rating]") {
        // Convert rating to number for comparison
        let ratingA = parseFloat(a.dataset.rating);
        let ratingB = parseFloat(b.dataset.rating);

        if (ratingA > ratingB) return sortFlipped ? -1 : 1;
        if (ratingA < ratingB) return sortFlipped ? 1 : -1;
    } else if (sortSubject == "[data-date]") {
        // Treat date as a number for comparison
        let dateA = parseInt(a.dataset.date, 10);
        let dateB = parseInt(b.dataset.date, 10);

        if (dateA > dateB) return sortFlipped ? -1 : 1;
        if (dateA < dateB) return sortFlipped ? 1 : -1;
    }
    return 0;
}

function SortProjects(){
    var subjects = document.querySelectorAll(sortSubject);

    var subjectsArray = Array.from(subjects);
    let sorted = subjectsArray.sort(comparator);

    // Clear the parent container before appending sorted elements
    let parent = document.getElementById("projectSelectorProjects");
    sorted.forEach(e => parent.appendChild(e));
}



var isAboutFlipped = false;

function SwapAboutMe(){
    if(!isAboutFlipped){
        document.getElementById("swapAboutMeText").innerHTML = "View my skills";
        document.getElementById("aboutMeContainer").style.flexDirection = "column-reverse";
        document.getElementById("skillsContainer").classList.add("HideAboutMe");
        document.getElementById("workExperienceContainer").classList.add("ShowAboutMe");
        document.getElementById("workExperienceContainer").classList.remove("HideAboutMe");
        document.getElementById("skillsContainer").classList.remove("ShowAboutMe");
    }
    else{
        document.getElementById("swapAboutMeText").innerHTML = "View my work experience";
        document.getElementById("aboutMeContainer").style.flexDirection = "column";
        document.getElementById("workExperienceContainer").classList.add("HideAboutMe");
        document.getElementById("skillsContainer").classList.add("ShowAboutMe");
        document.getElementById("skillsContainer").classList.remove("HideAboutMe");
        document.getElementById("workExperienceContainer").classList.remove("ShowAboutMe");
    }
    isAboutFlipped = !isAboutFlipped;
}

async function OpenPage(url){
    await delay(150);
    window.open(url, '_blank');
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    let lastSubmissionTime = 0; // Timestamp of the last submission

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const currentTime = Date.now(); // Get current timestamp

            if (currentTime - lastSubmissionTime < 60000) {
                console.log("Please wait before submitting again."); 
                return;
            }

            lastSubmissionTime = currentTime;

            const formData = new FormData(form);

            fetch(form.action, {
                method: "POST",
                body: formData,
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);

                clearForm(form);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        });
    } else {
        console.error("Form not found");
    }
});

function clearForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}

function copy(text){
    navigator.clipboard.writeText(text);
    alert("Copied the text: " + text);
}