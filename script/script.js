const quoteBtn = document.querySelector('.quote-btn')
const jokeBtn = document.querySelector('.joke-btn')
const topText = document.querySelector('.top-text')
const displayHere = document.querySelector('.item-display-here')
const copyBtn = document.querySelector('.copy-btn')


quoteBtn.addEventListener('click', generateQuote)
jokeBtn.addEventListener('click', generateJoke)
copyBtn.addEventListener('click', copyItems)

let allQuotes;
let jokeData;
let displayValue;
let errorTime = 0;


// By default showing Quotes
document.addEventListener('DOMContentLoaded', ()=> {
    generateQuote()
})


// ========================
//     Generating Quotes
// =========================
async function generateQuote(){
    topText.textContent = 'Random Quote'

    //   while loading data show this 
    displayHere.innerText = '. . . getting Quote'
     
    allQuotes = await apiDataHangle('https://type.fit/api/quotes')
     
    // For Error Checking
    if(allQuotes.length > 0) {
        var randomJokeNum = getRandom(allQuotes.length)
    }
    else{
        var randomJokeNum = 0
    }
    

    let author;
    //   checking if author is null or not
    if(allQuotes[randomJokeNum].author === null) {
        author = 'anonymous'
    }
    else {
        author = allQuotes[randomJokeNum].author
    }


    displayHere.innerHTML = `<i class="fa-solid fa-quote-left"></i><p>${allQuotes[randomJokeNum].text} 
    \n<span>- By ${author} </span></p> `
    
    // for copy value
    displayValue = `${allQuotes[randomJokeNum].text} - By ${author} `
}


// ========================
//      Generate Joke
// =========================
async function generateJoke(){
    topText.textContent = 'Random Joke'
      
    // while loading data from api
    displayHere.innerText = '. . . getting joke'

    jokeData = await apiDataHangle('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')

    let joke ;

    if (jokeData.type == 'twopart') {
        joke = `${jokeData.setup} <br /> . . . ${jokeData.delivery} `
    }

    else if (jokeData.type == 'single') {
        joke = jokeData.joke
    }
    // for error handling
    else if (jokeData[0].type == 'error') {
        joke = jokeData[0].joke
    }

    displayHere.innerHTML = joke
        
    // for copy btn
    displayValue = joke
}


// ========================
//     Handling api Data
// =========================
async function apiDataHangle(url) { 

    errorTime = errorTime+1;

    if (errorTime < 10 ) {
        // api handling here
        try {
            let fetchUrl = await fetch(url)
            let response = await fetchUrl.json()
            return response
        } catch(error) {
            apiDataHangle(url)
        }
    }
    // if getting error 
    else {
        let errorData = [
            {
                "text" : "Error! Something is wrong bro. please refresh page.",
                "author" : "Ashish nagar",
                "type" : "error",
                "joke" : "Error! Something is wrong brother please refresh page"
            }
        ]
        return errorData
    }
}
    

// for generating random number 
function getRandom(lengthOfAll){
    let randomNum = Math.floor(Math.random() * lengthOfAll)
    return randomNum
}


// copy button
function copyItems() {
    copyBtn.innerText = 'copied !'
    navigator.clipboard.writeText(displayValue);
    setTimeout(() => {
        copyBtn.innerText = 'copy'
    }, 1000);
}


  // logo link
const myLogo = document.querySelector('.logo-img')
myLogo.addEventListener('click',()=> {
    window.open("https://ashish-nagar.netlify.app/", '_blank');
})
