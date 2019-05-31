var search = document.querySelector("#search");
var keyword = document.querySelector("#keyword");
var reset = document.querySelector("#reset");
var search_info = document.querySelector("#search_info");
var movie = document.querySelector("#movies");
var idn;

search.addEventListener("click", function(){
    if(keyword.value == ""){
        alert("Please enter a string to search");
    }
    else{
        if(movie != null){
            while(movie.firstChild != null){
                movie.removeChild(movie.firstChild);
            }
        }
        /*
        for(var j = 1; j < 10; j++){


        }
        */
        var ajax = new XMLHttpRequest();
        var url = "https://api.themoviedb.org/3/search/movie?api_key=a6a02d7b45b6b3dad199329c5774302f&language=en-US&query="+keyword.value +"&page=1&include_adult=false";
        ajax.open("GET", url);
        ajax.send();
        ajax.addEventListener("readystatechange", function(){
            if(ajax.readyState == 4){
                call();
                var obj = JSON.parse(ajax.responseText);
                idn = obj;
                //console.log(obj);
                var heading = document.createElement('h2');
                heading.innerHTML = "Showing search results for \"" +keyword.value +"\"";
                search_info.appendChild(heading);
                
                var subHeading = document.createElement('p');
                subHeading.innerHTML = "Showing " +obj.results.length +" results of total " +obj.total_results +" results.";
                search_info.appendChild(subHeading);
                
                movie.className = "flex-container";
                movie.style.display = "flex";
                movie.style.justifyContent = "center";
                movie.style.flexWrap = "wrap";
                /*
                div tree:
                movie
                    divmain
                        divposter
                            anchor element
                                poster
                    divinfo
                        divTitleReview
                            divreview
                                review
                            divtitledate
                                divtitle
                                    title
                                divdate
                                    date
                        divsynopsis
                            synopsis
                */
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
                    poster.src = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" +obj.results[i].poster_path;
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
                    
                    if(obj.results[i].vote_average >0){
                        var divreview = document.createElement('div');
                        divTitleReview.appendChild(divreview);
                        var review = document.createElement('h3');
                        review.innerHTML = obj.results[i].vote_average;
                        //review.style.display = "flex";
                        //divreview.style.border = "1px solid red";
                        review.style.paddingTop = "40px";
                        review.style.paddingRight = "10px";
                        //review.style.alignItems = "center";
                        review.style.margin = "5%";
                        divreview.appendChild(review);

                    }

                    var divtitledate = document.createElement('div');
                    divTitleReview.appendChild(divtitledate);
                    
                    var divtitle = document.createElement('div');
                    divtitledate.appendChild(divtitle);
                    var title = document.createElement('h2');
                    title.innerHTML = obj.results[i].title;
                    divtitle.appendChild(title);
                    
                    var divdate = document.createElement('div');
                    divtitledate.appendChild(divdate);
                    var date = document.createElement('p');
                    date.innerHTML = obj.results[i].release_date;
                    divdate.appendChild(date);
                }
            }
            document.addEventListener('click', function(event){
                if(event.target.classList.contains("poster_image")){
                    sessionStorage.setItem('clicked', event.target.parentNode.parentNode.parentNode.id);
                    console.log(sessionStorage.getItem('clicked'));
                }
            }, false);

        });

    }

});

reset.addEventListener("click", function(){
    location.reload();
});
/*
window.addEventListener('load', function(){
    var aj = new XMLHttpRequest();
    var url = "https://api.themoviedb.org/3/search/movie?api_key=a6a02d7b45b6b3dad199329c5774302f&query=titanic";
    aj.open("GET", url);
    aj.send();
    aj.addEventListener("readystatechange", function(){
        if(aj.readyState == 4 ){
            var obj = JSON.parse(aj.responseText);
            localStorage.setItem("total_pages", obj.total_pages);
        }
    });
    this.console.log(this.localStorage.getItem("total_pages"));
});
*/


function call(){
    console.log(idn);
}
