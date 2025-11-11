
document.querySelectorAll('.policy-nav-link, .nav-section-btn').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            document.querySelectorAll('.policy-nav-link').forEach(l => l.classList.remove('active', 'text-blue-600', 'bg-white', 'shadow-sm'));
            document.querySelectorAll('.policy-nav-link').forEach(l => l.classList.add('text-gray-600'));

            const correspondingNavLink = document.querySelector(`.policy-nav-link[href="#${targetId}"]`);
            if (correspondingNavLink) {
                correspondingNavLink.classList.remove('text-gray-600');
                correspondingNavLink.classList.add('active', 'text-blue-600', 'bg-white', 'shadow-sm');
            }

            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.policy-section');
    const navLinks = document.querySelectorAll('.policy-nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active', 'text-blue-600', 'bg-white', 'shadow-sm');
        link.classList.add('text-gray-600');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.remove('text-gray-600');
            link.classList.add('active', 'text-blue-600', 'bg-white', 'shadow-sm');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.policy-section');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';

        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});
