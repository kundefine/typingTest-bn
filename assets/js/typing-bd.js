    // all my variables
    var text = document.getElementById("text");
    var data = text.textContent.trim().split(" ");
    var input = document.getElementById("input");
    var info = document.getElementById("info");
    var timeStart = document.getElementById("timer");
    var timeLeft = document.getElementById("timeLeft");
    var count = 0;
    var setIntervalOnce = true;
    var interval;
    var lastValue = '';
    var errorTone = new Audio('assets/media/Error.wav');
    var typeTone = new Audio('assets/media/Click.wav');
    var timerInMin = 3;
    var globTimer;


    timeStart.innerHTML = "Total Time: " + timerInMin + " Minute";
    timeLeft.innerHTML = "Time Left: " + timerInMin + " Minute ";
    input.value = "";

    // object variable
    var keyTest = {
        // all my properties
        stringData: text.textContent.trim(),
        data: data,
        totalWord: this.data.length,
        finished: false,
        wordMatch: [],
        wordWithSpan: [],
        iAmIn: 0,
        subStringLen: 0,
        whichWordYouAreIn: "you have to made it",
        timer: null,
        totalCorrectedWord: 0,
        correctedWordTypedTime: 0,
        totalTypedTime: 0,
        totalInCorrectWord: 0,
        incorrectWordTypedTime: 0,
        bothWord: 0,
        WPM: 0,
        accuracy: 0,
        givenTime: {
            timerInMin : timerInMin,
            timerInSec : timerInMin * 60
        },
        finishTime: {
            interValClear: null,
            timerInMin: 0,
            timerInSec: 0
        },

        // all my methods
        moveNext: function() {
            if(this.iAmIn < this.totalWord) {
                this.iAmIn++;
            }
        },
        createWordObject: function() {
            for(var l = 0; l < this.data.length; l++) {
                this.wordMatch[l] = {
                    word: this.data[l],
                    match: null,
                    matchingTime: 0
                }
            }
        },
        createWordWithSpan: function() {
            for(var l = 0; l < this.data.length; l++) {
                this.wordWithSpan[l] = "<span>" + this.data[l] + "</span> ";
            }
        },
        fillMatchData: function() {
            var insert = '';
            for(var l = 0; l < this.wordWithSpan.length; l++) {
                insert += this.wordWithSpan[l];
            }
            text.innerHTML = insert;
        },
        addHighlightClass: function() {
            if(this.iAmIn < this.wordWithSpan.length)
                text.getElementsByTagName('span')[this.iAmIn].classList.add('hightlight');
        },
        removeHighLightClass: function() {
            text.getElementsByTagName('span')[this.iAmIn].classList.remove('hightlight');
        },
        checkOk: function() {
            if(this.wordMatch[this.iAmIn].match === true) {
                text.getElementsByTagName('span')[this.iAmIn].classList.add('correct');
            } else {
                text.getElementsByTagName('span')[this.iAmIn].classList.add('error');
            }

        },
        set finished(value) {
            if(value === true) {
                input.setAttribute("disabled", "true");
                var correct = 0;
                var correctedMatchingTime = 0;
                var totalTypedTime = 0;
                var incorrectWord = 0;
                var incorrectMatchingTime = 0;
                keyTest.wordMatch.forEach(function(value, index){
                    totalTypedTime += value.matchingTime;
                    if(value.match == true) {
                        correctedMatchingTime += value.matchingTime
                        correct++;
                    } else if(value.match === false) {
                        incorrectMatchingTime += value.matchingTime;
                        incorrectWord++;
                    }
                });
                clearInterval(this.globTimer);
                clearInterval(this.finishTime.interValClear);

                this.totalCorrectedWord = correct;
                this.correctedWordTypedTime = Math.round(correctedMatchingTime/100);
                this.totalTypedTime = Math.round(totalTypedTime/100);
                this.totalInCorrectWord = incorrectWord;
                this.bothWord = this.totalCorrectedWord + this.totalInCorrectWord;
                this.incorrectWordTypedTime = Math.round(incorrectMatchingTime/100);
                this.WPM = Math.ceil(this.totalCorrectedWord/this.finishTime["timerInMin"]);
                this.accuracy = Math.round((this.totalCorrectedWord * 100)/this.bothWord);


                // show in the dom
                info.innerHTML = `
                    <p>Your typing speed: ${this.WPM} WPM (that means you can type ${this.WPM} words in 1 minute)</p>
                    <p>Total typing time(min): ${this.finishTime["timerInMin"].toFixed(2)} Minute</p>
                    <p>Correct word: ${this.totalCorrectedWord}</p>
                    <p>Incorrect word: ${this.totalInCorrectWord}</p>
                    <p>Accuracy : ${this.accuracy}%</p>
                    <p><button onclick="window.location.reload()">Test Again</button>
                `;


            }
        },
        set timer(value) {
            if(value === -1) {
                input.setAttribute("disabled", "true");
                var correct = 0;
                var correctedMatchingTime = 0;
                var totalTypedTime = 0;
                var incorrectWord = 0;
                var incorrectMatchingTime = 0;
                keyTest.wordMatch.forEach(function(value, index){
                    totalTypedTime += value.matchingTime;
                    if(value.match == true) {
                        correctedMatchingTime += value.matchingTime
                        correct++;
                    } else if(value.match === false) {
                        incorrectMatchingTime += value.matchingTime;
                        incorrectWord++;
                    }
                });
                clearInterval(this.globTimer);
                clearInterval(this.finishTime.interValClear);

                this.totalCorrectedWord = correct;
                this.correctedWordTypedTime = Math.round(correctedMatchingTime/100);
                this.totalTypedTime = Math.round(totalTypedTime/100);
                this.totalInCorrectWord = incorrectWord;
                this.bothWord = this.totalCorrectedWord + this.totalInCorrectWord;
                this.incorrectWordTypedTime = Math.round(incorrectMatchingTime/100);
                this.WPM = Math.ceil(this.totalCorrectedWord/this.givenTime["timerInMin"]);
                this.accuracy = Math.round((this.totalCorrectedWord * 100)/this.bothWord);


                // show in the dom
                info.innerHTML = `
                    <p>Your typing speed: ${this.WPM} WPM (that means you can type ${this.WPM} words in 1 minute)</p>
                    <p>Total typing time(min): ${this.givenTime["timerInMin"].toFixed(2)} Minute</p>
                    <p>Correct word: ${this.totalCorrectedWord}</p>
                    <p>Incorrect word: ${this.totalInCorrectWord}</p>
                    <p>Accuracy : ${this.accuracy}%</p>
                `;
            }

        }
    }

    // calling my method
    keyTest.createWordObject();
    keyTest.createWordWithSpan();
    keyTest.fillMatchData();
    keyTest.addHighlightClass();

    // all my functions
    function subStrLength() {
        return input.value.length;
    }
    function countTimeForWord() {
        count++;
    }
    function moreThanTwoSpace() {
        var moreS = input.value.substring(input.value.length - 2);
        if(moreS === "  ") {
            return true;
        }
    }
    function cT() {
        var count = timerInMin * 60;
        var counter, globTimer = setInterval(timer, 1000); //1000 will  run it every 1 second
        keyTest["globTimer"] = globTimer;
        function timer() {
            count = count - 1;
            keyTest.timer = count;
            if (count == -1) {
                clearInterval(counter);
                return;
            }
            var seconds = count % 60;
            var minutes = Math.floor(count / 60);
            var hours = Math.floor(minutes / 60);
            minutes %= 60;
            hours %= 60;
            timeLeft.innerHTML = "Time Left: " + minutes + " Minute " + seconds + " Second"; // watch for spelling
        }

    }

    // all my events
    input.oninput = function(e) {
        // play input sound
        typeTone.play();
        moreThanTwoSpace();
        if(setIntervalOnce) {
            interval = setInterval(countTimeForWord, 10);
            setIntervalOnce = false;
            keyTest.finishTime["interValClear"] = setInterval(function(){
                keyTest.finishTime["timerInSec"]++;
                keyTest.finishTime["timerInMin"] = keyTest.finishTime["timerInSec"]/60;
            }, 1000);

            // start the timper
            cT();
        }
        if(keyTest.finished) {
            return false;
        }
        if(keyTest.iAmIn < keyTest.totalWord) {
            if(e.data === " ") {

            } else {
                if(keyTest.wordMatch[keyTest.iAmIn].word == input.value.substring(keyTest.subStringLen).trim()) {
                    keyTest.wordMatch[keyTest.iAmIn].match = true;
                    keyTest.wordMatch[keyTest.iAmIn].matchingTime = count;
                } else {
                    keyTest.wordMatch[keyTest.iAmIn].match = false;
                    keyTest.wordMatch[keyTest.iAmIn].matchingTime = count;
                }
            }
        }
    }
    input.onkeyup = function (e) {
        lastValue = input.value;
        if(e.code === "Space") {
            if(!moreThanTwoSpace() && input.value != " ") {
                // remove hightlight class
                keyTest.removeHighLightClass();
                // check for correctness and error of word and addClass
                keyTest.checkOk();
                // move to next word
                keyTest.moveNext();
                // add highlight class
                keyTest.addHighlightClass();
            }
            // get the last input charcter length
            keyTest.subStringLen = subStrLength();
            // start the new count for new word
            count = 0;
            if(keyTest.iAmIn === keyTest.totalWord) {
                keyTest.finished = true;
                clearInterval(interval);
            } else {
                var span = text.getElementsByTagName('span')[keyTest.iAmIn];
                var offsetH = text.offsetHeight;
                var g = (span.offsetTop - offsetH);
                if(g > 1) {
                    text.scrollTo(0, g + (offsetH/2));
                }
            }
        }



        
    }
    input.onkeydown = function(e) {
        if(lastValue[lastValue.length - 1] === " ") {
            if(e.code === "Backspace") {
                errorTone.play();
                e.preventDefault();
            }
        }
    }

    input.onkeypress = function(e) {
        if(lastValue[lastValue.length - 1] === " ") {
            if(e.code === "Backspace") {
                errorTone.play();
                e.preventDefault();
            }
        }
    }