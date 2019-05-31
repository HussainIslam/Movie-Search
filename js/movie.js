window.addEventListener('load', function(){
    var movieId = sessionStorage.getItem("clicked");
    this.console.log(movieId);
    var ajax = new XMLHttpRequest();
    var index;
    var url = "https://api.themoviedb.org/3/movie/" +movieId +"?api_key=a6a02d7b45b6b3dad199329c5774302f";
    ajax.open("GET", url);
    ajax.send();
    ajax.addEventListener("readystatechange", function(){
        if(ajax.readyState == 4){
            var obj = JSON.parse(ajax.responseText);
            console.log(obj);

            var movie = document.querySelector("#movies");
            movie.style.width = "60%";
            movie.className = "flex-container";
            movie.style.flexDirection = "column";
            movie.style.display = "flex";
            movie.style.alignItems = "center";
            movie.style.flexWrap = "wrap";
            movie.style.marginLeft = "auto";
            movie.style.marginRight = "auto";
            
            var divtitle = document.createElement('div');
            movie.appendChild(divtitle);

            var title = document.createElement('h2');
            title.innerHTML = obj.title;
            divtitle.appendChild(title);

            var divposter = document.createElement('div');
            movie.appendChild(divposter);
            var poster = document.createElement('img');
            poster.style.width = "300px";
            poster.src = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + obj.poster_path;
            divposter.appendChild(poster);

            var divinfo = document.createElement('div');
            divinfo.style.display = "flex";
            divinfo.style.justifyContent = "space-around";
            //divinfo.style.border = "1px solid red";
            divinfo.style.width = "60%";
            movie.appendChild(divinfo);

            var divreview = document.createElement('div');
            divreview.style.width = "30%";
            //divreview.style.border = "1px solid red";
            divinfo.appendChild(divreview);
            var review = document.createElement('h3');
            review.innerHTML = "Rating: " +obj.vote_average;
            divreview.appendChild(review);

            var divdate = document.createElement('div');
            divinfo.appendChild(divdate);
            var date = document.createElement('h3');
            date.innerHTML = "Released: " +obj.release_date;
            divdate.appendChild(date);

            var divtrailer = document.createElement('div');
            divinfo.appendChild(divtrailer);

            var divsynopsis = document.createElement('div');
            movie.appendChild(divsynopsis);
            var synopsis = document.createElement('p');
            synopsis.style.margin = "4%";
            synopsis.style.textAlign = "justify";
            synopsis.innerHTML = obj.overview;
            divsynopsis.appendChild(synopsis);

            var trailerHeading = document.createElement('h3');
            divtrailer.appendChild(trailerHeading);
            
            var aj = new XMLHttpRequest();
            var url2 = "https://api.themoviedb.org/3/movie/" +movieId +"/videos?api_key=a6a02d7b45b6b3dad199329c5774302f"
            aj.open('GET', url2);
            aj.send();
            aj.addEventListener('readystatechange', function(){
                if(aj.readyState ==4){
                    var obj2 = JSON.parse(aj.responseText);
                    console.log(obj2);
                    var trailer = document.createElement('a');
                    trailer.innerHTML = "Trailer";
                    trailer.target = "_blank";
                    trailer.href = "https://www.youtube.com/watch?v=" +obj2.results[1].key;
                    trailerHeading.appendChild(trailer);
                    
                }
            });
        }

    });

});


