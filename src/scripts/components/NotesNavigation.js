class NotesNavigation extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initializeElements();
    this.attachEventListeners();
    this.loadActiveTab();
  }

  render() {
    this.innerHTML = `
		<div class="notes-navigation">
		  <button class="nav-tab active" data-tab="active">Active Notes</button>
		  <button class="nav-tab" data-tab="archived">Archived Notes</button>
		</div>
	  `;
  }

  initializeElements() {
    this.tabs = this.querySelectorAll('.nav-tab');
    this.activeNotesTab = this.querySelector('[data-tab="active"]');
    this.archivedNotesTab = this.querySelector('[data-tab="archived"]');

    this.noteListElement = document.querySelector('note-list');
    this.archivedNoteListElement = document.querySelector('archived-note-list');

    if (this.archivedNoteListElement) {
      this.archivedNoteListElement.style.display = 'none';
    }
  }

  attachEventListeners() {
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });
  }

  switchTab(tabName) {
    this.tabs.forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    if (tabName === 'active') {
      this.noteListElement.style.display = '';
      this.archivedNoteListElement.style.display = 'none';

      this.noteListElement.render();
    } else {
      this.noteListElement.style.display = 'none';
      this.archivedNoteListElement.style.display = '';

      this.archivedNoteListElement.render();
    }

    localStorage.setItem('activeNotesTab', tabName);
  }

  loadActiveTab() {
    const savedTab = localStorage.getItem('activeNotesTab');
    if (savedTab) {
      this.switchTab(savedTab);
    }
  }
}

customElements.define('notes-navigation', NotesNavigation);
