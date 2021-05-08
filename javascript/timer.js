    // timer

    const BREAK_TIME = 15 * 60;
    const STUDY_TIME = 30 * 60;

    let study_timer = document.getElementById('timer');
    let counter = 0;
    let time_left = STUDY_TIME;
    study_timer.innerHTML = convertSeconds( time_left );

    let timer_interval = -1;

    const ding = new Audio();
    ding.src = "../songs/study_time.mp3";   // ding sound, time to study

    document.getElementById('start-pause-timer').addEventListener('click', startPauseTimer);

    function studyInterval() {
        clearInterval( timer_interval );
        timer_interval = setInterval( studyTime, 1000);
    }

    function breakInterval() {
        clearInterval( timer_interval );
        timer_interval = setInterval( takeBreak, 1000); // takes a break after each study session
    }
    
    function convertSeconds(sec) {
        let minutes = Math.floor(sec / 60);
        let seconds = sec % 60;

        if ( minutes < 10 ) {
            if ( seconds < 10 ) {
                return '0' + minutes + ' : 0' + seconds;
            } 
            return '0' + minutes + ' : ' + seconds;
        } else if ( seconds < 10 ) {
            return minutes + ' : 0' + seconds;
        } else {
            return minutes + ' : ' + seconds;
        }
    }   // returns minutes and seconds remaining

    function studyTime() {
        startTimer(breakInterval, STUDY_TIME);
    }   // 45 min of studying before break

    function takeBreak() {
        startTimer(studyInterval, BREAK_TIME);
    }   // take 15 min break

    function startTimer(callback, time_left_value) {
        time_left = time_left_value;
        study_timer.innerHTML = convertSeconds( time_left - counter );
        counter ++;

        if ( time_left == counter ) {   // 00:00

            if ( !audio.paused ) {
                togglePlayPause();
                audio.pause();
            }
            
            ding.play();

            clearInterval( timer_interval );    // finish break
            counter = 0;
            callback(); // start studying interval
        }
    }


        // START / PAUSE TIMER
    function startPauseTimer() {
        $('#start-pause-timer').toggleClass('timer-on');    // toggles the button between play & pause

        if ( timer_interval != -1 && time_left == STUDY_TIME) { // if button is pressed in studyInterval and study session is not paused
            pauseStudy();
        } else if ( timer_interval != -1 && time_left == BREAK_TIME) {   // if button is pressed in breakInterval and break session is not paused
            pauseBreak();   // DOESN'T CALL IT
        } else {
            updateInterval();   // continues to whatever interval it is on currently
        }
    }   // start or pause the timer clicking the first button

    function updateInterval() {
        if ( time_left == STUDY_TIME ){ // if the current interval is studyInterval
            studyInterval();
        } else {    // if the current interval is breakInterval
            breakInterval();
        }
    }

    function pauseStudy() {
            clearInterval( timer_interval );
            timer_interval = -1;
    }   // pauses the study interval

    function pauseBreak() {
        clearInterval ( timer_interval );
        timer_interval = -1;
        console.log('pause break');
    }   // pauses the break interval