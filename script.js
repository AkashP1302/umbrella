// Color Object
const colorStyles = {
  // Define color styles
  pink: {
    backgroundColor: "#FFB6C13D",
    buttonClass: "btnStyle",
    btnBackgroundColor: "pink",
  },
  blue: {
    backgroundColor: "#F0F8FF",
    buttonClass: "btnStyle",
    btnBackgroundColor: "#088cfff3",
  },
  yellow: {
    backgroundColor: "#FFFFE0",
    buttonClass: "btnStyle",
    btnBackgroundColor: "#ffff42",
  },
  // Add more colors and their styles here
};

// Function to change the image and apply color styles
function changeImage(fileName, color) {
  const img = document.querySelector("#imgChange");
  img.setAttribute("src", fileName);

  const body = document.body;
  const uploadBtn = document.getElementById("uploadBtn");
  const loaderWrapper = document.getElementById("loaderWrapper");

  if (colorStyles[color]) {
    const style = colorStyles[color];
    // Apply color styles
    body.style.backgroundColor = style.backgroundColor;
    uploadBtn.style.backgroundColor = colorStyles[color].btnBackgroundColor;
    uploadBtn.className = style.buttonClass;

    // Show the loader after umbrella color change
    loaderWrapper.style.display = "flex";
    umbrellaImg.style.opacity = "0";

    // Adjust the loader position
    if (loaderWrapper.style.display === "flex") {
      loaderWrapper.style.marginLeft = "150px";
      loaderWrapper.style.marginRight = "-220px";
    }

    setTimeout(function () {
      loaderWrapper.style.display = "none"; // Hide the loader wrapper
      umbrellaImg.style.opacity = "1"; // Restore the opacity of the umbrella image
    }, 2000);
  } else {
    // Apply default color styles
    body.style.backgroundColor = "#F0F8FF";
    uploadBtn.className = "btnStyle";
  }
}

// Creating color buttons
function createColorButtons() {
  const buttonContainer = document.getElementById("buttonContainer");

  for (const color in colorStyles) {
    if (colorStyles.hasOwnProperty(color)) {
      const button = document.createElement("button");
      button.className = `color-swatch ${colorStyles[color].buttonClass}`;
      button.style.backgroundColor = colorStyles[color].btnBackgroundColor;
      button.addEventListener("click", () => {
        changeImage(`images/${color} umbrella.png`, color);
      });
      buttonContainer.appendChild(button);
    }
  }
}

// Create color buttons on page load
window.addEventListener("load", createColorButtons);

let umbrellaImg = document.getElementById("imgChange");
let loaderImg = document.getElementById("loaderImg");
let logoImg = document.getElementById("logoImg");

// Function to handle logo upload
function uploadLogo() {
  let fileInput = document.getElementById("logoFileInput");
  fileInput.accept = ".png, .jpg";
  fileInput.setAttribute("max-size", 5 * 1024 * 1024); // 5MB in bytes
  fileInput.click();

  fileInput.onchange = function () {
    let logoFile = fileInput.files[0];
    if (logoFile) {
      if (logoFile.type == "image/png" || logoFile.type == "image/jpeg") {
        if (logoFile.size <= 5 * 1024 * 1024) {
          // check file size condition
          let fileReader = new FileReader();

          // Show loader when user uploads logo
          umbrellaImg.style.display = "none";
          loaderImg.style.display = "block";

          fileReader.onloadstart = function () {
            // Adjust the loader position
            loaderWrapper.style.marginLeft = "-20px";
            loaderWrapper.style.marginRight = "100px";
            loaderWrapper.style.display = "flex"; // Show the loader wrapper
            umbrellaImg.style.opacity = "0.5"; // Decrease the opacity of the umbrella image
          };

          fileReader.onload = function (event) {
            logoImg.style.display = "block"; // Show the logo image
            logoImg.setAttribute("src", event.target.result);

            setTimeout(function () {
              loaderWrapper.style.display = "none"; // Hide the loader wrapper
              umbrellaImg.style.display = "block";
              umbrellaImg.style.opacity = "1"; // Restore the opacity of the umbrella image
            }, 2000);
          };

          // Show filename on Upload logo button
          let uploadBtn = document.getElementById("uploadBtn");
          let fileName = logoFile.name;
          let label = document.createElement("label");
          label.innerHTML = fileName;
          let span = document.createElement("span");
          span.className = "btnImg";
          let img = document.createElement("img");
          img.src = "images/upload_icon.svg";
          span.appendChild(img);
          uploadBtn.innerHTML = "";
          uploadBtn.appendChild(span);
          uploadBtn.appendChild(label);

          fileReader.readAsDataURL(logoFile);
        } else {
          alert("File size exceeds 5MB");
        }
      } else {
        alert("Invalid file type. Please select a PNG or JPEG file.");
      }
    }
  };
}

// Hide the loader on page load
window.addEventListener("load", function () {
  loaderWrapper.style.display = "none";
});

// Handle logo upload on change
let logoFileInput = document.getElementById("logoFileInput");
let fileReader = new FileReader();

logoFileInput.onchange = function () {
  let logoFile = logoFileInput.files[0];
  if (logoFile) {
    fileReader.readAsDataURL(logoFile);
  }
};
