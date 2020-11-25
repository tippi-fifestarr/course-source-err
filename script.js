// use random math to change the quality of red each time
const colorsArr = ['red', 'blue', 'brown', 'yellow', 'green', 'orange', 'purple', 'lightblue', 'black', 'white']
const button = document.getElementById("button")
const buttonH = document.getElementsByClassName("change")
console.log(button)

// necessary variables for the HUD Popup
const hudContainer = document.querySelector('.hud-container')
const hudTimer = document.querySelector('.hud-timer-box')
const hudRestTimer = document.querySelector('.hud-rester')
const closeButt = document.querySelector('.closeButt')
// timer
let timer = 0;
setTimer()
let x;

// function for colorchange
window.onclick = myFunction;
// https://www.w3schools.com/jsref/event_onclick.asp
function myFunction() {
    const randomNum = Math.floor(Math.random() * Math.floor(colorsArr.length))
    document.getElementsByTagName("BODY")[0].style.background = colorsArr[randomNum]
    button.style.border = `1px solid ${colorsArr[randomNum]}`
    if (colorsArr[randomNum] == 'red'){
      button.onclick = () => {
        //   open a modal with daduece.html in it
        togOverlay();
        winText();
        // or open a you win screen (timer, and link to dadeuce)
      }
    }
    
    // do we need an else here to set the button.onclick to nothing (or a loseText()?)
}


// this is a mess or is it? it makes sense!
function setTimer(){
    // timer += 3??? 
    // hudTimer.innerHTML = `${timer} sec`
    // callback function
    let x = setInterval(function() {
        // closeButt.onclick = function(){
        //     hudContainer.classList.remove('show')
        //     clearInterval(x)
        // }
        // hudTimer.innerHTML = `${timer} sec`
      
            //   clearInterval(x)  
            
          timer++
    }, 999)
}

function togOverlay(){
  console.log('YEP')
  // the essence of setOverlay without the ifs
  hudContainer.classList.add('show')
}

function winText(x) {
    closeButt.onclick = function(){
        hudContainer.classList.remove('show')
        clearInterval(x)
    }
    if (timer <= 68){
        clearInterval(x)
        hudTimer.innerHTML = `you red in ${timer} seconds, very nice`
        document.getElementById(winText)

    }
    if (timer >= 69){
        hudTimer.innerHTML = `you won in more than 69 seconds, try again!` 
        clearInterval(x) 
    }
}



















// // copyFunc copies the text to your clipboard
// function copyFunc() {
//   /* Get the text field */
//   var copyText = document.getElementById("clipboard");

//   /* Select the text field */
//   copyText.select();
//   copyText.setSelectionRange(0, 99999); /*For mobile devices*/

//   /* Copy the text inside the text field */
//   document.execCommand("copy");

//   /* Alert the copied text */
//   alert("Copied the text: " + copyText.value);
// }
function CloseWindow()
{
  window.top.opener = null;
  window.close();
}