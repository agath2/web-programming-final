
document.getElementById('menu-toggle').addEventListener('click', function () {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('weightGraph').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Keep the dataset small
          datasets: [{
              label: 'Pet Weight (kg)',
              data: [5, 5.5, 6, 6.2, 6.5], // Small dataset
              borderColor: '#814439',
              backgroundColor: 'rgba(129, 68, 57, 0.2)',
              borderWidth: 2,
              tension: 0.4 // Smooth the line
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: true, // Ensure it respects the CSS size
          plugins: {
              legend: {
                  display: true,
                  position: 'top'
              }
          },
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Month'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Weight (kg)'
                  },
                  beginAtZero: true
              }
          }
      }
  });
});