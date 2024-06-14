const spinner = document.getElementById("spinner");
const container = document.getElementById("content");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const counter = document.getElementById("counter");
let Page = 1;
nextBtn.addEventListener("click", () => {
  Page++;
  container.innerHTML = "";

  Trending(Page);
});
prevBtn.addEventListener("click", () => {
  Page--;
  container.innerHTML = "";
  Trending(Page);
});
const baseURL = "https://api.themoviedb.org/3/discover/movie";
const Trending = async (page) => {
  spinner.classList.remove("hidden");
  const response = await axios(baseURL, {
    params: {
      include_adult: "true",
      include_video: "true",
      language: "en-US",
      page: page,
      sort_by: "popularity.desc",
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDdiMTIzMTgyY2ZjM2Y0NTE4MWQ3ZTI4MWY2YjU2NSIsInN1YiI6IjY2MDUzY2E2ZjkwYjE5MDE3Y2E4NThkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IkPfU6wAsJg_gVK-aYVID4SNeJLb5-tazk3aDbxEIjo",
    },
  });
  const data = response.data.results;
  const TotalPages = response.data.total_pages;
  try {
    spinner.classList.add("hidden");
    data.forEach((element) => {
      const MovieContainer = document.createElement("div");
      MovieContainer.addEventListener("click", () => {
        Details(element.id);
      });
      MovieContainer.classList = "movie-container";
      const Poster = document.createElement("img");
      Poster.src = `http://image.tmdb.org/t/p/w500${element.poster_path}`;
      Poster.alt = element.original_title;
      const Title = document.createElement("p");
      Title.textContent = element.original_title;
      container.append(MovieContainer);
      MovieContainer.append(Poster);
      MovieContainer.append(Title);
      counter.textContent = Page;
      if (Page <= 1) {
        prevBtn.classList.add("disabled");
      } else {
        prevBtn.classList.remove("disabled");
      }
      if (Page === TotalPages) {
        nextBtn.classList.add("disabled");
      } else {
        nextBtn.classList.remove("disabled");
      }
    });
  } catch (error) {
    console.warn(error);
  }
};

Trending();

const Details = async (id) => {
  window.location.href = `details.html?id=${id}`;
};
