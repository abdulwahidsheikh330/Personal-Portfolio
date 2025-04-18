document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null, // The viewport is the root
        threshold: 0.2, // Trigger when 20% of the element is visible
    };

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the reveal class to the element
                entry.target.classList.add("reveal");

                // Remove the hidden class to ensure it remains visible
                entry.target.classList.remove("hidden");

                // Stop observing the element for performance
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealOnScroll, observerOptions);

    // Target all elements with the "hidden" class
    const elementsToReveal = document.querySelectorAll(".hidden");
    elementsToReveal.forEach(element => observer.observe(element));
});




document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        threshold: 0.2,
    };

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealOnScroll, observerOptions);

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach(element => observer.observe(element));
});



// testimonials js starts 

// Isolated pointer tracking for testimonials
const useTestimonialPointerGlow = () => {
    const syncPointer = ({ x: pointerX, y: pointerY }) => {
        const x = pointerX.toFixed(2);
        const y = pointerY.toFixed(2);
        const xp = (pointerX / window.innerWidth).toFixed(2);
        const yp = (pointerY / window.innerHeight).toFixed(2);
        
        document.documentElement.style.setProperty('--testimonial-x', x);
        document.documentElement.style.setProperty('--testimonial-xp', xp);
        document.documential-style.setProperty('--testimonial-y', y);
        document.documentElement.style.setProperty('--testimonial-yp', yp);
    };
    
    // Use a specific container to avoid conflicts
    const testimonialSection = document.querySelector('.testimonial-section');
    testimonialSection.addEventListener('pointermove', syncPointer);
    return () => testimonialSection.removeEventListener('pointermove', syncPointer);
};

const createTestimonialCard = (testimonial) => {
    const card = document.createElement('article');
    card.className = 'testimonial-card';
    card.setAttribute('data-testimonial-glow', '');
    
    card.innerHTML = `
        <div class="profile-image">
            <img src="${testimonial.image}" alt="${testimonial.name}">
        </div>
        <div class="testimonial-content">
            <h3 class="client-name">${testimonial.name}</h3>
            <p class="client-designation">${testimonial.designation}</p>
            <p class="client-review">${testimonial.review}</p>
            <button class="learn-more-btn" data-testimonial-glow>
                <span>Learn More</span>
            </button>
        </div>
        <span data-testimonial-glow></span>
    `;
    
    return card;
};

// Initialize only when testimonial section exists
const initializeTestimonials = () => {
    const testimonialSection = document.querySelector('.testimonial-section');
    if (!testimonialSection) return;
    
    useTestimonialPointerGlow();
    
    const grid = document.getElementById('testimonialGrid');
    
    TESTIMONIALS.forEach(testimonial => {
        const card = createTestimonialCard(testimonial);
        grid.appendChild(card);
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTestimonials);




const usePointerGlow = () => {
    const syncPointer = ({ x: pointerX, y: pointerY }) => {
        const x = pointerX.toFixed(2);
        const y = pointerY.toFixed(2);
        const xp = (pointerX / window.innerWidth).toFixed(2);
        const yp = (pointerY / window.innerHeight).toFixed(2);
        
        document.documentElement.style.setProperty('--x', x);
        document.documentElement.style.setProperty('--xp', xp);
        document.documentElement.style.setProperty('--y', y);
        document.documentElement.style.setProperty('--yp', yp);
    };
    
    document.body.addEventListener('pointermove', syncPointer);
    return () => document.body.removeEventListener('pointermove', syncPointer);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    usePointerGlow();
});
// testimonials js ends 


// projects js starts

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Quote request submitted successfully!");
    document.querySelector("#quoteModal").classList.remove("show");
    document.querySelector("form").reset();
});

// document.getElementById('show-more-btn').addEventListener('click', function() {
//     document.querySelectorAll('.hidden-projects').forEach(function(project) {
//       project.classList.remove('d-none');
//     });
//     this.style.display = 'none';
//   });

document.getElementById('show-more-btn').addEventListener('click', function() {
    document.querySelectorAll('#hidden-projects').forEach(function(project) {
      project.classList.remove('d-none');
    });
    this.style.display = 'none';
  });
// projects js ends 



  
let cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", function(dets) {
    cursor.style.left = dets.x + "px";
    cursor.style.top = dets.y + "px";
});

document.addEventListener("mouseleave", function() {
    cursor.style.display = "none" ;
});

document.addEventListener("mouseenter", function() {
    cursor.style.display = "block";
});
  

//   contact js ends