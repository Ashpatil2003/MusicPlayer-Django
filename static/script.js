//var audio = {
//    init: function() {
//        var $that = this;
//        $(function() {
//            $that.components.media();
//        });
//    },
//    components: {
//        media: function(target) {
//            var media = $('audio.fc-media', (target !== undefined) ? target : 'body');
//            if (media.length) {
//                media.mediaelementplayer({
//                    audioHeight: 40,
//                    features: ['playpause', 'current', 'duration', 'progress', 'volume', 'tracks', 'fullscreen'],
//                    alwaysShowControls: true,
//                    timeAndDurationSeparator: '<span></span>',
//                    iPadUseNativeControls: true,
//                    iPhoneUseNativeControls: true,
//                    AndroidUseNativeControls: true
//                });
//            }
//        },
//    },
//};
//
//audio.init();


document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("fc-media");

    if (!audio) {
        return;
    }

    // Buttons
    const playPauseBtn = document.getElementById("playPauseBtn");
    const rewindBtn = document.getElementById("rewindBtn");
    const forwardBtn = document.getElementById("forwardBtn");
    const volumeSlider = document.getElementById("volumeSlider");
    const progressBar = document.getElementById("progressBar");

    const currentTimeText = document.getElementById("currentTime");
    const durationText = document.getElementById("duration");

    const playIcon = document.getElementById("playIcon");
    const pauseIcon = document.getElementById("pauseIcon");


    // Format time
    function formatTime(seconds) {
        if (isNaN(seconds)) {
            return "0:00";
        }
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return minutes + ":" + (secs < 10 ? "0" : "") + secs;
    }


    // Play / Pause
    playPauseBtn.addEventListener("click", function () {

        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });


    // Audio playing
    audio.addEventListener("play", function () {
        playIcon.style.display = "none";
        pauseIcon.style.display = "inline-block";
        document.querySelector(".album-art").classList.add("playing");
    });


    // Audio paused
    audio.addEventListener("pause", function () {
        playIcon.style.display = "inline-block";
        pauseIcon.style.display = "none";
        document.querySelector(".album-art").classList.remove("playing");
    });


    // Update progress
    audio.addEventListener("timeupdate", function () {

        if (audio.duration) {
            const percentage = (audio.currentTime / audio.duration) * 100;
            progressBar.value = percentage;
        }
        currentTimeText.textContent = formatTime(audio.currentTime);
    });


    // Load duration
    audio.addEventListener("loadedmetadata", function () {
        durationText.textContent = formatTime(audio.duration);
    });


    // Progress bar
    progressBar.addEventListener("input", function () {
        if (audio.duration) {
            audio.currentTime = (progressBar.value / 100) * audio.duration;
        }
    });


    // Rewind 10 seconds
    rewindBtn.addEventListener("click", function () {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    });


    // Forward 10 seconds
    forwardBtn.addEventListener("click", function () {
        audio.currentTime = Math.min(audio.duration || 0,audio.currentTime + 10);
    });


    // Volume control
    volumeSlider.addEventListener("input", function () {
        audio.volume = volumeSlider.value / 100;
    });


    // Set default volume
    audio.volume = 0.8;


    // Keyboard shortcuts
    document.addEventListener("keydown", function (event) {
        // Don't trigger when typing in an input
        if ( event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
            return;
        }

        // Space = Play/Pause
        if (event.code === "Space") {
            event.preventDefault();
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }

        // Left arrow = rewind
        if (event.code === "ArrowLeft") {
            audio.currentTime = Math.max(0, audio.currentTime - 10);
        }

        // Right arrow = forward
        if (event.code === "ArrowRight") {
            audio.currentTime = Math.min( audio.duration || 0, audio.currentTime + 10);
        }
    });


    // Automatically update UI
    audio.addEventListener("ended", function () {
        playIcon.style.display = "inline-block";
        pauseIcon.style.display = "none";
        progressBar.value = 0;
        document.querySelector(".album-art").classList.remove("playing");
    });
});

