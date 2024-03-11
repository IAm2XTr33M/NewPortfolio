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
    invertOff();
    async function invertOff(){
        await delay(3000);
        document.body.classList.remove("inverted");
    }
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}