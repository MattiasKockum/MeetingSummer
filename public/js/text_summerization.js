import { globalFileName } from './audio.js';

document.addEventListener("DOMContentLoaded", function () {
    const loadButton = document.getElementById("load-button");
    const textContainer = document.getElementById("text-container");

    loadButton.addEventListener("click", function () {
        console.log("Summing up " + globalFileName)
        // Fetch the text file content from the server
        fetch("/audio/sumup/" + globalFileName)
            .then(response => response.text())
            .then(data => {
                // Display the text content in the text container
                textContainer.textContent = data;
            })
            .catch(error => {
                console.error("Error fetching text file:", error);
            });
    });
});
