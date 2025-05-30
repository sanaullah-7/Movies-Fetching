     //Fething  of data
      // TMDB ka matlab hai:
// The Movie Database
// Ye ek mashhoor online platform hai jo movies, TV shows, aur celebrities ke mutaliq tafseelat (details) provide karta hai.
// Iska use developers karte hain taake unki apps ya websites me latest ya popular movies dikhai jaa sakein.  

// Fetch ka matlab hota hai:
// Data ko kisi server ya website se lena (retrieve karna)
// Iska role:
// Jab aap TMDB se popular movies chahte hain, to aap fetch karte hain data ko ek request ke zariye.

// API ka full form hai:
// Application Programming Interface
// API ka matlab:
// API ek zariya hai jiske through ek app dusri app ya server se baat karti hai — bina andar ka system samjhe.
// TMDB API ka role ye hai:
// Aap TMDB ko keh nahi sakte seedha, "Movie data do."
// Aapko TMDB API ko ek URL request bhejna padta hai jisme:
// Aapki API key hoti hai (ye batata hai ke aap kaun hain)
// Aur aap kya chahte hain (jaise: "popular movies")

const apiKey = "1b718757d4841ef88507cb2613bb6f34";
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;//Yeh line ek URL banata hai jisse popular movies TMDB se fetch ki jaa sakti hain. Isme tumhara API key shamil hai.
const imageBase = "https://image.tmdb.org/t/p/w300";//This is the base URL for loading movie poster images. You’ll add the movie’s image path to this.
//Genre ka matlab hota hai movie ka type ya category.
const genreMap = {//Yeh ek object hai jo genre ID ko samajhne layak naamon mein convert karta hai (jaise 28 = Action).
28: "Action",
12: "Adventure",
16: "Animation",
35: "Comedy",
80: "Crime",
99: "Documentary",
18: "Drama",
10751: "Family",
14: "Fantasy",
36: "History",
27: "Horror",
10402: "Music",
9648: "Mystery",
10749: "Romance",
878: "Sci-Fi",
10770: "TV Movie",
53: "Thriller",
10752: "War",
37: "Western",
};


async function FetchMovie(){//Defines an asynchronous function so you can use await inside for clean async code.
try
{
const responsed = await fetch(apiUrl)//TMDB API ko GET request bhejta hai aur jab tak response nahi aata, ruk jaata hai.
console.log('response: ', responsed);
const data = await responsed.json();
console.log('Data : ', data );
const  movies = data.results;//Takes out the list of movies from the API response (inside results array).
console.log('movies: ', movies);
movies.forEach(movie => {//Loops through each movie object and prints it to the console.

const {
title,
  overview,
  poster_path,
  release_date,
  vote_average,
  genre_ids,
  original_language,
  id,

} = movie//This breaks the movie object into separate variables. Now we can directly use title, overview, 
// console.log('movie: ',movie);
// Genre (जॉनर) ka matlab hota hai movie ka type ya category.
// "genre_ids" ke andar jo numbers hain.map() har ID ke liye genreMap se naam nikaal ke naya array banata hai.
//=>👉 map() ka kam ha k Har ID ko utha ke uska naam nikaalo.
const category = genre_ids.map((id)=> genreMap[id]).join("    ,  ")//join() ek array ko ek single string banata hai
//genre_ids Ye ek array hai jisme numbers(ID) hote hain, jaise:genre_ids = [28, 35]
//genreMap Ye ek object hai jo har ID ka naam batata hai:
//Agar genre_ids = [28, 35] ho aur genreMap[28] = "Action", genreMap[35] = "Comedy" ho,         
// console.log('genre_ids: ', genre_ids);
// console.log('category: ', category);
const mainDiv = document.getElementById("main-div");
mainDiv.style.display = "flex";
mainDiv.style.flexWrap = "wrap";
mainDiv.style.gap = "20px";
mainDiv.style.padding = "10px 50px";
mainDiv.style.marginTop = "-20px";

const Movie_Card = document.createElement("div");
Movie_Card.style.width = "275px";
Movie_Card.style.background = "black";
Movie_Card.style.color = "white";
Movie_Card.style.fontSize = "18px";
Movie_Card.style.padding = "10px";
Movie_Card.style.borderRadius = "10px";
Movie_Card.style.boxShadow = "0 40px 50px rgba(0,0,0,0.3)";
Movie_Card.style.marginTop="40px"

const image = document.createElement("img");//image.src bata raha hai kahan se image aayegi (from which URL). "JUST LIKE WE WRITE h1.innerHTMl= "
image.src = imageBase+ poster_path; //imageBase ek TMBD  website ka base image URL hai..Har movie ka poster iss base URL se start hota hai.
image.alt = movie.title;            //poster_path har movie ka poster ka alag path hota.aur Yeh TMDB API se aata hai.Note: Isme sirf file ka naam hota hai, pura link nahi hota...Base URL: "https://image.tmdb.org/t/p/w300"  + Poster Path: "/abc123xyz.jpg" = Final URL.

image.style.width = "100%";         //Dono ko jod kar hum ek pura image URL banate hain.
image.style.borderRadius = "5px";   //Aur woh image.src mein lagate hain taake browser woh poster dikhaye.

const h2 = document.createElement("h2");
h2.innerText = title;
h2.style.color = "Red";

const overviewHeading = document.createElement("h3");
overviewHeading.innerText = "Overview:";
overviewHeading.style.marginBottom= "-11px";
overviewHeading.style.color= "blue";

const overviewText = document.createElement("p");
overviewText.innerText = overview;
overviewText.style.marginBottom= "20px";

const genre = document.createElement("p");
genre.innerText = "Genre: " + category;
genre.style.color="lightblue"

const language = document.createElement("p");
language.innerText = "Language: " + original_language;
language.style.color="yellowgreen"

const ID = document.createElement("p");
ID.innerText = "ID: " + id;
ID.style.color="orange"

const rating = document.createElement("p");
rating.innerText = `Rating : ${vote_average}`;
rating.style.color="yellow"

const release = document.createElement("p");
release.innerText = `Release: ${release_date}`;
release.style.color="lightblue"

Movie_Card.append(image, h2,genre, rating, release, overviewHeading,overviewText, language, ID);
mainDiv.appendChild(Movie_Card);

});
}
catch(error){
console.log('error: ', error);
}
}
FetchMovie();//Function ko call karta hai jis se movies fetch karne ka process start hota hai.
