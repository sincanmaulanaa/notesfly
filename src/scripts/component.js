class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` <div class="app-bar-container">
        <div class="app-bar-left">
          <div class="app-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <line x1="10" y1="9" x2="8" y2="9"></line>
            </svg>
          </div>
          <h1>notesfly</h1>
        </div>
        
        <!-- Desktop Actions -->
        <div class="app-bar-actions desktop-actions">
          <button class="theme-toggle" id="theme-toggle-desktop" title="Toggle dark mode">
            <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
          
          <button class="view-toggle" id="view-toggle-desktop" title="Toggle view">
            <svg class="grid-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          
          <div class="search-container">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="search-notes-desktop" placeholder="Search...">
          </div>
        </div>
        
        <!-- Mobile Hamburger Menu -->
        <button class="hamburger-menu" id="hamburger-menu" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu-overlay" id="mobile-menu-overlay">
        <div class="mobile-menu">
          <div class="mobile-menu-header">
            <h2>notesfly</h2>
            <button class="close-menu" id="close-menu" aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="mobile-menu-content">
            <div class="mobile-search-container">
              <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="search-notes-mobile" placeholder="Search notes...">
            </div>
            
            <div class="mobile-menu-actions">
              <button class="mobile-menu-button" id="theme-toggle-mobile">
                <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span>Toggle Theme</span>
              </button>
              
              <button class="mobile-menu-button" id="view-toggle-mobile">
                <svg class="grid-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Toggle View</span>
              </button>
            </div>
          </div>
        </div>
      </div>`;

    const hamburgerMenu = this.querySelector('#hamburger-menu');
    const mobileMenuOverlay = this.querySelector('#mobile-menu-overlay');
    const closeMenu = this.querySelector('#close-menu');

    const themeToggleDesktop = this.querySelector('#theme-toggle-desktop');
    const themeToggleMobile = this.querySelector('#theme-toggle-mobile');

    const viewToggleDesktop = this.querySelector('#view-toggle-desktop');
    const viewToggleMobile = this.querySelector('#view-toggle-mobile');

    const searchInputDesktop = this.querySelector('#search-notes-desktop');
    const searchInputMobile = this.querySelector('#search-notes-mobile');

    hamburgerMenu.addEventListener('click', () => {
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    closeMenu.addEventListener('click', () => {
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    });

    // Close menu when clicking outside
    mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Theme toggle functionality (both desktop and mobile)
    const toggleTheme = () => {
      document.body.classList.toggle('dark-theme');
      localStorage.setItem(
        'theme',
        document.body.classList.contains('dark-theme') ? 'dark' : 'light'
      );
    };

    themeToggleDesktop.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);

    // View toggle functionality (both desktop and mobile)
    const toggleView = () => {
      const noteList = document.querySelector('note-list');
      noteList.classList.toggle('list-view');
      localStorage.setItem(
        'view',
        noteList.classList.contains('list-view') ? 'list' : 'grid'
      );
    };

    viewToggleDesktop.addEventListener('click', toggleView);
    viewToggleMobile.addEventListener('click', toggleView);

    const handleSearch = (e) => {
      const searchTerm = e.target.value.toLowerCase();

      // Sync search inputs
      if (e.target === searchInputDesktop) {
        searchInputMobile.value = searchTerm;
      } else {
        searchInputDesktop.value = searchTerm;
      }

      // Filter notes
      const noteItems = document.querySelectorAll('note-item');
      noteItems.forEach((item) => {
        const title = item.getAttribute('title').toLowerCase();
        const body = item.getAttribute('body').toLowerCase();

        if (title.includes(searchTerm) || body.includes(searchTerm)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    };

    searchInputDesktop.addEventListener('input', handleSearch);
    searchInputMobile.addEventListener('input', handleSearch);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }

    const savedView = localStorage.getItem('view');
    if (savedView === 'list') {
      document.querySelector('note-list').classList.add('list-view');
    }
  }
}

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="note-form">
        <div class="form-group">
          <input type="text" id="title" placeholder="Title" required>
          <div class="validation-message" id="title-validation"></div>
        </div>
        
        <div class="form-group">
          <textarea id="body" placeholder="Body" required></textarea>
          <div class="validation-message" id="body-validation"></div>
        </div>
        
        <button type="submit" disabled>Add Note</button>
      </form>
    `;

    const form = this.querySelector('#note-form');
    const titleInput = this.querySelector('#title');
    const bodyInput = this.querySelector('#body');
    const button = this.querySelector('button');
    const titleValidation = this.querySelector('#title-validation');
    const bodyValidation = this.querySelector('#body-validation');

    const validateTitle = (value) => {
      if (!value) {
        return { valid: false, message: 'Title is required' };
      } else if (value.length < 3) {
        return { valid: false, message: 'Title must be at least 3 characters' };
      } else if (value.length > 50) {
        return {
          valid: false,
          message: 'Title must be less than 50 characters',
        };
      }
      return { valid: true, message: 'Title looks good!' };
    };

    const validateBody = (value) => {
      if (!value) {
        return { valid: false, message: 'Body is required' };
      } else if (value.length < 10) {
        return { valid: false, message: 'Body must be at least 10 characters' };
      } else if (value.length > 500) {
        return {
          valid: false,
          message: 'Body must be less than 500 characters',
        };
      }
      return { valid: true, message: 'Body looks good!' };
    };

    titleInput.addEventListener('input', () => {
      const result = validateTitle(titleInput.value);
      titleValidation.textContent = result.message;
      titleValidation.className = `validation-message ${
        result.valid ? 'valid' : 'invalid'
      }`;
      updateButtonState();
    });

    bodyInput.addEventListener('input', () => {
      const result = validateBody(bodyInput.value);
      bodyValidation.textContent = result.message;
      bodyValidation.className = `validation-message ${
        result.valid ? 'valid' : 'invalid'
      }`;
      updateButtonState();
    });

    const updateButtonState = () => {
      const titleResult = validateTitle(titleInput.value);
      const bodyResult = validateBody(bodyInput.value);
      button.disabled = !(titleResult.valid && bodyResult.valid);
    };

    if (titleInput.value) {
      const result = validateTitle(titleInput.value);
      titleValidation.textContent = result.message;
      titleValidation.className = `validation-message ${
        result.valid ? 'valid' : 'invalid'
      }`;
    }

    if (bodyInput.value) {
      const result = validateBody(bodyInput.value);
      bodyValidation.textContent = result.message;
      bodyValidation.className = `validation-message ${
        result.valid ? 'valid' : 'invalid'
      }`;
    }

    // form.addEventListener('input', () => {
    //   button.disabled = !(titleInput.value && bodyInput.value);
    // });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const titleResult = validateTitle(titleInput.value);
      const bodyResult = validateBody(bodyInput.value);

      if (titleResult.valid && bodyResult.valid) {
        const newNote = {
          title: titleInput.value,
          body: bodyInput.value,
        };
        notes.push(newNote);
        document.querySelector('note-list').render();

        // Reset form
        titleInput.value = '';
        bodyInput.value = '';
        titleValidation.textContent = '';
        bodyValidation.textContent = '';
        titleValidation.className = 'validation-message';
        bodyValidation.className = 'validation-message';
        button.disabled = true;
      }
    });
  }
}

class NoteList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = notes
      .map(
        (note) => `
      <note-item title="${note.title}" body="${note.body}"></note-item>
    `
      )
      .join('');
  }
}

class NoteItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h2>${this.getAttribute('title')}</h2>
      <p>${this.getAttribute('body')}</p>
    `;
  }
}

customElements.define('app-bar', AppBar);
customElements.define('note-form', NoteForm);
customElements.define('note-list', NoteList);
customElements.define('note-item', NoteItem);
