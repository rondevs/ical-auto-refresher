document.addEventListener('DOMContentLoaded', function() {

  const startbtn = document.getElementById('automateButton');
    const stopbtn = document.getElementById('stopButton');
    const intervalInput = document.getElementById('intervalInput');

    let isRunning=false, obj = {};

    chrome.storage.sync.get('automationRunning', function(data) {   
        // this is called after the retrieve.
        isRunning = data.automationRunning;
        if(isRunning){
            startbtn.style.display = 'none';
            stopbtn.style.display = 'inline';
        }else{
            startbtn.style.display = 'inline';
            stopbtn.style.display = 'none';
        }
    });



    startbtn.addEventListener('click', function() {
        startbtn.style.display = 'none';
        stopbtn.style.display = 'inline';
        obj['automationRunning'] = true;
        chrome.storage.sync.set(obj);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            // Do something with the tabs
            chrome.tabs.sendMessage(tabs[0].id, { command: "startAutomation", interval: intervalInput.value });
        });
    });

    stopbtn.addEventListener('click', function() {
        startbtn.style.display = 'inline';
        stopbtn.style.display = 'none';
        obj['automationRunning'] = false;
        chrome.storage.sync.set(obj);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { command: "stopAutomation" });
        });
    });
});