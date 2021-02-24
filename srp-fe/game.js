// Definisikan object terlebih dahulu
var userRock = document.getElementById('user-rock');
var userPaper = document.getElementById('user-paper');
var userScissor = document.getElementById('user-scissor');
var compRock = document.getElementById('comp-rock');
var compPaper = document.getElementById('comp-paper');
var compScissor = document.getElementById('comp-scissor');
var compDefault = document.getElementById('comp-default');
var result = document.getElementById('result');

// Event listener for userRock object
userRock.addEventListener('click', function (e) {
  userPaper.style.display = "none";
  userScissor.style.display = "none";
  submitSRP('rock');
});

// Event listener for userPaper object
userPaper.addEventListener('click', function (e) {
  userRock.style.display = "none";
  userScissor.style.display = "none";
  submitSRP('paper');
});

// Event listener for userScissor object
userScissor.addEventListener('click', function (e) {
  userPaper.style.display = "none";
  userRock.style.display = "none";
  submitSRP('scissor');
});


// Fungsi untuk membuat request ke API
function submitSRP(srp) {
  fetch('http://localhost:8000/run/', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user_choice': srp
    })
  })
  .then(function (response) {
    response.json().then(function (data) {
      // reset image untuk pilihan komputer
      compRock.style.display = 'none';
      compPaper.style.display = 'none';
      compScissor.style.display = 'none';
      compDefault.style.display = 'none';

      // Pemeriksaan data response computer
      if (data.computer === 'rock') {
        compRock.style.display = 'block';
      } else if ( data.computer === 'paper' ) {
        compPaper.style.display = 'block';
      } else if ( data.computer === 'scissor' ) {
        compScissor.style.display = 'block';
      }

      // Pemenang
      if ( data.status ) {
        document.querySelector('.user-choice').style.background = '#7965aa';
      } else {
        document.querySelector('.user-choice').style.background = '#fd8dae';
      }

      document.querySelector('.result').innerHTML = data.message;
    })
  }).catch(function (error) {
    console.log(response);
  })
}