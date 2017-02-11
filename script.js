function play(idPlayer, type) {
    var player = document.querySelector('#'+type+idPlayer);
    var play = document.querySelector('#play'+type+idPlayer);
    var pause = document.querySelector('#pause'+type+idPlayer);
    var replay = document.querySelector('#replay'+type+idPlayer);
    if (player.paused) {
        player.play();
        play.style.display = 'none';
        pause.style.display = 'inline';
        replay.style.display = 'none';
    } else {
        player.pause();
        pause.style.display = 'none';
        play.style.display = 'inline';
        replay.style.display = 'none';
    }
}

function vol(idPlayer, type) {
    var player = document.querySelector('#'+type+idPlayer);
    var son = document.querySelector('#son'+type+idPlayer);
    var mute = document.querySelector('#mute'+type+idPlayer);
    if (player.volume==0) {
        player.volume=1;
        son.style.display='inline';
        mute.style.display='none';
    } else if (player.volume==1) {
        player.volume=0;
        mute.style.display='inline';
        son.style.display='none';
    }
}

function time(idPlayer, type) {
    var player = document.querySelector('#'+type+idPlayer);
    var timeText = document.querySelector('#time'+type+idPlayer);
    var currentTime = player.currentTime;
    var totalTime = player.duration;
    
        if (currentTime==totalTime) {
            var replay = document.querySelector('#replay'+type+idPlayer)
            var pause = document.querySelector('#pause'+type+idPlayer);
            pause.style.display='none';
            replay.style.display='inline';
            
        }
    currentTime = formatTime(currentTime);
    totalTime = formatTime(totalTime);
    var time = currentTime + " / " + totalTime
    timeText.textContent = time;
}

function formatTime(time) {
    var h = Math.floor(time/3600);
    var m  = Math.floor((time% 3600) / 60);
    var s  = Math.floor(time% 60);

    if (s < 10) {
        s = "0" + s;
    }

    if (h) {
        if (m < 10) {
            m = "0" + m;
        }
        return h + ":" + m + ":" + s; // hh:mm:ss
    } else {
        return h + ":" + s; // mm:ss
    }
}

/*function tpsAudio1(player1) {
    var duration = player.duration;    // Durée totale
    var time     = player.currentTime; // Temps écoulé
    var fraction = time / duration;
    var percent  = Math.ceil(fraction * 100);
    var progress = document.querySelector('#progressBar');
    progress.textContent = percent + '%';
}*/








