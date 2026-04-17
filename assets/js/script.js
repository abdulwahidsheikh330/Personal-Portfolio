// ========== SCROLL REVEAL ==========
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                entry.target.classList.remove("hidden");
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.2 });

    document.querySelectorAll(".hidden").forEach(el => observer.observe(el));
});


// ========== POINTER GLOW ==========
const usePointerGlow = () => {
    const sync = ({ x, y }) => {
        document.documentElement.style.setProperty('--x', x.toFixed(2));
        document.documentElement.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        document.documentElement.style.setProperty('--y', y.toFixed(2));
        document.documentElement.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
    };
    document.body.addEventListener('pointermove', sync);
};
document.addEventListener('DOMContentLoaded', usePointerGlow);


// ========== SHOW MORE PROJECTS ==========
document.getElementById('show-more-btn').addEventListener('click', function () {
    document.querySelectorAll('#hidden-projects').forEach(p => p.classList.remove('d-none'));
    this.style.display = 'none';
});


// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.x + "px";
    cursor.style.top = e.y + "px";
});
document.addEventListener("mouseleave", () => cursor.style.display = "none");
document.addEventListener("mouseenter", () => cursor.style.display = "block");


// ==========================================================
//  EMAILJS — EMAIL INTEGRATION
//
//  SETUP STEPS (one-time, takes ~5 minutes):
//
//  1. Sign up FREE at https://www.emailjs.com
//  2. Add an Email Service → connect your Gmail account
//     → copy the Service ID  (looks like: service_xxxxxxx)
//  3. Create an Email Template for Contact messages:
//     Variables to use in the template body:
//       {{from_name}}  {{from_email}}  {{subject}}  {{message}}
//     → copy the Template ID (looks like: template_xxxxxxx)
//  4. Create a second Email Template for Quote requests:
//     Variables to use in the template body:
//       {{from_name}}  {{from_email}}  {{phone}}
//       {{project_type}}  {{budget}}  {{timeline}}  {{details}}
//     → copy the Template ID
//  5. Go to Account → General → copy your Public Key
//  6. Paste all four values below and save.
// ==========================================================

const EMAILJS_PUBLIC_KEY = 'NTFd5sZk59X4xZt6s';        // ⚠️ Paste your Public Key here (Account → General)

const EMAILJS_SERVICE_ID = 'service_2ufznhq';
const EMAILJS_CONTACT_TPL = 'template_3ia1vfy';       // "Contact Us" template
const EMAILJS_QUOTE_TPL = 'template_aw3siwp';       // "My Default Template" (Quote)

emailjs.init(EMAILJS_PUBLIC_KEY);


// ---- Shared helpers ----
function setLoading(btnId, normalId, loadingId, isLoading) {
    document.getElementById(btnId).disabled = isLoading;
    document.getElementById(normalId).classList.toggle('d-none', isLoading);
    document.getElementById(loadingId).classList.toggle('d-none', !isLoading);
}

function showFeedback(successId, errorId, isSuccess) {
    document.getElementById(successId).classList.toggle('d-none', !isSuccess);
    document.getElementById(errorId).classList.toggle('d-none', isSuccess);
    setTimeout(() => {
        document.getElementById(successId).classList.add('d-none');
        document.getElementById(errorId).classList.add('d-none');
    }, 7000);
}


// ========== CONTACT FORM ==========
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    setLoading('contactSubmitBtn', 'contactSubmitText', 'contactLoadingText', true);

    const params = {
        from_name: document.getElementById('nameC').value.trim(),
        from_email: document.getElementById('emailC').value.trim(),
        subject: document.getElementById('subjectC').value.trim(),
        message: document.getElementById('messageC').value.trim(),
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TPL, params)
        .then(() => {
            setLoading('contactSubmitBtn', 'contactSubmitText', 'contactLoadingText', false);
            showFeedback('contactSuccessMsg', 'contactErrorMsg', true);
            this.reset();
        })
        .catch((err) => {
            console.error('Contact form error:', err);
            setLoading('contactSubmitBtn', 'contactSubmitText', 'contactLoadingText', false);
            showFeedback('contactSuccessMsg', 'contactErrorMsg', false);
        });
});


// ========== QUOTE FORM ==========
document.getElementById('quoteForm').addEventListener('submit', function (e) {
    e.preventDefault();

    setLoading('quoteSubmitBtn', 'quoteSubmitText', 'quoteLoadingText', true);

    const params = {
        from_name: document.getElementById('quoteName').value.trim(),
        from_email: document.getElementById('quoteEmail').value.trim(),
        phone: document.getElementById('quotePhone').value.trim() || 'Not provided',
        project_type: document.getElementById('quoteProjectType').value || 'Not specified',
        budget: document.getElementById('quoteBudget').value || 'Not specified',
        timeline: document.getElementById('quoteTimeline').value || 'Not specified',
        details: document.getElementById('quoteDetails').value.trim(),
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_QUOTE_TPL, params)
        .then(() => {
            setLoading('quoteSubmitBtn', 'quoteSubmitText', 'quoteLoadingText', false);
            showFeedback('quoteSuccessMsg', 'quoteErrorMsg', true);
            this.reset();
        })
        .catch((err) => {
            console.error('Quote form error:', err);
            setLoading('quoteSubmitBtn', 'quoteSubmitText', 'quoteLoadingText', false);
            showFeedback('quoteSuccessMsg', 'quoteErrorMsg', false);
        });
});
