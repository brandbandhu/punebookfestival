// Pune Book Festival Website - Main JavaScript
// Navigation, Filters, Gallery, WhatsApp Integration, and Interactive Components

// Sample data for timetable
const timetableData = [
  {
    id: 1,
    title: "Opening Ceremony",
    speaker: "Chief Guest",
    time: "09:00",
    date: "2024-02-15",
    venue: "Main Auditorium",
    language: "English",
    track: "Ceremony",
    description: "Grand opening of Pune Book Festival 2024"
  },
  {
    id: 2,
    title: "Children's Storytelling Session",
    speaker: "Priya Sharma",
    time: "10:30",
    date: "2024-02-15",
    venue: "Kids Corner",
    language: "Hindi",
    track: "Children",
    description: "Interactive storytelling for children aged 5-12"
  },
  {
    id: 3,
    title: "Marathi Literature Panel",
    speaker: "Dr. Rajesh Kulkarni, Sunita Deshpande",
    time: "14:00",
    date: "2024-02-15",
    venue: "Hall B",
    language: "Marathi",
    track: "Panel",
    description: "Discussion on contemporary Marathi literature"
  },
  {
    id: 4,
    title: "Poetry Workshop",
    speaker: "Amit Verma",
    time: "11:00",
    date: "2024-02-16",
    venue: "Workshop Room 1",
    language: "English",
    track: "Workshop",
    description: "Learn the art of poetry writing"
  },
  {
    id: 5,
    title: "Book Launch: 'Pune Chronicles'",
    speaker: "Author Meera Joshi",
    time: "16:00",
    date: "2024-02-16",
    venue: "Main Auditorium",
    language: "English",
    track: "Launch",
    description: "Launch of the latest book about Pune's history"
  }
];

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "#MyBookMyStory Campaign",
    excerpt: "Share your reading journey and win exciting prizes. Tell us about the book that changed your life.",
    date: "2024-01-15",
    image: "assets/pune book festival images/10.webp",
    category: "Campaign"
  },
  {
    id: 2,
    title: "शांतता, पुणेकर वाचत आहेत",
    excerpt: "A beautiful initiative encouraging reading culture in Pune. Join thousands of Puneites in this reading movement.",
    date: "2024-01-20",
    image: "assets/pune book festival images/12.webp",
    category: "Initiative"
  },
  {
    id: 3,
    title: "Meet the Authors: Festival Lineup",
    excerpt: "Get to know the amazing authors who will be joining us at the festival. From bestselling novelists to emerging poets.",
    date: "2024-01-25",
    image: "assets/pune book festival images/7.webp",
    category: "Authors"
  },
  {
    id: 4,
    title: "V-Blogs: Stories in Motion",
    excerpt: "Discover our video blog series featuring book reviews, author interviews, and reading recommendations.",
    date: "2024-01-30",
    image: "assets/pune book festival images/19.webp",
    category: "V-Blog"
  }
];

// Gallery images data
const galleryImages = [
  { src: "assets/pune book festival images/6.webp", alt: "Festival grounds from above" },
  { src: "assets/pune book festival images/1.webp", alt: "Children's storytelling session" },
  { src: "assets/pune book festival images/7.webp", alt: "Author book signing event" },
  { src: "assets/pune book festival images/5.webp", alt: "Poetry workshop in progress" },
  { src: "assets/pune book festival images/3.webp", alt: "Book festival venue" },
  { src: "assets/pune book festival images/8.webp", alt: "Festival audience" }
];

// Gallery videos data
const galleryVideos = [
  { id: "dQw4w9WgXcQ", title: "Festival Highlights 2023", thumbnail: "assets/pune book festival images/6.webp" },
  { id: "dQw4w9WgXcQ", title: "Author Interview Series", thumbnail: "assets/pune book festival images/7.webp" },
  { id: "dQw4w9WgXcQ", title: "Children's Corner Activities", thumbnail: "assets/pune book festival images/1.webp" },
  { id: "dQw4w9WgXcQ", title: "V-Blog: Book Recommendations", thumbnail: "assets/pune book festival images/5.webp" }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeWhatsAppFloat();
  
  // Initialize page-specific functionality
  const currentPage = getCurrentPage();
  switch(currentPage) {
    case 'index':
      initializeHomePage();
      break;
    case 'timetable':
      initializeTimetable();
      break;
    case 'gallery':
      initializeGallery();
      break;
    case 'blogs':
      initializeBlogs();
      break;
    case 'contact':
      initializeContact();
      break;
  }
});

// Registration modal controls (used across pages)
function openRegistrationModal() {
  const modal = document.getElementById('registrationModal');
  if (!modal) return;

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeRegistrationModal() {
  const modal = document.getElementById('registrationModal');
  if (!modal) return;

  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function submitRegistration(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log('Registration Data:', data);

  alert('🎉 Registration successful! Welcome to Pune Book Festival 2025.');
  closeRegistrationModal();
  form.reset();
}

// Get current page name
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop().replace('.html', '') || 'index';
  return page;
}

// Navigation functionality
function initializeNavigation() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Update aria-expanded for accessibility
      const isExpanded = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', function(e) {
      if (e.target.closest('a.nav-link, a.dropdown-item')) {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Handle dropdown functionality for mobile
  const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const menu = item.querySelector('.dropdown-menu');
    
    if (link && menu) {
      link.addEventListener('click', function(e) {
        // On mobile, toggle dropdown instead of following link
        if (window.innerWidth <= 768) {
          e.preventDefault();
          menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
      });
    }
  });
}

// WhatsApp floating button
function initializeWhatsAppFloat() {
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function(e) {
      e.preventDefault();
      const message = encodeURIComponent('Hi Pune Book Festival, please share details.');
      const whatsappUrl = `https://wa.me/919999999999?text=${message}`;
      window.open(whatsappUrl, '_blank');
    });
  }
}

// Home page functionality
function initializeHomePage() {
  loadLatestUpdates();
  initializeCounters();
  initializeCarousel();
}

// Load latest blog updates on home page
function loadLatestUpdates() {
  const updatesContainer = document.querySelector('.updates-grid');
  if (!updatesContainer) return;
  
  const latestPosts = blogPosts.slice(0, 3);
  updatesContainer.innerHTML = latestPosts.map(post => `
    <div class="card">
      <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 200px; object-fit: cover;">
      <div class="card-body">
        <div class="badge badge-new">${post.category}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
          <small style="color: var(--gray-600);">${formatDate(post.date)}</small>
          <a href="blogs.html#post-${post.id}" class="btn btn-outline btn-sm">Read More</a>
        </div>
      </div>
    </div>
  `).join('');
}

// Initialize counters animation
function initializeCounters() {
  const counters = document.querySelectorAll('.counter-number');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current).toLocaleString();
    }, 16);
  };
  
  // Intersection Observer for counter animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });
  
  counters.forEach(counter => observer.observe(counter));
}

// Timetable functionality
function initializeTimetable() {
  renderTimetable(timetableData);
  initializeTimetableFilters();
  initializeTimetableSearch();
}

// Render timetable
function renderTimetable(data) {
  const container = document.querySelector('.timetable-grid');
  if (!container) return;
  
  container.innerHTML = data.map(session => `
    <div class="card timetable-session" data-day="${session.date}" data-venue="${session.venue}" data-track="${session.track}" data-language="${session.language}">
      <div class="card-body">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
          <div>
            <div class="badge badge-${getTrackBadgeClass(session.track)}">${session.track}</div>
            <div style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--gray-600);">
              ${formatTime(session.time)} • ${session.venue}
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--gray-500);">
            ${session.language}
          </div>
        </div>
        
        <h3 style="margin-bottom: 0.5rem;">${session.title}</h3>
        <p style="color: var(--gray-600); margin-bottom: 1rem;">${session.speaker}</p>
        <p style="font-size: 0.875rem; margin-bottom: 1rem;">${session.description}</p>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="addToCalendar(${session.id})">
            📅 Add to Calendar
          </button>
          <button class="btn btn-wa btn-sm" onclick="shareToWhatsApp(${session.id})">
            Share
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Get badge class for track
function getTrackBadgeClass(track) {
  const classes = {
    'Workshop': 'workshop',
    'Children': 'kids',
    'Panel': 'new',
    'Launch': 'new',
    'Ceremony': 'new'
  };
  return classes[track] || 'new';
}

// Initialize timetable filters
function initializeTimetableFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Apply filter
      const filterType = this.getAttribute('data-filter-type');
      const filterValue = this.getAttribute('data-filter-value');
      applyTimetableFilter(filterType, filterValue);
      
      // Update URL
      updateFilterURL(filterType, filterValue);
    });
  });
}

// Apply timetable filter
function applyTimetableFilter(type, value) {
  const sessions = document.querySelectorAll('.timetable-session');
  
  sessions.forEach(session => {
    if (value === 'all') {
      session.style.display = 'block';
    } else {
      const sessionValue = session.getAttribute(`data-${type}`);
      session.style.display = sessionValue === value ? 'block' : 'none';
    }
  });
}

// Initialize timetable search
function initializeTimetableSearch() {
  const searchInput = document.querySelector('.timetable-search');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const sessions = document.querySelectorAll('.timetable-session');
    
    sessions.forEach(session => {
      const title = session.querySelector('h3').textContent.toLowerCase();
      const speaker = session.querySelector('p').textContent.toLowerCase();
      const isMatch = title.includes(query) || speaker.includes(query);
      session.style.display = isMatch ? 'block' : 'none';
    });
  });
}

// Add to calendar functionality
function addToCalendar(sessionId) {
  const session = timetableData.find(s => s.id === sessionId);
  if (!session) return;
  
  const startDate = new Date(`${session.date}T${session.time}:00`);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration
  
  const icsContent = generateICS(session, startDate, endDate);
  downloadICS(icsContent, `${session.title.replace(/\s+/g, '_')}.ics`);
}

// Generate ICS content
function generateICS(session, startDate, endDate) {
  const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Pune Book Festival//Event//EN
BEGIN:VEVENT
UID:${session.id}@punebookfestival.org
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${session.title}
DESCRIPTION:${session.description}\\n\\nSpeaker: ${session.speaker}\\nLanguage: ${session.language}
LOCATION:${session.venue}, Fergusson College, Pune
END:VEVENT
END:VCALENDAR`;
}

// Download ICS file
function downloadICS(content, filename) {
  const blob = new Blob([content], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Share to WhatsApp
function shareToWhatsApp(sessionId) {
  const session = timetableData.find(s => s.id === sessionId);
  if (!session) return;
  
  const message = `🎭 *${session.title}*\n\n📅 ${formatDate(session.date)}\n⏰ ${formatTime(session.time)}\n📍 ${session.venue}\n👤 ${session.speaker}\n\n${session.description}\n\n#PuneBookFestival`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

// Gallery functionality
function initializeGallery() {
  initializeGalleryTabs();
  renderGalleryPhotos();
  renderGalleryVideos();
  initializeLightbox();
}

// Initialize gallery tabs
function initializeGalleryTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Update active states
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      this.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

// Render gallery photos
function renderGalleryPhotos() {
  const container = document.querySelector('.photos-grid');
  if (!container) return;
  
  container.innerHTML = galleryImages.map((image, index) => `
    <div class="gallery-item" onclick="openLightbox(${index}, 'photo')">
      <img src="${image.src}" alt="${image.alt}" loading="lazy">
      <div class="gallery-overlay">
        <span>🔍</span>
      </div>
    </div>
  `).join('');
}

// Render gallery videos
function renderGalleryVideos() {
  const container = document.querySelector('.videos-grid');
  if (!container) return;
  
  container.innerHTML = galleryVideos.map((video, index) => `
    <div class="gallery-item video-item" onclick="openLightbox(${index}, 'video')">
      <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
      <div class="gallery-overlay">
        <span>▶️</span>
      </div>
      <div class="video-title">${video.title}</div>
    </div>
  `).join('');
}

// Initialize lightbox
function initializeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  
  // Close lightbox on background click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Close lightbox on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// Open lightbox
function openLightbox(index, type) {
  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  
  if (type === 'photo') {
    const image = galleryImages[index];
    lightboxContent.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" style="max-width: 100%; max-height: 100%;">
    `;
  } else if (type === 'video') {
    const video = galleryVideos[index];
    lightboxContent.innerHTML = `
      <iframe width="800" height="450" src="https://www.youtube.com/embed/${video.id}" 
              frameborder="0" allowfullscreen style="max-width: 100%; max-height: 100%;"></iframe>
    `;
  }
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Blog functionality
function initializeBlogs() {
  renderBlogPosts();
}

// Render blog posts
function renderBlogPosts() {
  const container = document.querySelector('.blogs-grid');
  if (!container) return;
  
  container.innerHTML = blogPosts.map(post => `
    <div class="card" id="post-${post.id}">
      <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 250px; object-fit: cover;">
      <div class="card-body">
        <div class="badge badge-new">${post.category}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
          <small style="color: var(--gray-600);">${formatDate(post.date)}</small>
          <button class="btn btn-primary btn-sm" onclick="openBlogModal(${post.id})">Read More</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Open blog modal
function openBlogModal(postId) {
  const post = blogPosts.find(p => p.id === postId);
  if (!post) return;
  
  // Create modal if it doesn't exist
  let modal = document.querySelector('.blog-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'lightbox blog-modal';
    modal.innerHTML = `
      <div class="lightbox-content" style="max-width: 800px; background: white; padding: 2rem; border-radius: 1rem;">
        <button class="lightbox-close" onclick="closeBlogModal()">&times;</button>
        <div class="blog-modal-content"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  const modalContent = modal.querySelector('.blog-modal-content');
  modalContent.innerHTML = `
    <div class="badge badge-new">${post.category}</div>
    <h2>${post.title}</h2>
    <p style="color: var(--gray-600); margin-bottom: 1rem;">${formatDate(post.date)}</p>
    <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem;">
    <p>${post.excerpt}</p>
    <p>This is where the full blog content would appear. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close blog modal
function closeBlogModal() {
  const modal = document.querySelector('.blog-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Contact page functionality
function initializeContact() {
  initializeNewsletterForm();
  initializeContactForm();
}

// Initialize newsletter form
function initializeNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = form.querySelector('input[type="email"]').value;
    if (validateEmail(email)) {
      showToast('Thank you for subscribing to our newsletter!', 'success');
      form.reset();
    } else {
      showToast('Please enter a valid email address.', 'error');
    }
  });
}

// Initialize contact form
function initializeContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (name && validateEmail(email) && message) {
      showToast('Thank you for your message! We will get back to you soon.', 'success');
      form.reset();
    } else {
      showToast('Please fill in all fields correctly.', 'error');
    }
  });
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const time = new Date();
  time.setHours(parseInt(hours), parseInt(minutes));
  return time.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function updateFilterURL(type, value) {
  const url = new URL(window.location);
  url.searchParams.set(type, value);
  window.history.pushState({}, '', url);
}

function showToast(message, type = 'success') {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create new toast
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// New Auto Carousel functionality
let currentSlide = 0;
const totalSlides = 4;
let autoCarouselInterval;

function initializeCarousel() {
  const carousel = document.querySelector('.auto-carousel');
  if (!carousel) return;
  
  // Start auto-rotation
  startAutoCarousel();
  
  // Add dot click handlers
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });
  
  // Pause on hover
  carousel.addEventListener('mouseenter', pauseAutoCarousel);
  carousel.addEventListener('mouseleave', startAutoCarousel);
}

function startAutoCarousel() {
  clearInterval(autoCarouselInterval);
  autoCarouselInterval = setInterval(() => {
    nextSlide();
  }, 4000); // Change slide every 4 seconds
}

function pauseAutoCarousel() {
  clearInterval(autoCarouselInterval);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlideDisplay();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateSlideDisplay();
  
  // Restart auto-rotation
  startAutoCarousel();
}

function updateSlideDisplay() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  
  // Update slides
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

