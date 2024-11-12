const sentence = "Kyan mensen portfolio   -   Software Developer   -";
const repeat = 4;
const letterSpacing = 188;
const sentenceSpacing = 3;


document.addEventListener('DOMContentLoaded', function () {
    const splitSentence = sentence.split("");
    const originalLetter = document.getElementById('textLetter');

    let d = 0;
    for(let i = 0; i < repeat; i++){
        splitSentence.forEach(letter => {
            var clonedLetter = originalLetter.cloneNode(true);
            clonedLetter.innerHTML = letter;
            clonedLetter.style.display = "block";
            clonedLetter.style.animationDelay = -letterSpacing*d+"ms";
            document.getElementById("textScroll").appendChild(clonedLetter);
            d++;
        });
        d += sentenceSpacing;
    }
    
});

let style;
function setKeyframes() {
    if(style == null)
    {
        style = document.createElement('style');
        style.type = 'text/css';
    }

    let keyframes = `
        @keyframes moveText {
            0%{
                margin: 0 var(--TextScrollWidth) var(--TextScrollHeight) 0;
            }
            \VALUE_1\%{
                margin: 0 0 var(--TextScrollHeight) var(--TextScrollWidth);
            }
            50%{
                margin: var(--TextScrollHeight) 0 0 var(--TextScrollWidth);
            }
            VALUE_2%{
                margin: var(--TextScrollHeight) var(--TextScrollWidth) 0 0;
            }
            100%{
                margin: 0 var(--TextScrollWidth) var(--TextScrollHeight) 0;
            }
        }
        @keyframes rotateText{
            0%{
                rotate: 0deg;
            }
            \VALUE_3\%{
                rotate: 90deg;
            }
            49.99%{
                rotate: 180deg;
            }
            \VALUE_4\%{
                rotate: 270deg;
            }
            99.99%{
                rotate: 0deg;
            }
        }
    `;

    let speed = 100/(window.innerWidth + window.innerHeight) * window.innerHeight;
    speed = Math.round(speed);
    

    keyframes = keyframes.replace("VALUE_1", 50 - speed/2);
    keyframes = keyframes.replace("VALUE_3", 49.99 - speed/2);
    keyframes = keyframes.replace("VALUE_2", 50 + (50 - speed/2));
    keyframes = keyframes.replace("VALUE_4", 50 + (49.99 - speed/2));

    style.innerHTML = keyframes;

    document.getElementById("textScroll").append(style);
}

window.addEventListener('resize', setKeyframes);
window.onload = setKeyframes;