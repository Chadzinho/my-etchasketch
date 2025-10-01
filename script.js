console.log("JavaScript is connected!");

const container = document.getElementById("container");
const gridSizeBtn = document.getElementById("grid-size-btn");
const colorModeBtn = document.getElementById("color-mode-btn");
const resetBtn = document.getElementById("reset-btn");

let rainbowEnabled = true;

// I want a 16x16 grid
// So that will be 256 total squares
// The container is 960x960
// So each square should be 960px / 16 = 60x60px

function calculateContainerSize() {
    const headerHeight = document.querySelector(".header").offsetHeight;
    const bodyPadding = 40;
    const containerMargin = 40;
    const borderWidth = 4;

    const availableHeight =
        window.innerHeight - headerHeight - bodyPadding - containerMargin;
    const availableWidth = window.innerWidth - bodyPadding - containerMargin;

    const containerSize = Math.min(availableHeight, availableWidth, 800);

    return Math.floor(containerSize);
}

function createGrid(size) {
    const containerSize = calculateContainerSize();
    const squareSize = containerSize / size;

    container.style.width = `${containerSize}px`;
    container.style.height = `${containerSize}px`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        square.addEventListener("mouseenter", () => {
            if (rainbowEnabled) {
                const red = Math.floor(Math.random() * 256);
                const green = Math.floor(Math.random() * 256);
                const blue = Math.floor(Math.random() * 256);
                square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            } else {
                square.style.backgroundColor = "#333";
            }
        });

        container.appendChild(square);
    }

    console.log(`Created ${size}x${size} grid with ${size * size} squares`);
}

function clearGrid() {
    container.innerHTML = "";
}

function changeGridSize() {
    let newSize = prompt("Enter number of squares per side (max 100)");

    newSize = parseInt(newSize);

    if (newSize && newSize > 0 && newSize <= 100) {
        clearGrid();
        createGrid(newSize);
    } else {
        alert("Please enter a valid number between 1 and 100");
    }
}

function toggleColorMode() {
    rainbowEnabled = !rainbowEnabled;

    if (rainbowEnabled) {
        colorModeBtn.textContent = "Rainbow: ON";
    } else {
        colorModeBtn.textContent = "Rainbow: OFF";
    }

    console.log("Color mode:", rainbowEnabled ? "Rainbow" : "Black");
}

function resetGrid() {
    const squares = document.querySelectorAll(".grid-square");
    squares.forEach((square) => {
        square.style.backgroundColor = "white";
    });
    console.log("Grid cleared");
}

gridSizeBtn.addEventListener("click", changeGridSize);
colorModeBtn.addEventListener("click", toggleColorMode);
resetBtn.addEventListener("click", resetGrid);

createGrid(16);
