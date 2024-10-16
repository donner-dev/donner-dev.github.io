/* DOM ELEMENTS */

const body = document.body;
/* NAV BTN */
let nav = document.querySelector("#nav");
let navbtn = document.querySelector(".nav-btn");



const topButton = document.querySelector('.top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) { // Adjust the scroll position as needed
    topButton.style.display = 'block';
  } else {
    topButton.style.display = 'none';
  }
});

topButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});






/* =========== =    THEME TOGGLE HANDLER     =  ============== */


const storedTheme = localStorage.getItem('theme');
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
let theme;
if (storedTheme){ /* check for saved theme in localStorage*/
    theme = storedTheme;
    console.log("Theme found in localStorage: ",theme);
} else if (prefersDarkMode.matches) { /* check if user prefers dark */
  console.log("User prefers dark mode");  theme = "dark";
} else {
  console.log("User prefers light mode");   theme = "light";
}

document.body.setAttribute("data-theme", theme);   /* apply initial theme */

/*MANUAL LIGHT SWITCHER */
const lightswitcher = document.getElementById('switcher');
lightswitcher.checked = theme === "dark";

lightswitcher.addEventListener("change", (ev) => {
    const newTheme = ev.target.checked ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem('theme', newTheme);

    console.log(`Theme set to ${newTheme.toUpperCase()}`);
});                                         







/* =========== =     MOUSE STUFF     =  ============== */



        /* IDEA!! I could use these event listeners to:
        when a BOX is ACTIVE, fetch the coordinates of where the cursor is 
        and make the BOX glow reflect that somehow? 
        
        -But wouldnt that take up a lot of resources?
    

        -well, yeah, but wouldnt it be COOL!?

                  (later) https://codepen.io/jh3y/pen/QWYPaax turns out it exists and it found you, blessed by the universe
        */


/* ANOTHER IDEA: If i end up having a grid background,
        wouldnt it be cool if the  grid distorted where the mouse moved?
        (but how the fuck could i do that, right?) (maybe learn to distort real things first, like divs. tha'd be interestiing)
        -and wouldnt it take up a lot of resources?
        -yeah, but wouldnt it be cool!???

*/


const circleElement = document.querySelector('.circle');

// objects to track mouse position and custom cursor position
const mouse = { x: 0, y: 0 };
const previousMouse = { x: 0, y: 0 } 
const circle = { x: 0, y: 0 }; 
let currentScale = 0;
let currentAngle = 0; 

// Update mouse position on the 'mousemove' event
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
const speed = 0.33;

// Start animation
const tick = () => {
  // MOVE
  // Calculate circle movement based on mouse position and smoothing
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;
  // Create a transformation string for cursor translation
  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  // SQUEEZE
  // 1. Calculate the change in mouse position (deltaMouse)
  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;
  // Update previous mouse position for the next frame
  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;
  // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
  const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150); 
  // 3. Convert mouse velocity to a value in the range [0, 0.5]
  const scaleValue = (mouseVelocity / 150) * 0.5;
  // 4. Smoothly update the current scale
  currentScale += (scaleValue - currentScale) * speed;
  // 5. Create a transformation string for scaling
  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

  // ROTATE
  // 1. Calculate the angle using the atan2 function
  const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
  // 2. Check for a threshold to reduce shakiness at low mouse velocity
  if (mouseVelocity > 20) {
    currentAngle = angle;
  }
  // 3. Create a transformation string for rotation
  const rotateTransform = `rotate(${currentAngle}deg)`;

  // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
  circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

  // Request the next frame to continue the animation
  window.requestAnimationFrame(tick);
}

// Start the animation loop
tick();

































window.addEventListener("DOMContentLoaded", function() {
  


}); 



function loadContent(section, isSubfolder = false){
    const baseUrl = "/"; 

    // Construct the file path based on isSubfolder
    let filePath;
    if (isSubfolder) {
        filePath = `${baseUrl}${section}/${section}.html`;
    } else {
        filePath = `${baseUrl}${section}.html`;
    }   
     // Fetch the content using fetch API
    fetch(filePath)

     .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })

     .then(html => {// Update content container with fetched HTML
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
      contentContainer.innerHTML = html;
    } else {
      console.error("Content container element with ID 'content-container' not found.");
    }
  })

     .catch(error => {
    console.error('Error fetching content:', error);
  });



}

/* loadcontent end */



/* other scripts? */





































