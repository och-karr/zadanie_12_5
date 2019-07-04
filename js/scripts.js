var prefix = "https://cors-anywhere.herokuapp.com/"; //aby ominąć CORS
var tweetLink = "https://twitter.com/intent/tweet?text="; //https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent.html
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1"; //https://quotesondesign.com/api-v4-0/

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

	var quoteContent = $(data.content).text().trim();
	var quoteText = quoteContent.charAt(0).toUpperCase() + quoteContent.substr(1).toLowerCase();
	//text - wyciagamy text z data.content
	//trim - ucinamy niepotrzebne spacje
	var quoteAuthor = data.title;

	if (!quoteAuthor.length) {
		quoteAuthor = "Unknown author";
	}

	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

	if (tweetText.length > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.quote').text(quoteText);
		$('.author').text("Author: " + quoteAuthor);
		$('.tweet').attr('href', tweet);
	}

}

$(document).ready(function () {
	getQuote();
	$('.random').click(function () {
		getQuote();
	})
});