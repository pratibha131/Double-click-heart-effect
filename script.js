const imageGrid = document.querySelector("#image-grid");
const numImages = 100000; // Number of images to generate

async function addRandomImages(num) {
  for (let i = 0; i < num; i++) {
    try {
      const response = await axios.get("https://source.unsplash.com/random/300x440");
      const imageUrl = response.request.responseURL;

      const imageCard = document.createElement("div");
      imageCard.className =
        "relative rounded-2xl bg-cover bg-center cursor-pointer overflow-hidden shadow-lg h-72 w-full";
      imageCard.style.backgroundImage = `url('${imageUrl}')`;

      // Create a span to display the double-click count
      const countDisplay = document.createElement("span");
      countDisplay.className = "absolute top-2 left-2 text-white"; // Positioned top-left with white text
      countDisplay.textContent = 0; // Initial count is zero

      imageCard.appendChild(countDisplay); // Add the count display to the image card

      // Variable to count double-clicks for this image card
      let doubleClickCount = 0;

      imageCard.addEventListener("dblclick", (e) => {
        doubleClickCount++; // Increment the counter for this image card
        countDisplay.textContent = doubleClickCount; // Update the display with the new count

        const heart = document.createElement("i");
        heart.className =
          "fas fa-heart text-red-500 absolute transform -translate-x-1/2 -translate-y-1/2 heart-animation";

        const { pageX, pageY } = e; // Coordinates of the double-click
        const { top, left } = imageCard.getBoundingClientRect(); // Position relative to the viewport

        const xInside = pageX - left;
        const yInside = pageY - top;

        heart.style.left = `${xInside}px`;
        heart.style.top = `${yInside}px`;

        imageCard.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 600); // Time for the animation
      });

      imageGrid.appendChild(imageCard); // Add the image card to the grid
    } catch (error) {
      console.error("Error fetching random image:", error);
    }
  }
}

addRandomImages(numImages); // Generate the random images
