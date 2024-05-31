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
        await delay(3000);
        document.body.classList.remove("inverted");
        document.getElementById("welcomeText").style.display = "none";
        document.getElementById("aboutMeContent").style.display = "block";
        document.getElementById("aboutMeContent2").style.display = "block";
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

var currentSelectedEl;

function selectNavbarElement(number){

    if(currentSelectedEl == null){currentSelectedEl = document.getElementById("navAbout");}

    var nextSelectedEl;

    switch (number) {
        case 1:
            nextSelectedEl = document.getElementById("navAbout");
            break;
        case 2:
            nextSelectedEl = document.getElementById("navProjects");
            break;
        case 3:
            nextSelectedEl = document.getElementById("nacSocials");
            break;
        case 4:
            nextSelectedEl = document.getElementById("navContact");
            break;
        default:
            nextSelectedEl = document.getElementById("navAbout");
            break;
    }

    console.log("next is");
    console.log(nextSelectedEl);

    if(nextSelectedEl != currentSelectedEl){

        if(currentSelectedEl != null){
            currentSelectedEl.classList.remove("selected");
        }
        currentSelectedEl = nextSelectedEl;
        currentSelectedEl.classList.add("selected");        
    }
}


var colors = [
"#4c06cd","#00bfff","#00bfff","#ae00ff","#ff00e6","#ff79f2","#ff2c7d","#ff0051","#386bd9","#38d9be","#91ffed","#00ff99","#97ffd5","#0dff00","#64f85c","#80ff00","#b700ff","#8c00ff","#ffd900","#ffa600","#ff6f00","#b3ff00","#ffbf00","#ff0000","#ff6d6d","#ffee6a"
];