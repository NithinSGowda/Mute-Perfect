var camera = document.querySelector('.cam')
var mic = document.querySelector('.mic')

chrome.storage.sync.get(['camState'], function(result) {
    result=result["camState"]
    camera.checked=result.cam
    console.log(result.cam);
})
chrome.storage.sync.get(['micState'], function(result) {
    result=result["micState"]
    mic.checked=result.mic
    console.log(result.mic);
})

camera.addEventListener('change',()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {cam: 1,camera: camera.checked}, function(response) {
                console.log(response.msg);
              });
        }
    });
    setStorageStateCam({
        cam: camera.checked
    })
})

mic.addEventListener('change',()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(tabs){
            console.log(tabs);
            chrome.tabs.sendMessage(tabs[0].id, {mic: 1, microphone: mic.checked}, function(response) {
                console.log(response.msg);
              });
        }
    });
    setStorageStateMic({
        mic: mic.checked
    })
})

function setStorageStateCam(camState){
    chrome.storage.sync.set({
        camState
    }, ()=>{
        console.log('set');
    })
}
function setStorageStateMic(micState){
    chrome.storage.sync.set({
        micState
    }, ()=>{
        console.log('set');
    })
}