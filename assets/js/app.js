$(document).ready(function () {
	var artists = ["Taylor Swift", "Lana Del Rey", "Florence and the Machine", "Ellie Goulding", "Kacey Musgraves", "Drake"];

	// Add buttons for original artists array
	function addButtons() {
		$("#artist-buttons").empty();
		for (i = 0; i < artists.length; i++) {
			$("#artist-buttons").append("<button class='btn btn-primary' data-artist='" + artists[i] + "'>" + artists[i] + "</button>");
		}
	}

	addButtons();

	// Adding a button for artist entered
	$("#add-artist").on("click", function () {
		event.preventDefault();
		var artist = $("#artist-input").val().trim();
		artists.push(artist);
		addButtons();
		return;
	});

	// Getting gifs from api... onto html
	$("button").on("click", function () {
		var artist = $(this).attr("data-artist");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			artist + "&api_key=0cHRhYNj6KIrtRsS0IUVJ9ea2fDjK1SS"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#artists").empty();
			for (var i = 0; i < results.length; i++) {
				var artistDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var artistImg = $("<img>");

				artistImg.attr("src", results[i].images.original_still.url);
				artistImg.attr("data-still", results[i].images.original_still.url);
				artistImg.attr("data-animate", results[i].images.original.url);
				artistImg.attr("data-state", "still");
				artistImg.attr("class", "gif");
				artistDiv.append(p);
				artistDiv.append(artistImg);
				$("#artists").append(artistDiv);
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}

	$(document).on("click", ".gif", changeState);

});