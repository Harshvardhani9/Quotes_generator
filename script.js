const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

//Show loading
function showLoadingSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}

//hide loding
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


//show new quote
function newQuote() {
    showLoadingSpinner();
    //Pick a random quote from apiQuotes[]
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    //check if Author field is blank and replace it with 'Unknow'
    if (!quote.author) {
        authorText.textContent = 'Unknow';
    }
    else {
        authorText.textContent = quote.author;
    }
    //check quote length to determine the styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //set the quote, hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get quotes from API using Async fetch request  
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //catch error here
        getQuotes();

    }
}


// to Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/internet/tweet?text=${quoteText.textContent}- ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

//on load
getQuotes();
// loading()