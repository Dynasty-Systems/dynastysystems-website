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

/* =========================================
   FORM SUBMISSION ENGINE (AJAX)
   ========================================= */
const contactForm = document.querySelector('.corporate-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        // 1. Stop the browser from refreshing the page
        e.preventDefault();

        // 2. Grab the submit button so we can change its text
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const originalBtnText = submitBtn.textContent;
        
        // 3. Give the user visual feedback that it is working
        submitBtn.textContent = '[ SENDING... ]';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // 4. Package the form data
        const data = new FormData(contactForm);

        try {
            // 5. Send the data silently to Formspree
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success! Clear the form and show a success message
                contactForm.reset();
                submitBtn.textContent = 'INQUIRY SENT SUCCESSFULLY';
                submitBtn.style.backgroundColor = '#00d2b4'; /* Dynasty Teal */
                submitBtn.style.color = '#091319'; /* Dark Navy */
                submitBtn.style.opacity = '1';
                
                // Reset the button back to normal after 5 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.style.backgroundColor = ''; // Reverts to CSS default
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 5000);
            } else {
                // Formspree rejected it
                submitBtn.textContent = 'ERROR. PLEASE TRY AGAIN.';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        } catch (error) {
            // Network error
            submitBtn.textContent = 'NETWORK ERROR. TRY AGAIN.';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}