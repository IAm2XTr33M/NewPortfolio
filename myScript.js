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



