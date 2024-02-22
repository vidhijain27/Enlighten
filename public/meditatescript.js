
let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');
let minsinp;
// minsinp = document.getElementById("mins").value;
let workTime = 25;
let breakTime = 5;

let seconds = "00"

window.onload = () => {
    document.getElementById('minutes').innerHTML = 25;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

var dis = setInterval(function () {
    
    minsinp = document.getElementById("mins").value;
    if(minsinp < 1){
        document.getElementById('minutes').innerHTML = 25;

    }
    else{
        if(minsinp<10){
            document.getElementById('minutes').innerHTML = '0' + minsinp;
        }
        else{
            document.getElementById('minutes').innerHTML = minsinp;
        }
    }


}, 1000);

var audio = document.getElementById("studyAud");

function play(){
    audio.play();
}
function stop(){
    audio.pause();
}


function start() {
    play();
    clearInterval(dis);
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    minsinp = document.getElementById("mins").value;
    // console.log(minsinp);
    if (minsinp < 1) {
        workTime = 25;
    }
    else {
        workTime = minsinp;
    }
    seconds = 59;

    if(workTime<5){
        breakTime=minsinp;
    }
    else{
        breakTime=minsinp;
    }

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;
    let breakCount = 0;


    let timerFunction = () => {

        if(workMinutes<10){
            document.getElementById('minutes').innerHTML = '0' + workMinutes;
        }
        else{
            document.getElementById('minutes').innerHTML = workMinutes;
        }
        
        if(seconds<10){
            document.getElementById('seconds').innerHTML = '0' + seconds;
        }
        else{
            document.getElementById('seconds').innerHTML = seconds;
        }

        seconds = seconds - 1;

        if (seconds === 0) {
            workMinutes = workMinutes - 1;
            if (workMinutes === -1) {
                stop();
                if (breakCount % 2 === 0) {

                    workMinutes = breakMinutes;
                    breakCount++


                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                } else {

                    workMinutes = workTime;
                    breakCount++


                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }
            seconds = 59;
        }
    }


    setInterval(timerFunction, 1000);
}