const container = document.getElementById("container");
const spinner = document.getElementById("spinner");
const arrow = document.getElementById("arrow");
const MovieDetails = async () => {
  const urlParam = new URLSearchParams(window.location.search);
  const MovieId = urlParam.get("id");
  if (MovieId) {
    spinner.classList.remove("hidden");
    const response = await axios(
      `https://api.themoviedb.org/3/movie/${MovieId}`,
      {
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDdiMTIzMTgyY2ZjM2Y0NTE4MWQ3ZTI4MWY2YjU2NSIsInN1YiI6IjY2MDUzY2E2ZjkwYjE5MDE3Y2E4NThkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkPfU6wAsJg_gVK-aYVID4SNeJLb5-tazk3aDbxEIjo",
        },
      }
    );
    const data = response.data;
    spinner.classList.add("hidden");
    document.title = data.title + " " + data.release_date;
    const MovieInfo = document.createElement("div");
    const Posters = document.createElement("div");
    const MetaData = document.createElement("div");
    MovieInfo.classList = "movieInfo";
    Posters.classList = "MoviePoster";
    MetaData.classList = "MovieDetails";
    const Poster = document.createElement("img");
    Poster.classList = "Poster";
    const OverView = document.createElement("p");
    const Title = document.createElement("p");
    Title.classList = "MovieTitle";
    const ReleaseDate = document.createElement("p");
    ReleaseDate.classList = "ReleaseDate";
    const Genre = document.createElement("p");
    Genre.classList = "Genre";
    Poster.src = `http://image.tmdb.org/t/p/w500${data.poster_path}`;
    OverView.textContent = data.overview;
    OverView.classList = "MovieOverview";
    Title.textContent = data.title;
    ReleaseDate.textContent = data.release_date;
    data.genres.forEach((genre) => {
      Genre.textContent += " " + genre.name;
    });

    container.append(MovieInfo);
    MovieInfo.append(Posters);
    Posters.append(Poster);
    MovieInfo.append(MetaData);
    MetaData.append(Title);
    MetaData.append(ReleaseDate);
    MetaData.append(Genre);
    MetaData.append(OverView);
  } else {
    console.log("None");
  }
};

arrow.addEventListener("click", () => {
  window.history.back();
});

MovieDetails();
