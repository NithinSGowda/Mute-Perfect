var camera,mic,lobby=true;
if(window.location.href.includes('meet.google')){
    var checkexistcall=setInterval(() => {
        if(document.querySelector('[data-tooltip*="camera" i]') && document.querySelector('[data-tooltip*="microphone" i]')){
            camera = document.querySelector('[data-tooltip*="camera" i]')
            mic = document.querySelector('[data-tooltip*="microphone" i]')
            clearInterval(checkexistcall)
            main();
        }
    }, 500);
    var checkExistLoadState= setInterval(function() {
        if(document.querySelector('[data-tooltip*="leave call" i]')){
            var checkexistcall=setInterval(() => {
                if(document.querySelector('[data-tooltip*="camera" i]') && document.querySelector('[data-tooltip*="microphone" i]')){
                    camera = document.querySelector('[data-tooltip*="camera" i]')
                    mic = document.querySelector('[data-tooltip*="microphone" i]')
                    clearInterval(checkexistcall)
                    lobby=false;
                    main();
                }
            }, 500);
            clearInterval(checkExistLoadState);
        }
    }, 500);
}else if(window.location.href.includes('teams.microsoft')){
    var checkexistcall=setInterval(() => {
        if(document.querySelector('[track-summary*="Toggle camera" i]') && document.querySelector('[track-summary*="Toggle microphone" i]')){
            camera = document.querySelector('[track-summary*="Toggle camera" i]')
            mic = document.querySelector('[track-summary*="Toggle microphone" i]')
            clearInterval(checkexistcall)
            main();
        }
    }, 500);
    var checkExistLoadState= setInterval(function() {
        if(document.querySelector('#hangup-button')){
            var checkexistcall=setInterval(() => {
                if(document.querySelector('#microphone-button') && document.querySelector('#video-button')){
                    camera = document.querySelector('#video-button')
                    mic = document.querySelector('#microphone-button')
                    clearInterval(checkexistcall)
                    lobby=false;
                    main();
                }
            }, 500);
            clearInterval(checkExistLoadState);
        }
    }, 500);
}else if(window.location.href.includes('zoom.us')){
    var checkExistLoadState= setInterval(function() {
        if(document.querySelector('.footer__leave-btn-container')){
            var checkexistcall=setInterval(() => {
                if(document.querySelector('[aria-label*="my microphone" i]') && document.querySelector('[aria-label*="sending my video" i]')){
                    camera = document.querySelector('[aria-label*="sending my video" i]')
                    mic = document.querySelector('[aria-label*="my microphone" i]')
                    clearInterval(checkexistcall)
                    lobby=false;
                    main();
                }
            }, 500);
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
            if(document.querySelector('[data-tooltip*="off camera" i]'))
                document.querySelector('[data-tooltip*="off camera" i]').click()
        }else{
            if(document.querySelector('.camRibbon'))
                document.querySelector('.camRibbon').remove()
        }
        camera.style.display = camState ? "flex" : "none"
        console.log(camera.style.display, 'set');
    }else if(window.location.href.includes('teams.microsoft')){
        if(lobby){
            if(!camState){
                setBannerCam()
                if(document.querySelector('[track-summary*="Toggle camera off" i]'))
                    document.querySelector('[track-summary*="Toggle camera off" i]').click()
            }else{
                if(document.querySelector('.camRibbon'))
                    document.querySelector('.camRibbon').remove()
            }
            camera.style.display = camState ? "flex" : "none"
        }else{
            if(!camState){
                setBannerCam()
                if(document.querySelector('[aria-label*="Turn camera off" i]'))
                    document.querySelector('[aria-label*="Turn camera off" i]').click()
            }else{
                if(document.querySelector('.camRibbon'))
                    document.querySelector('.camRibbon').remove()
            }
            camera.style.display = camState ? "flex" : "none"
        }
    }else if(window.location.href.includes('zoom.us')){
        if(!camState){
            setBannerCam()
            if(document.querySelector('[aria-label*="stop sending my video" i]'))
                document.querySelector('[aria-label*="stop sending my video" i]').click()
        }else{
            if(document.querySelector('.camRibbon'))
                document.querySelector('.camRibbon').remove()
        }
        camera.style.display = camState ? "flex" : "none"
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
    }else if(window.location.href.includes('teams.microsoft')){
        if(lobby){
            if(!micState){
                setBannerMic()
                if(document.querySelector('[track-summary*="Toggle microphone off" i]'))
                    document.querySelector('[track-summary*="Toggle microphone off" i]').click()
            }else{
                if(document.querySelector('.micRibbon'))
                    document.querySelector('.micRibbon').remove()
            }
            mic.style.display = micState ? "flex" : "none"
        }else{
            if(!micState){
                setBannerMic()
                if(document.querySelector('[aria-label="Mute" i]'))
                    document.querySelector('[aria-label="Mute" i]').click()
            }else{
                if(document.querySelector('.micRibbon'))
                    document.querySelector('.micRibbon').remove()
            }
            mic.style.display = micState ? "flex" : "none"
        }
    }else if(window.location.href.includes('zoom.us')){
        if(!micState){
            setBannerMic()
            if(document.querySelector('[aria-label="mute my microphone" i]'))
                document.querySelector('[aria-label="mute my microphone" i]').click()
        }else{
            if(document.querySelector('.micRibbon'))
                document.querySelector('.micRibbon').remove()
        }
        mic.style.display = micState ? "flex" : "none"
    }
}

function setBannerCam(){
    if(document.querySelectorAll('.camRibbon').length>0){
        for(ele of document.querySelectorAll('.camRibbon')){
            ele.remove()
        }
    }
    htmlContentCam = `<div class="camRibbon">Camera Off</div>`
    camRibbon = document.createElement('div')
    camRibbon.innerHTML=htmlContentCam
    camRibbon.ondblclick = ()=>{
        document.querySelector('.camRibbon').remove()
    }
    document.body.append(camRibbon)
}
function setBannerMic(){
    if(document.querySelectorAll('.micRibbon').length>0){
        for(ele of document.querySelectorAll('.micRibbon')){
            ele.remove()
        }
    }
    htmlContentMic = `<div class="micRibbon">Microphone Off</div>`
    micRibbon = document.createElement('div')
    micRibbon.innerHTML=htmlContentMic
    micRibbon.ondblclick = ()=>{
        document.querySelector('.micRibbon').remove()
    }
    document.body.append(micRibbon)
}

document.body.addEventListener('keydown', event => {
    if (event.ctrlKey && 'de'.indexOf(event.key) !== -1) {
      event.preventDefault()
      event.stopPropagation()
      if(document.querySelector('[data-tooltip*="off microphone" i]'))
        document.querySelector('[data-tooltip*="off microphone" i]').click()
      if(document.querySelector('[data-tooltip*="off camera" i]'))
        document.querySelector('[data-tooltip*="off camera" i]').click()
    }
})

