document.addEventListener('DOMContentLoaded', () => {
    /* --------------------------------------
       Mobile Menu Toggle
    -------------------------------------- */
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-links');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    /* --------------------------------------
       Smooth Scrolling for Anchor Links
    -------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                // Close mobile menu after clicking a link
                if (navMenu) navMenu.classList.remove('show');

                const headerOffset = 75;
                const elementPosition =
                    target.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --------------------------------------
       Newsletter Form (front-end only)
    -------------------------------------- */
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', e => {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');

            if (emailInput && emailInput.value.trim() !== '') {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }

    /* --------------------------------------
       Impact Chart (Monthly Testing Overview)
    -------------------------------------- */
    const canvas = document.getElementById('testingChart');

    // Only run if the canvas exists AND Chart.js is loaded
    if (canvas && window.Chart) {
        const ctx = canvas.getContext('2d');

        const rows = document.querySelectorAll('#impact-table tbody tr');

        const labels = [];
        const testedData = [];
        const negativeData = [];
        const positiveData = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');

            const month = cells[0].textContent.trim();
            const tested = parseInt(cells[1].textContent.trim(), 10);
            const negative = parseInt(cells[2].textContent.trim(), 10);
            const positive = parseInt(cells[3].textContent.trim(), 10);
            const state = cells[4].textContent.trim();

            // Label example: "December 2025 - Ogun"
            labels.push(`${month} - ${state}`);
            testedData.push(tested);
            negativeData.push(negative);
            positiveData.push(positive);
        });

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'People Tested',
                        data: testedData,
                        backgroundColor: 'rgba(46, 139, 87, 0.7)'
                    },
                    {
                        label: 'HIV Negative',
                        data: negativeData,
                        backgroundColor: 'rgba(60, 179, 113, 0.7)'
                    },
                    {
                        label: 'HIV Positive',
                        data: positiveData,
                        backgroundColor: 'rgba(220, 20, 60, 0.7)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // uses the 320px height from CSS
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of People'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Month / State'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
    } else {
        console.warn('testingChart canvas not found or Chart.js not loaded');
    }
});
