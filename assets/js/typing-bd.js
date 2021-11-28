// all my variables
var text = document.getElementById('text');
var data = text.textContent.trim().split(' ');
var input = document.getElementById('input');
var info = document.getElementById('info');
var timeStart = document.getElementById('timer');
var timeLeft = document.getElementById('timeLeft');
var count = 0;
var setIntervalOnce = true;
var interval;
var lastValue = '';
var errorTone = new Audio(
  'data:audio/wav;base64,' +
    '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'
);
var typeTone = new Audio(
  'data:audio/wav;base64,' +
    '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'
);
var timerInMin = 3;
var globTimer;

timeStart.innerHTML = 'Total Time: ' + timerInMin + ' Minute';
timeLeft.innerHTML = 'Time Left: ' + timerInMin + ' Minute ';
input.value = '';

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
  whichWordYouAreIn: 'you have to made it',
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
    timerInMin: timerInMin,
    timerInSec: timerInMin * 60
  },
  finishTime: {
    interValClear: null,
    timerInMin: 0,
    timerInSec: 0
  },

  // all my methods
  moveNext: function() {
    if (this.iAmIn < this.totalWord) {
      this.iAmIn++;
    }
  },
  createWordObject: function() {
    for (var l = 0; l < this.data.length; l++) {
      this.wordMatch[l] = {
        word: this.data[l],
        match: null,
        matchingTime: 0
      };
    }
  },
  createWordWithSpan: function() {
    for (var l = 0; l < this.data.length; l++) {
      this.wordWithSpan[l] = '<span>' + this.data[l] + '</span> ';
    }
  },
  fillMatchData: function() {
    var insert = '';
    for (var l = 0; l < this.wordWithSpan.length; l++) {
      insert += this.wordWithSpan[l];
    }
    text.innerHTML = insert;
  },
  addHighlightClass: function() {
    if (this.iAmIn < this.wordWithSpan.length)
      text.getElementsByTagName('span')[this.iAmIn].classList.add('hightlight');
  },
  removeHighLightClass: function() {
    text
      .getElementsByTagName('span')
      [this.iAmIn].classList.remove('hightlight');
  },
  checkOk: function() {
    if (this.wordMatch[this.iAmIn].match === true) {
      text.getElementsByTagName('span')[this.iAmIn].classList.add('correct');
    } else {
      text.getElementsByTagName('span')[this.iAmIn].classList.add('error');
    }
  },
  set finished(value) {
    if (value === true) {
      input.setAttribute('disabled', 'true');
      var correct = 0;
      var correctedMatchingTime = 0;
      var totalTypedTime = 0;
      var incorrectWord = 0;
      var incorrectMatchingTime = 0;
      keyTest.wordMatch.forEach(function(value, index) {
        totalTypedTime += value.matchingTime;
        if (value.match == true) {
          correctedMatchingTime += value.matchingTime;
          correct++;
        } else if (value.match === false) {
          incorrectMatchingTime += value.matchingTime;
          incorrectWord++;
        }
      });
      clearInterval(this.globTimer);
      clearInterval(this.finishTime.interValClear);

      this.totalCorrectedWord = correct;
      this.correctedWordTypedTime = Math.round(correctedMatchingTime / 100);
      this.totalTypedTime = Math.round(totalTypedTime / 100);
      this.totalInCorrectWord = incorrectWord;
      this.bothWord = this.totalCorrectedWord + this.totalInCorrectWord;
      this.incorrectWordTypedTime = Math.round(incorrectMatchingTime / 100);
      this.WPM = Math.ceil(
        this.totalCorrectedWord / this.finishTime['timerInMin']
      );
      this.accuracy = Math.round(
        (this.totalCorrectedWord * 100) / this.bothWord
      );

      // show in the dom
      info.innerHTML = `
                    <p>Your typing speed: ${
                      this.WPM
                    } WPM (that means you can type ${
        this.WPM
      } words in 1 minute)</p>
                    <p>Total typing time(min): ${this.finishTime[
                      'timerInMin'
                    ].toFixed(2)} Minute</p>
                    <p>Correct word: ${this.totalCorrectedWord}</p>
                    <p>Incorrect word: ${this.totalInCorrectWord}</p>
                    <p>Accuracy : ${this.accuracy}%</p>
                    <p><button onclick="window.location.reload()">Test Again</button>
                `;
    }
  },
  set timer(value) {
    if (value === -1) {
      input.setAttribute('disabled', 'true');
      var correct = 0;
      var correctedMatchingTime = 0;
      var totalTypedTime = 0;
      var incorrectWord = 0;
      var incorrectMatchingTime = 0;
      keyTest.wordMatch.forEach(function(value, index) {
        totalTypedTime += value.matchingTime;
        if (value.match == true) {
          correctedMatchingTime += value.matchingTime;
          correct++;
        } else if (value.match === false) {
          incorrectMatchingTime += value.matchingTime;
          incorrectWord++;
        }
      });
      clearInterval(this.globTimer);
      clearInterval(this.finishTime.interValClear);

      this.totalCorrectedWord = correct;
      this.correctedWordTypedTime = Math.round(correctedMatchingTime / 100);
      this.totalTypedTime = Math.round(totalTypedTime / 100);
      this.totalInCorrectWord = incorrectWord;
      this.bothWord = this.totalCorrectedWord + this.totalInCorrectWord;
      this.incorrectWordTypedTime = Math.round(incorrectMatchingTime / 100);
      this.WPM = Math.ceil(
        this.totalCorrectedWord / this.givenTime['timerInMin']
      );
      this.accuracy = Math.round(
        (this.totalCorrectedWord * 100) / this.bothWord
      );

      // show in the dom
      info.innerHTML = `
                    <p>Your typing speed: ${
                      this.WPM
                    } WPM (that means you can type ${
        this.WPM
      } words in 1 minute)</p>
                    <p>Total typing time(min): ${this.givenTime[
                      'timerInMin'
                    ].toFixed(2)} Minute</p>
                    <p>Correct word: ${this.totalCorrectedWord}</p>
                    <p>Incorrect word: ${this.totalInCorrectWord}</p>
                    <p>Accuracy : ${this.accuracy}%</p>
                    <p><button onclick="window.location.reload()">Test Again</button>
                `;
    }
  }
};

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
  if (moreS === '  ') {
    return true;
  }
}
function cT() {
  var count = timerInMin * 60;
  var counter,
    globTimer = setInterval(timer, 1000); //1000 will  run it every 1 second
  keyTest['globTimer'] = globTimer;
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
    timeLeft.innerHTML =
      'Time Left: ' + minutes + ' Minute ' + seconds + ' Second'; // watch for spelling
  }
}

// all my events
input.oninput = function(e) {
  // play input sound

  moreThanTwoSpace();
  if (setIntervalOnce) {
    interval = setInterval(countTimeForWord, 10);
    setIntervalOnce = false;
    keyTest.finishTime['interValClear'] = setInterval(function() {
      keyTest.finishTime['timerInSec']++;
      keyTest.finishTime['timerInMin'] = keyTest.finishTime['timerInSec'] / 60;
    }, 1000);

    // start the timper
    cT();
  }
  if (keyTest.finished) {
    return false;
  }
  if (keyTest.iAmIn < keyTest.totalWord) {
    if (e.data === ' ') {
    } else {
      if (
        keyTest.wordMatch[keyTest.iAmIn].word ==
        input.value.substring(keyTest.subStringLen).trim()
      ) {
        keyTest.wordMatch[keyTest.iAmIn].match = true;
        keyTest.wordMatch[keyTest.iAmIn].matchingTime = count;
      } else {
        keyTest.wordMatch[keyTest.iAmIn].match = false;
        keyTest.wordMatch[keyTest.iAmIn].matchingTime = count;
      }
    }
  }
};
input.onkeyup = function(e) {
  errorTone.currentTime = 0;
  lastValue = input.value;
  if (e.code === 'Space') {
    if (!moreThanTwoSpace() && input.value != ' ') {
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
    if (keyTest.iAmIn === keyTest.totalWord) {
      keyTest.finished = true;
      clearInterval(interval);
    } else {
      var span = text.getElementsByTagName('span')[keyTest.iAmIn];
      var offsetH = text.offsetHeight;
      var g = span.offsetTop - offsetH;
      if (g > 1) {
        text.scrollTo(0, g + offsetH / 2);
      }
    }
  }
};
input.onkeydown = function(e) {
  if (lastValue[lastValue.length - 1] === ' ') {
    if (e.code === 'Backspace') {
      errorTone.play();
      e.preventDefault();
    }
  } else {
    typeTone.play();
  }
};

input.onkeypress = function(e) {
  if (lastValue[lastValue.length - 1] === ' ') {
    if (e.code === 'Backspace') {
      errorTone.play();
      e.preventDefault();
    }
  }
};
