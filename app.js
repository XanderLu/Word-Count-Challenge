const API_URL='http://api.quotable.io/random'
const quoteDisplayElement=document.getElementById('quoteDisplay')
const quoteInputElement=document.getElementById('quoteInput')
const timerElement =document.getElementById('timer')
const countWordElement = document.getElementById('js-count-words')
const countCharElement = document.getElementById('js-count-characters')
const countSentElement = document.getElementById('js-count-sentences')
const countParaElement = document.getElementById('js-count-paragraphs')
const countBigramElement = document.getElementById('js-count-bigrams')
const bigramsInputElement = document.getElementById('js-bigrams-input')
const countOccElement = document.getElementById('js-count-occurrence')

var input_str = ''


bigramsInputElement.addEventListener('input', () =>{ 
     var word_search = bigramsInputElement.value
     wordSearch(input_str, word_search)
    })


quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    input_str = quoteInputElement.value

    countCharElement.innerText = arrayValue.length
    wordCount(input_str)
    sentenceCount(input_str)
    paragraphCount(input_str)
    bigramCount(input_str)

    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
    if(correct){
        alert("You typed everything correct.")
        renderQuote()       
    }
})

function getQuote() {
    return fetch(API_URL)
        .then(response => response.json())
        .then(data => data.content)
}
 
async function renderQuote(){
    const quote = await getQuote()
    quoteDisplayElement.innerHTML =''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
        
    });
    quoteInputElement.value = null
}

function wordCount(input_str){
    if(input_str.length == 0){
        countWordElement.innerText = 0
    }
    else{
        countWordElement.innerText = input_str.split(/[^\s]+/g).length -1}
}
 
function sentenceCount(input_str){
    if(input_str.length ==0){
        countSentElement.innerText = 0
    }else{
        countSentElement.innerText = input_str.split(/[?:.!]+/).length 
    }
}

function paragraphCount(input_str){
    if(input_str.length ==0){
        countParaElement.innerText = 0
    }else{
        countParaElement.innerText = input_str.split(/\n|\r/).length
    }

}

function wordSearch(input,search_str){
    if(input.length == 0 || search_str.length == 0 ){
        countOccElement.innerText=0
    }
    else {
            var index = 0 
            var count = 0
            while(index != -1){
                index = input.indexOf(search_str,index)

                if(index != -1){
                    count++
                    index += search_str.length
                }
            }
            countOccElement.innerText=count
    }
    
}


function bigramCount(input_str){
    arrayOfWords = input_str.split(" ")
    
    var uniquePair = new Set()

    for(var i = 0; i < arrayOfWords.length-1; i++){
        var pair = arrayOfWords[i] + arrayOfWords[i+1]
        if(arrayOfWords[i+1] != '' && arrayOfWords[i+1] != null && arrayOfWords[i] != '' ) {
            uniquePair.add(pair)}
    }   
 
    countBigramElement.innerText=uniquePair.size
}

function confirmAction() {
    let confirmAction = confirm("Are you sure to execute this action? A new Quote will be generated.")
    if (confirmAction) {
      alert("Action successfully executed")
      renderQuote()
    } else {
      alert("Action canceled")
    }
}

renderQuote()