document.addEventListener("DOMContentLoaded", function () {
    const movieForm = document.getElementById("movieForm");
    const recommendationsTable = document.getElementById("recommendationsTable").getElementsByTagName("tbody")[0];

    movieForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const movieName = document.getElementById("movieName").value;
        const rating = document.getElementById("rating").value;
        const action = document.getElementById("action").value;
        
        const newRow = recommendationsTable.insertRow();
        newRow.innerHTML = `
            <td>${movieName}</td>
            <td>${rating}</td>
            <td>${action}</td>
            <td><button class="edit-btn">Edit</button></td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        
        newRow.querySelector(".edit-btn").addEventListener("click", () => editRow(newRow));
        newRow.querySelector(".delete-btn").addEventListener("click", () => deleteRow(newRow));

        movieForm.reset();
    });
        //function to edit the row 
    function editRow(row) {
        const cells = row.getElementsByTagName("td");
        document.getElementById("movieName").value = cells[0].innerText;
        document.getElementById("rating").value = cells[1].innerText;
        document.getElementById("action").value = cells[2].innerText;

        recommendationsTable.deleteRow(row.rowIndex - 1);
    }
        //function to delete the row
    function deleteRow(row) {
        recommendationsTable.deleteRow(row.rowIndex - 1);
    }
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
