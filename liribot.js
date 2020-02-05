// requiring dotenv package //
require("dotenv").config();

// requiring keys.js and storing it in the variable keys //
var keys = require("./keys.js");

// passing in the spotify key into a variable spotify from keys.js //
var spotify = new Spotify(keys.spotify);

// requiring my npm packages that will make the application run //
var fs = require("fs");
var axios = require("axios");
var moment = reuquire("moment");

// functions to handle the requests that they user will pass into Liri //
var artistName = function(artist) {
    return artist.name;
};

// creating the function to run the spotify search //
var spotifySearch = function(songTitle) {
    if (songTitle === undefined) {
        songTitle = "Friends in low places";
    
    };

    spotify.search(
        {
            type: "track",
            query: songTitle
        },
        function(err, data) {
            if(err) {
                console.log("Error: " + err);
                return;
            }

            var songs = data.track.items;

            for (var s = 0; s < songs.length; s++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artist.map(artistName));
                console.log("song tutle: " + songs[i].name);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};

// bands in town function for querying bands in town api //
var searchBands = function(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(queryURL).then(
        function(res) {
            var bandsData = res.data;

            if(!bandsData.length) {
                console.log("No such artist " + artist);
            }

            console.log("Upcoming shows for " + artist + ":");

            for (var b = 0; b < bandsData.length; b++) {
                var shows = bandsData[i];

                // return the data about the upcoming shows and show it in the console //
                console.log(
                    shows.venue.city +
                    "," +
                    (show.venue.region || show.venue.country) +
                    " at " +
                    show.venue.name +
                    " " +
                    moment(show.datetime).format("MM/DD/YYYY")
                );
            }
        }
    );
};

// creating the function for running my movie search //
var movieSearch = function(movieTitle) {
    if (movieTitle === undefined) {
        movieTitle = "The Big Lebowski";
    }

    var movieQuery = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    axios.get(movieQuery).then(
        function(res) {
            var movieData = res.data;

            console.log("Title: " + movieData.title);
            console,log("Year: " + movieData.year);
            console.log("Rated: " + movieData.rated);
            console.log("IMDB Rating: " + movieData.imdbRating);
            console.log("Country: " + movieData.country);
            console.log("Language: " + movieData.language);
            console.log("Plot: " + movieData.plot);
            console.log("Actors: " + movieData.actors);
            console.log("Rotten Tomatoes: " + movieData.rating[1].value);
        }
    );
};

var doWhatItSays = function() {
    fs.readFile("random.text", "utf8", function(err, data) {
        console.log(data);

        var dataArr = data.split(",");

        if (dataArr.length === 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
            pick(dataArr[0]);
        }
    });
};

// creating a function for setting the commands to be used with Liri //
var pick = function(commandData, functionData) {
    switch (commandData) {
        case "concert-this":
            searchBands(functionData);
            break;
        case "spotify-this-song":
            spotifySearch(functionData);
            break;
        case "movie-this":
            movieSearch(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays(functionData);
            break;
        default:
            console.log("Liri doesnt know that");
    }
};

// creating the function to take in the command line inputs for the liri bot application //
var liriThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

// running the main process //
liriThis(process.argv[2], process.argv.slice(3).join(" "));