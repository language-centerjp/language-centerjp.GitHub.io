document.addEventListener('DOMContentLoaded', () => {
    // Testimonial rotation
    const testimonials = document.querySelectorAll('.testimonial');
    let current = 0;
    
    function rotateTestimonials() {
        testimonials.forEach(t => t.style.display = 'none');
        current = (current + 1) % testimonials.length;
        testimonials[current].style.display = 'block';
    }
    
    if(testimonials.length > 0) {
        setInterval(rotateTestimonials, 5000);
    }
});
