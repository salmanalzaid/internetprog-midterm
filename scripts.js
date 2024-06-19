// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("movieForm"); // Get the form element
    const table = document
        .getElementById("recommendationsTable")
        .getElementsByTagName("tbody")[0]; // Get the table body

    // Function to add a movie recommendation to the table
    function addMovieToTable(movieName, rating, action) {
        // Create a new row in the table
        const newRow = table.insertRow();

        // Create cells and append data
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.textContent = movieName;
        cell2.textContent = rating;
        cell3.textContent = action;
    }
    function deleteData(button) {

        // Get the parent row of the clicked button
        let row = button.parentNode.parentNode;

        // Remove the row from the table
        row.parentNode.removeChild(row);
    }

    // Load movie recommendations from local storage
    function loadMoviesFromStorage() {
        const movies = JSON.parse(localStorage.getItem("movies")) || []; // Retrieve movies from local storage

        // Loop through each movie and add it to the table
        movies.forEach((movie) => {
            addMovieToTable(movie.movieName, movie.rating, movie.action);
        });
    }

    // Add pre-filled movies to the table
    addMovieToTable("The Shawshank Redemption", "9.3", "Drama");
    addMovieToTable("Inception", "8.8", "Action");

    // Load movies from local storage
    loadMoviesFromStorage();

    // Add event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get the form data
        const movieName = document.getElementById("movieName").value;
        const rating = document.getElementById("rating").value;
        const action = document.getElementById("action").value;

        // Add the movie to the table
        addMovieToTable(movieName, rating, action);

        // Save the movie to local storage
        const movies = JSON.parse(localStorage.getItem("movies")) || []; // Retrieve movies from local storage
        movies.push({ movieName, rating, action }); // Add the new movie
        localStorage.setItem("movies", JSON.stringify(movies)); // Save movies back to local storage

        // Clear the form after submission
        form.reset();
    });
});

let currentIndex = 0;
let autoPlayInterval;

document.addEventListener("DOMContentLoaded", () => {
    autoPlayVideos();
});

function showVideo(index) {
    const carousel = document.querySelector(".carousel");
    const videos = document.querySelectorAll(".carousel-video");
    const totalVideos = videos.length;

    if (index >= totalVideos) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalVideos - 1;
    } else {
        currentIndex = index;
    }

    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    videos[currentIndex].play();
    for (let i = 0; i < videos.length; i++) {
        if (i !== currentIndex) {
            videos[i].pause();
        }
    }
}

function nextVideo() {
    showVideo(currentIndex + 1);
}

function prevVideo() {
    showVideo(currentIndex - 1);
}

function autoPlayVideos() {
    autoPlayInterval = setInterval(() => {
        nextVideo();
    }, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}
