window.addEventListener("load", function(){
    var ajax = new XMLHttpRequest();
    var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=a6a02d7b45b6b3dad199329c5774302f&language=en-US&page=1";
    ajax.open("GET", url);
    ajax.send();
    ajax.addEventListener("readystatechange", function(){
       if(ajax.readyState == 4){
           var obj = JSON.parse(ajax.responseText);
           
           var movie = document.querySelector("#movies");
           movie.className = "flex-container";
           movie.style.display = "flex";
           movie.style.justifyContent = "center";
           movie.style.flexWrap = "wrap";
           
           for(var i = 0; i < obj.results.length; i++){
                var divmain = document.createElement('div');
                divmain.id = obj.results[i].id;
                //console.log(divmain.id);
                divmain.style.width = "40%";
                divmain.style.margin = "20px";
                divmain.style.display ="flex";
                divmain.style.boxShadow = "10px 10px 5px #D3D3D3";
                movie.appendChild(divmain);
               
                var divposter = document.createElement('div');
                divposter.style.margin = "5%";
                divposter.style.width = "30%";
                divmain.appendChild(divposter);
                var anchor = document.createElement('a');
                anchor.href = "movie.html";
                divposter.appendChild(anchor);

                var poster = document.createElement('img');
                poster.src = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" +obj.results[i].poster_path;
                poster.classList = "poster_image";
                poster.style.display = "block";
                poster.style.marginLeft = "auto";
                poster.style.marginRight = "auto";
                poster.style.width = "100%";
                anchor.appendChild(poster);

                var divinfo = document.createElement('div');
                divinfo.style.width = "60%";
                divinfo.style.margin = "3%";
                divmain.appendChild(divinfo);

                var divTitleReview = document.createElement('div');
                divTitleReview.style.display = "flex";
                divinfo.appendChild(divTitleReview);

                var divsynopsis = document.createElement('div');
                divinfo.appendChild(divsynopsis);
                var synopsis = document.createElement('p');
                synopsis.innerHTML = obj.results[i].overview;
                synopsis.style.textAlign = "justify";
                
                divsynopsis.appendChild(synopsis);
                
                var divreview = document.createElement('div');
                divTitleReview.appendChild(divreview);
                var review = document.createElement('h3');
                review.innerHTML = obj.results[i].vote_average;
                review.style.display = "flex";
                review.style.alignItems = "center";
                review.style.margin = "5%";
                divTitleReview.appendChild(review);

                var divtitledate = document.createElement('div');
                divTitleReview.appendChild(divtitledate);
                
                var divtitle = document.createElement('div');
                divtitledate.appendChild(divtitle);
                var title = document.createElement('h2');
                title.innerHTML = obj.results[i].title;
                divtitledate.appendChild(title);
                
                var divdate = document.createElement('div');
                divtitledate.appendChild(divdate);
                var date = document.createElement('p');
                date.innerHTML = obj.results[i].release_date;
                divdate.appendChild(date);
            }
            
            document.addEventListener('click', function(event){
                if(event.target.classList.contains("poster_image")){
                    sessionStorage.setItem('clicked', event.target.parentNode.parentNode.parentNode.id);
                    console.log(sessionStorage.getItem('clicked'));
                }
            }, false);
            
            
        }
    });


    
});
