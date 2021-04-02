
let quotesData;

var colors = [
    "#f75959",
    "#fa5a8a",
    "#cb4bfa",
    "#8e4bfa",
    "#624bfa",
    "#4b68fa",
    "#10d5e3",
    "#10e38b",
    "#1fa66e",
    "#2cd147",
    "#68db3d",
    "#89a321",
    "#bfa239",
    "#bf9339",
    "#a3652a",
    "#e88146",
    "#e86346",
    "#ff810a",
    "#09b7de",
    "#419e60",
    "#b381b8"
];

var currentQuote = '';
var currentAuthor = '';

function getQuotes() {
    return $.ajax({
    headers: {
        Accept: 'application/json'
        },
        url:
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success:function (jsonQuotes) {
    if (typeof jsonQuotes === "string") {
        quotesData=JSON.parse(jsonQuotes)
        console.log('quotesData');
        console.log(quotesData);
            }
        }
     } 
    )
}

function getRandomQuote() {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];   
}

function getQuote() {
    let randomQuote = getRandomQuote();
    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;
    debugger
  $("#tweet-quote").attr(
    "href",
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );
  $("#quote-text").animate({opacity: 0},500,function() {
    $(this).animate({opacity: 1},500);
    $("#text").text(randomQuote.quote);
  });
  $("#quote-author").animate({opacity: 0},500,function() {
    $(this).animate({opacity: 1},500);
    $("#author").text(randomQuote.author);
  });
    var color = Math.floor(Math.random() * colors.length);
  $("html body").animate({
    backgroundColor: colors[color],
    color: colors[color]
    },
    1000
 )
  $('.button').animate(
    {
      backgroundColor: colors[color]
    },
    1000
    );
  }

$(document).ready(function () {
    console.log('loading')
    getQuotes().then(() => {
        console.log('getting quote')
      getQuote();
    });
  
    $('#new-quote').on('click', getQuote);
  });



