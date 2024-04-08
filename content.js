let intervalId=null;

function startAutomation(){

    var buttons = document.querySelectorAll('.bui-group.bui-group--inline .bui-button.bui-button--secondary');
    buttons.forEach(function(button) {
      button.click(); // Simulate click on each button
    });
 
}

function stopAutomation(){
  if(intervalId){
    clearInterval(intervalId);

  }
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "startAutomation") {
      const intervalMin = parseInt(request.interval) * 60 * 1000;
      startAutomation()
      intervalId = setInterval(startAutomation, intervalMin);
    }
    else if(request.command === "stopAutomation"){
      stopAutomation();
    }
  });
  