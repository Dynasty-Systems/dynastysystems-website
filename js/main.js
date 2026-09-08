// Intercept all links that start with a '#'
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // 1. Stop the browser's default jump (which adds the # to the URL)
    e.preventDefault();

    // 2. Find the exact section the user wants to go to
    const targetId = this.getAttribute("href");

    // 3. Smoothly scroll to that section
    if (targetId !== "#") {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // If the link is just "#" (like your logo pointing to the top), scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
});
