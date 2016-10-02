// ==UserScript==
// @name         Torrent and Subtitles
// @namespace    https://github.com/drushadrusha
// @version      1.0
// @description  ...
// @author       drushadrusha
// @match        https://myshows.me/view/episode/*
// @match        https://www.kinopoisk.ru/film/*
// @grant        none
// ==/UserScript==

(function (window, undefined) {

    if (window.location.hostname == ("myshows.me")){

        var schema = document.getElementsByTagName('script');

        for(var i=0; i<schema.length; i++){
            if(schema[i].getAttribute('type')=='application/ld+json'){
                var data = JSON.parse(schema[i].innerText);
                var seriesName = data.partOfTVSeries.name;
                var seasonNumber = data.partOfSeason.seasonNumber;
                var episodeNumber = data.episodeNumber;
                var tpbSeriesName = seriesName.split("'").join(""); // ThePirateBay не воспринимает кавычки в поиске, поэтому мы их уберем

                if(episodeNumber<10){
                    episodeNumber = "0"+episodeNumber;
                }

                if(seasonNumber<10){
                    seasonNumber = "0"+seasonNumber;
                }

                var subtitlesLink = '<a href="http://www.addic7ed.com/search.php?search='+seriesName+" S"+seasonNumber+"E"+episodeNumber+'"><h2>Найти субтитры</h2></a>';
                var tpbLink = '<a href="https://thepiratebay.org/search/'+tpbSeriesName+" S"+seasonNumber+"E"+episodeNumber+'"><h2>Найти на The Pirate Bay</h2></a>';
                // var tunefindLink = '<a href="http://www.tunefind.com/show/'+seriesName+'"><h2>Саундтрек</h2></a>';
                var addThisShare = document.getElementsByClassName("addThisShare");
                addThisShare[0].innerHTML += tpbLink+subtitlesLink;
            }
         }
    }

    if(window.location.hostname == "www.kinopoisk.ru"){
        var els = document.getElementsByTagName('span'), i = 0, movieName;

        for(i; i < els.length; i++) {
            prop = els[i].getAttribute('itemprop');
            if(prop == "alternativeHeadline") {
                movieName = els[i].innerHTML;
                break;
            }
        }

        var tpbMovieName = movieName.split("'").join("");

        var pageElement = document.getElementById("actorList");
        var tpbLink = '<a href="https://thepiratebay.org/search/'+tpbMovieName+'"><h3>Найти на The Pirate Bay</a><br>';
        var subtitlesLink = '<a href="http://www.opensubtitles.org/en/search2/sublanguageid-all/moviename-'+movieName+'">Найти субтитры</h3></a>';
        pageElement.innerHTML += tpbLink+subtitlesLink;

    }

})(window);