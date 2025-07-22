const slider = document.querySelector('input[type = range]')
const displaylength = document.querySelector('[lengthDisplay]')

function sliderHandler(){
    slider.value = passwordlength;
    displaylength.innerText = passwordlength;

    const min  = slider.min;
    const max = slider.max;
    slider.style.backgroundColor = ( (passwordlength-min)*100/(max-min) ) + "% 100%"
}
let passwordlength = 10;
sliderHandler()


// 'input'	 Fires every time the slider is moved	         ✅ Live update while dragging the slider
// 'change'	 Fires only when the user releases the slider	 ✅ Good for performance (avoid rapid updates)

slider.addEventListener('input' , (event)=>{
    passwordlength = event.target.value;
    sliderHandler()
})



// ==================================================

// Generate Random Letters and Number and Symbols
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function generateRandom(min , max){
    return Math.floor(Math.random() *(max-min))+min;
}

function generateRandomLowercase(){
    return String.fromCharCode(generateRandom(97 , 122));
}

function generateRandomUppercase(){
    return String.fromCharCode(generateRandom(65 , 91));
}

function generateRandomNumber(){
    return generateRandom(1 , 10);
}

function generateRandomSymbol(){
    let index = generateRandom(0 , symbol.length);
    return symbol[index];
}

// console.log(generateRandomLowercase());
// console.log(generateRandomUppercase());
// console.log(generateRandomNumber());
// console.log(generateRandomSymbol());

// --------------------------------------


// Strength Color Based on Password 
let indicator = document.querySelector('.indicator');

// Set Indicator 
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

// Default Indicator 
setIndicator("Add8e6");

const uppercase = document.querySelector('#UpperCase');
const lowercase = document.querySelector('#LowerCase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && hasNumber && hasSymbol && passwordlength >= 7) {
        setIndicator("Green");
    } 
    else if ((hasLower || hasUpper) && (hasNumber || hasSymbol) && passwordlength >= 4) {
        setIndicator("yellow");
    } 
    else {
        setIndicator("#f00");
    }
}

// ---------------------------------------------------------------------------


const copybtn = document.querySelector('.copybtn')
const passwordDisplay = document.querySelector('input[passwordDisplay]');
const copymessage = document.querySelector('[copymessage]')

async function copycontent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copymessage.innerText = 'copied'

    }catch(error){
        alert("Something went wrong in copying");
        copymessage.innerText = 'failed'
    }
    copymessage.classList.add('active');

    setTimeout( ()=>{
        copymessage.classList.remove('active')

    } , 3000);
}



copybtn.addEventListener('click' , ()=>{
    if(passwordDisplay.value){
        copycontent();
    }

})

// ---------------------------------------------------------------------------------------


// shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
// Shuffle the array randomly - Fisher Yates Method
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


// ------------------------------------------------------

// generating passoword 

let checkboxes = document.querySelectorAll('input[type=checkbox]');
let countchecked = 0;

// checkbox handle
function handleCheckboxes(){
    countchecked = 0;
    checkboxes.forEach( (checkbox) =>{
        if(checkbox.checked)
            countchecked++;
    })

    // special condition 
     if(countchecked > passwordlength){
            passwordlength = countchecked;
            sliderHandler()
        }

}

checkboxes.forEach( (checkbox) =>{
    checkbox.addEventListener('change' , handleCheckboxes);
})

const generatebtn = document.querySelector('#generatebtn');
let password = ""; 

generatebtn.addEventListener('click' , ()=>{

    if(countchecked <= 0){
        return;
    }

    if(countchecked > passwordlength){
        passwordlength = countchecked;
        sliderHandler();
    }

    // remove previous password
    password = "";

    let arrayofcheckedfunction = [];

    if(uppercase.checked) arrayofcheckedfunction.push(generateRandomUppercase)
    if(lowercase.checked) arrayofcheckedfunction.push(generateRandomLowercase)
    if(symbols.checked) arrayofcheckedfunction.push(generateRandomSymbol)
    if(numbers.checked) arrayofcheckedfunction.push(generateRandomNumber)


    // compulsory addition
    for(let index = 0 ; index < arrayofcheckedfunction.length ; index++){
        password += arrayofcheckedfunction[index]();
    }

    // remaining addition
    for(let index = 0 ; index < (passwordlength - arrayofcheckedfunction.length) ; index++){
        let randInt = generateRandom(0 , arrayofcheckedfunction.length);
        password += arrayofcheckedfunction[randInt]();
    }
     console.log("password : " , password)


// shuffle password 
password = shuffle(Array.from(password));
console.log("end Result : " + password)
passwordDisplay.value = password;
calcStrength()

})
