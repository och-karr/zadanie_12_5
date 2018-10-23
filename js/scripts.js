var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text="; 
//link do wysylania tweetow na tweetera (bez tresci)
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
//link pobierajacy cytaty

function getQuote() {
	$.getJSON(prefix + quoteUrl, createTweet);
	$.ajaxSetup({ cache: false });
}

//skrot od:
// $.ajax({
//     dataType: "json", - te wartosci zostana przyjete domyslnie
//     url: quoteUrl, //adres zapytania (nasz link do API)
//     data: null, - te wartosci zostana przyjete domyslnie
//     success: createTweet //funkcja, która zostanie wykonana przy pomyślnym wykonaniu zapytania
// });

function createTweet(input) {
    var data = input[0];

	var quoteConent = $(data.content).text().trim();
	var quoteText = quoteConent.charAt(0).toUpperCase() + quoteConent.substr(1).toLowerCase();
	//data.content - klucz, kod html paragrafu
	//text - wyciagamy text z data.content
	//trim - ucinamy niepotrzebne spacje
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) { //lenght = 0 --> false, !length = 0 --> true
        quoteAuthor = "Unknown author";
	}
	
	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

	if (tweetText.length > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.quote').text(quoteText); //tresc cytatu
		$('.author').text("Author: " + quoteAuthor); //autor cytatu
		$('.tweet').attr('href', tweet);
	}

}

$(document).ready(function() {
	getQuote();
	$('.trigger').click(function() {
		getQuote();
	})
});