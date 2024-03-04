document.addEventListener('mousemove', (e) => {
    const followGradient = document.getElementById('followGradient');
    const navbarLine = document.getElementById('navbarLine');
    
    const rect = navbarLine.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
  
    const backgroundWidth = parseInt(getComputedStyle(followGradient).backgroundSize.split(' ')[0]);
    const gradientWidth = backgroundWidth/100 * rect.width;
  
    const leftShift = gradientWidth / 2;
    followGradient.style.backgroundPosition = `calc(${mouseX}px - ${leftShift}px) 0`;
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.letter');

    function lightUpLetters(index) {
      letters[index].classList.add('letterLight');
      setTimeout(() => {
        const nextIndex = (index + 1);
        if(index < letters.length){
            lightUpLetters(nextIndex);
        }
      }, 200);
    }

    lightUpLetters(0);
  });



