const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const moiveBox = document.querySelector("#movie-box");
const searchInput = document.querySelector("#search-input");
const navSearch = document.querySelector(".nav-search");
const searchButton = document.querySelector("#search-button");
const deleteIcon = document.querySelector("#del-icon");
const loadingSpinner = document.querySelector("#loading-spinner"); // Loading spinner element

const getMovies = async (url) => {
    showLoading(); // Show loading spinner
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    hideLoading(); // Hide loading spinner
    showMovies(data);
};

const showLoading = () => {
    loadingSpinner.classList.remove("hidden");
    moiveBox.classList.add("hidden");
};

const hideLoading = () => {
    loadingSpinner.classList.add("hidden");
    moiveBox.classList.remove("hidden");
};

getMovies(APIURL);

const showMovies = (data) => {
    moiveBox.innerHTML = "";
    // Check if results are empty
    if (data.results.length === 0) {
        // Display "not found" message and image
        moiveBox.innerHTML = `
                <div class="flex flex-col border-2 p-4 rounded-md bg-white/90 items-center justify-center text-center">
                    <img src="https://placehold.co/400x300/31343C/EEE?font=lora&text=Movie+Not+Found" alt="No results found" class="w-96 h-auto mb-4 rounded-md" />
                    <h2 class="text-2xl text-black font-bold mb-2">Movie Not Found</h2>
                    <p class="text-lg text-black">Try searching with a different keyword.</p>
                </div>
            `;
        return;
    }

    moiveBox.classList.add("grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4", "xl:grid-cols-5", "gap-6", "max-md:px-14", "px-10");

    data.results.forEach((result) => {
        const imagePath = result.poster_path === null ? "https://placehold.co/181x256/EEE/31343C?font=lora&text=Image+Not+Found" : IMGPATH + result.poster_path;
        const box = document.createElement("div");
        box.classList.add("box", "cursor-pointer", "bg-white/60", "text-black", "p-4", "rounded-lg");

        box.innerHTML = `
            <img alt="${result.original_title} Poster" class="movie-banner w-full h-64 rounded-lg mb-4" 
                 src="${imagePath}" />
            <h3 class="movie-title line-clamp-1 hover:line-clamp-none text-base font-bold">${result.original_title}</h3>
            <p class="mt-2  text-sm text-pretty font-semibold"><span class="text-base font-bold">Release Date: </span> ${result.release_date}</p>
            <p class="mt-2 line-clamp-3 hover:line-clamp-none movie-sub-title text-sm text-pretty">${result.overview}</p>
        `;

        moiveBox.appendChild(box);
    });
};

const performSearch = () => {
    const query = searchInput.value.trim();
    if (query) {
        getMovies(SEARCHAPI + query);
    } else {
        getMovies(APIURL);
    }
};

navSearch.addEventListener("click", () => {
    searchInput.focus();
})


// Event listeners for search functionality
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        performSearch();
    }
});
searchButton.addEventListener("click", performSearch);

// Event listener for delete icon click
deleteIcon.addEventListener("click", () => {
    searchInput.value = "";
    getMovies(APIURL);
});







// Function to get the user's name from local storage or ask for it if not set
function getUserName() {
    let name = localStorage.getItem("userName");
    if (!name) {
        name = prompt("Please Enter Your First Name:\n\nNOTE: If You Want To Change Your Name Again, Click The Pen Icon.");
        if (name) {
            localStorage.setItem("userName", name); // Save name in local storage
            updateGreeting(name); // Update the greeting
        }
    } else {
        updateGreeting(name);
    }
}

// Function to update the greeting text
function updateGreeting(name) {
    document.getElementById("greeting").textContent = ` ${name}!`;
}

// Event listener to open prompt when clicking the button
document.getElementById("enter-name").addEventListener("click", () => {
    const name = prompt("Please Re Enter Your Name:");
    if (name) {
        localStorage.setItem("userName", name); // Save name in local storage
        updateGreeting(name); // Update the greeting
    }
});



// Initial setup to check and display the stored name on page load
getUserName();

// Auto-hide the entire refresh note after 5 seconds with a fade-out effect
setTimeout(() => {
    const refreshNote = document.getElementById("refresh-note");
    refreshNote.classList.add("fade-out", "hidden"); // Apply the fade-out class to hide entire element
}, 10000);

// Ensure the refresh note is fully visible when the page loads
window.addEventListener("load", () => {
    const refreshNote = document.getElementById("refresh-note");
    refreshNote.classList.remove("fade-out"); // Ensure visibility on load
});
