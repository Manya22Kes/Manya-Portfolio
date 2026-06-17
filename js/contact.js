/* contact.js — Contact form handling */
(function () {
  const form = document.getElementById("contact-form");
  const btnText = document.getElementById("form-btn-text");
  const success = document.getElementById("form-success");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("#cf-name").value.trim();
    const email = form.querySelector("#cf-email").value.trim();
    const message = form.querySelector("#cf-message").value.trim();

    if (!name || !email || !message) return;

    // Simulate send (replace with actual EmailJS / Formspree / API call)
    btnText.textContent = "Sending…";
    form.querySelector('button[type="submit"]').disabled = true;

    await new Promise((r) => setTimeout(r, 1200));

    form.reset();
    btnText.textContent = "Send Message";
    form.querySelector('button[type="submit"]').disabled = false;
    success.hidden = false;

    setTimeout(() => {
      success.hidden = true;
    }, 5000);
  });
})();
