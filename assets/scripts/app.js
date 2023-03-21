let choosenOption;
let min;
let sec;
var myInterval;
let alreadyWorking = false;
let sessionType = "";
let cyclesChoice = parseInt(document.querySelector('input[name="session-cycles"]:checked').value);
let counterOfCycles = 1;
let isSessionStarted = false;
let choosenRadioButtonId;
let choosenRadioButton = mainRadioButton;

function decrementaion(){

   if(sec === 0 && min !== 0){
    sec = 59;
    min--;
   }
   else if(sec !== 0){
    sec--;
   }
   else if(sec === 0 && min === 0){
    clearInterval(myInterval);
   }

   if(sec <= 9){
    seconds.innerHTML = "0" + sec;
   }else{
    seconds.innerHTML = sec;
   }

   if(min <= 9){
    minutes.innerHTML = "0" + min;
   }else{
    minutes.innerHTML = min;
   }

   cycleManagement();
}


function start(){
    if(!alreadyWorking)
    {
        min = parseInt(minutes.innerHTML);
        sec = parseInt(seconds.innerHTML);
        myInterval = setInterval(decrementaion, 1000);
        alreadyWorking = true;
        isSessionStarted = true;
        workTime.disabled = true;
        breakTime.disabled = true;
    }
}

function reset(){
    mainRadioButton.checked = true;
    counterOfCycles = 1;
    cyclesChoice = mainRadioButton.value;
    isSessionStarted = false;
    workTime.disabled = false;
    breakTime.disabled = false;
    workTimeHandler();
    stopClock();
    settingClockHeadline();
}

function stopClock(){ 
    clearInterval(myInterval);
    alreadyWorking = false;

}

function settingClockHeadline()
{
    if(sessionType === "work" || sessionType === "")
    {
        clockHeadline.innerHTML = `WORK TIME ${counterOfCycles}/${cyclesChoice}`;
    }
    else if(sessionType === "break")
    {
        clockHeadline.innerHTML = `BREAK TIME ${counterOfCycles}/${cyclesChoice}`;
    }
}

function workTimeHandler(){
    sessionType = "work";
    settingClockHeadline();
    if(workTime.value === ""){
        minutes.innerHTML = "00";
        seconds.innerHTML =  "00";
    }else{
        minutes.innerHTML = workTime.value;
        seconds.innerHTML =  "00";
        workTimeValueKeeper = workTime.value;
    }
}

function cyclesChoiceHandler(){
    if(!isSessionStarted)
    {
        cyclesChoice = parseInt(document.querySelector('input[name="session-cycles"]:checked').value);
        settingClockHeadline();
        choosenRadioButtonId = document.querySelector('input[name="session-cycles"]:checked').id;
        choosenRadioButton = document.getElementById(`${choosenRadioButtonId}`);
    }
    else
    {
        choosenRadioButton.checked = true;
        alert('If you want to change number of cycles, you need to reset your session!');
    }
}


function breakTimeManagement(){
    sessionType = "break";
    settingClockHeadline();
    if(breakTime.value === ""){
        minutes.innerHTML = "00";
        seconds.innerHTML =  "00";
    }else{
        minutes.innerHTML = breakTime.value;
        seconds.innerHTML =  "00";
    }
}

function isEndOfSession(){
    if(counterOfCycles > cyclesChoice)
    {
        stopClock();
        clockHeadline.innerHTML = "YOUR SESSION HAS ENDED";
        return true;
    }
    else
        return false;
}

function cycleManagement(){
        if(sessionType === "work" && min === 0 && sec === 0){
            breakTimeManagement();
            min = breakTime.value;
            sec = 0;
            stopClock();
            myInterval = setInterval(decrementaion, 1000);
            alreadyWorking = true;
        }
        if(sessionType === "break" && min === 0 && sec === 0){
            counterOfCycles++;
            if(!isEndOfSession())
            {
                workTimeHandler();
                stopClock();
                start();   
            }
        }
}



numberOfCycles.forEach(radio => radio.addEventListener('change', cyclesChoiceHandler));
workTime.addEventListener('change', workTimeHandler);
buttonReset.addEventListener('click', reset);
buttonStart.addEventListener('click', start);
buttonStop.addEventListener('click', stopClock);

