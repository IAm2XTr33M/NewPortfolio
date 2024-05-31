async function ExtendBottomLine(){
    document.getElementById("mainDiv").classList.add("mainDivActive"); 
    await delay(700);

    openNewTab("portfolio.html");
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function openNewTab(url) {
    var link = document.createElement('a');
    link.href = url;

    var clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    link.dispatchEvent(clickEvent);
  }