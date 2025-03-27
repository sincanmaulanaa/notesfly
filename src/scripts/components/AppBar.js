class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initializeElements();
    this.addEventListeners();
    this.loadSavedPreferences();
  }

  render() {
    this.innerHTML = `
			<div class="app-bar-container">
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
				<div class="app-bar-actions desktop-actions">
					${this.getDesktopActionsTemplate()}
				</div>
				<button class="hamburger-menu" id="hamburger-menu" aria-label="Menu">
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>
			${this.getMobileMenuTemplate()}
		`;
  }

  getDesktopActionsTemplate() {
    return `
			<button class="theme-toggle" id="theme-toggle-desktop" title="Toggle dark mode">
				${this.getThemeToggleIcons()}
			</button>
			<button class="view-toggle" id="view-toggle-desktop" title="Toggle view">
				${this.getViewToggleIcon()}
			</button>
			<div class="search-container">
				<svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
				<input type="text" id="search-notes-desktop" placeholder="Search...">
			</div>
		`;
  }

  getMobileMenuTemplate() {
    return `
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
								${this.getThemeToggleIcons()}
								<span>Toggle Theme</span>
							</button>
							<button class="mobile-menu-button" id="view-toggle-mobile">
								${this.getViewToggleIcon()}
								<span>Toggle View</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		`;
  }

  getThemeToggleIcons() {
    return `
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
		`;
  }

  getViewToggleIcon() {
    return `
			<svg class="grid-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<rect x="3" y="3" width="7" height="7"></rect>
				<rect x="14" y="3" width="7" height="7"></rect>
				<rect x="14" y="14" width="7" height="7"></rect>
				<rect x="3" y="14" width="7" height="7"></rect>
			</svg>
		`;
  }

  initializeElements() {
    this.hamburgerMenu = this.querySelector("#hamburger-menu");
    this.mobileMenuOverlay = this.querySelector("#mobile-menu-overlay");
    this.closeMenu = this.querySelector("#close-menu");
    this.themeToggleDesktop = this.querySelector("#theme-toggle-desktop");
    this.themeToggleMobile = this.querySelector("#theme-toggle-mobile");
    this.viewToggleDesktop = this.querySelector("#view-toggle-desktop");
    this.viewToggleMobile = this.querySelector("#view-toggle-mobile");
    this.searchInputDesktop = this.querySelector("#search-notes-desktop");
    this.searchInputMobile = this.querySelector("#search-notes-mobile");
  }

  addEventListeners() {
    this.hamburgerMenu.addEventListener(
      "click",
      this.openMobileMenu.bind(this),
    );
    this.closeMenu.addEventListener("click", this.closeMobileMenu.bind(this));
    this.mobileMenuOverlay.addEventListener(
      "click",
      this.handleOverlayClick.bind(this),
    );
    this.themeToggleDesktop.addEventListener(
      "click",
      this.toggleTheme.bind(this),
    );
    this.themeToggleMobile.addEventListener(
      "click",
      this.toggleTheme.bind(this),
    );
    this.viewToggleDesktop.addEventListener(
      "click",
      this.toggleView.bind(this),
    );
    this.viewToggleMobile.addEventListener("click", this.toggleView.bind(this));
    this.searchInputDesktop.addEventListener(
      "input",
      this.handleSearch.bind(this),
    );
    this.searchInputMobile.addEventListener(
      "input",
      this.handleSearch.bind(this),
    );
  }

  openMobileMenu() {
    this.mobileMenuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeMobileMenu() {
    this.mobileMenuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  handleOverlayClick(e) {
    if (e.target === this.mobileMenuOverlay) {
      this.closeMobileMenu();
    }
  }

  toggleTheme() {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-theme") ? "dark" : "light",
    );
  }

  toggleView() {
    const noteList = document.querySelector("note-list");
    noteList.classList.toggle("list-view");
    localStorage.setItem(
      "view",
      noteList.classList.contains("list-view") ? "list" : "grid",
    );
  }

  handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    if (e.target === this.searchInputDesktop) {
      this.searchInputMobile.value = searchTerm;
    } else {
      this.searchInputDesktop.value = searchTerm;
    }

    const noteItems = document.querySelectorAll("note-item");
    noteItems.forEach((item) => {
      const title = item.getAttribute("title").toLowerCase();
      const body = item.getAttribute("body").toLowerCase();
      item.style.display =
        title.includes(searchTerm) || body.includes(searchTerm) ? "" : "none";
    });
  }

  loadSavedPreferences() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }

    const savedView = localStorage.getItem("view");
    if (savedView === "list") {
      document.querySelector("note-list").classList.add("list-view");
    }
  }
}

customElements.define("app-bar", AppBar);
