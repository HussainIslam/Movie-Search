var search = document.querySelector("#search");
var keyword = document.querySelector("#keyword");
var reset = document.querySelector("#reset");
var search_result = document.querySelector("#search_result");

search.addEventListener("click", function(){
    if(keyword.value == ""){
        alert("Please enter a string to search");
    }
    else{
        while(search_result.firstChild != null){
            search_result.removeChild(search_result.firstChild);
        }
        var ajax = new XMLHttpRequest();
        var radio_adult_off = !document.querySelector("#radio_adult_off").checked;
        var url = "https://api.themoviedb.org/3/search/movie?api_key=a6a02d7b45b6b3dad199329c5774302f&language=en-US&query="+keyword.value +"&page=1&include_adult=" +radio_adult_off;
        ajax.open("GET", url);
        ajax.send();
        ajax.addEventListener("readystatechange", function(){
            if(ajax.readyState == 4){
                var obj = JSON.parse(ajax.responseText);
                var heading = document.createElement('h1');
                heading.innerHTML = "Showing search results for \"" +keyword.value +"\"";
                search_result.appendChild(heading);

                var subHeading = document.createElement('p');
                subHeading.innerHTML = "Total " +obj.results.length +" results found.\n";
                search_result.appendChild(subHeading);

                for(var i = 0; i < obj.results.length; i++){
                    var divmain = document.createElement('div');
                    search_result.appendChild(divmain);
                    
                    var divHeading = document.createElement('div');
                    divmain.appendChild(divHeading);
                    
                    var title = document.createElement('h2');
                    title.innerHTML = obj.results[i].title;
                    title.style.margin = "20px";
                    title.style.marginTop = "60px";
                    title.style.color = "black";
                    divHeading.appendChild(title);
                    
                    var divBody = document.createElement('div');
                    divBody.style.width = "80%";
                    divBody.style.border = "1px solid grey";
                    divBody.style.boxShadow = "10px 10px 5px grey";
                    divBody.style.display = "flex";
                    divmain.appendChild(divBody);

                    var div1 = document.createElement('div');
                    divBody.appendChild(div1);
                    var poster = document.createElement('img');
                    poster.src = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" +obj.results[i].poster_path;
                    poster.style.display = "block";
                    poster.style.maxWidth = "200px";
                    poster.style.maxHeight = "200px";
                    poster.style.width = "auto";
                    poster.style.height = "auto";

                    poster.style.margin = "20px";
                    divBody.appendChild(poster);

                    var description = document.createElement('p');
                    description.innerHTML = obj.results[i].overview;
                    //description.style.width = "50%";
                    divBody.appendChild(description);
                }
            }

        });

    }

});

reset.addEventListener("click", function(){
    location.reload();
});