var camera,mic;
if(window.location.href.includes('meet.google')){
    var checkExistLoadState= setInterval(function() {
        if(document.querySelector('[data-tooltip*="leave call" i]')){
            camera = document.querySelector('[data-tooltip*="camera" i]')
            mic = document.querySelector('[data-tooltip*="microphone" i]')
            main();
            clearInterval(checkExistLoadState);
        }
    }, 500);
}

function main(){
    chrome.storage.sync.get(['camState'], function(result) {
        camStateChange(result["camState"].cam)
    })
    chrome.storage.sync.get(['micState'], function(result) {
        micStateChange(result["micState"].mic)
    })
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.cam){
            camStateChange(request.camera)
        }   
        if (request.mic){
            micStateChange(request.microphone)
        }   
        sendResponse({msg: "true"});
    }
);

function camStateChange(camState){
    if(window.location.href.includes('meet.google')){
        if(!camState){
            setBannerCam()
            console.log("Added ribbon");
            if(document.querySelector('[data-tooltip*="off camera" i]'))
                document.querySelector('[data-tooltip*="off camera" i]').click()
        }else{
            if(document.querySelector('.camRibbon'))
                document.querySelector('.camRibbon').remove()
        }
        camera.style.display = camState ? "flex" : "none"
        console.log(camera.style.display, 'set');
    }
}
function micStateChange(micState){
    if(window.location.href.includes('meet.google')){
        if(!micState){
            setBannerMic()
            if(document.querySelector('[data-tooltip*="off microphone" i]'))
                document.querySelector('[data-tooltip*="off microphone" i]').click()
        }else{
            if(document.querySelector('.micRibbon'))
                document.querySelector('.micRibbon').remove()
        }
        mic.style.display = micState ? "flex" : "none"
        console.log(mic.style.display, 'set');
    }
}

function setBannerCam(){
    htmlContentCam = `<div class="camRibbon">Camera Off</div>`
    camRibbon = document.createElement('div')
    camRibbon.innerHTML=htmlContentCam
    document.body.append(camRibbon)
}
function setBannerMic(){
    htmlContentMic = `<div class="micRibbon">Microphone Off</div>`
    micRibbon = document.createElement('div')
    micRibbon.innerHTML=htmlContentMic
    document.body.append(micRibbon)
}