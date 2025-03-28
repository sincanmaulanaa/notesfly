import {
  getAllArchivedNotes,
  removeNote,
  unarchiveNote,
} from '../data/dataSource';
import Swal from 'sweetalert2';
import './Loading';

class ArchivedNoteList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async render() {
    try {
      this.showLoadingSpinner();
      const notes = await getAllArchivedNotes();
      this.hideLoadingSpinner();
      this.renderNotes(notes);
      this.attachEventListeners();
    } catch (error) {
      console.error('Error rendering archived notes:', error);
      Swal.fire({
        title: 'Failed!',
        text: 'Failed to load archived notes.',
        icon: 'error',
      });
      this.innerHTML = `<div class="empty-state">
        <p>Failed to load archived notes. Please try again later.</p>
      </div>`;
    }
  }

  showLoadingSpinner() {
    this.innerHTML =
      '<loading-spinner fullscreen size="large"></loading-spinner>';
  }

  hideLoadingSpinner() {
    const spinner = this.querySelector('loading-spinner');
    if (spinner) spinner.remove();
  }

  renderNotes(notes) {
    if (notes.length === 0) {
      this.innerHTML = `<div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="21 8 21 21 3 21 3 8"></polyline>
          <rect x="1" y="3" width="22" height="5"></rect>
          <line x1="10" y1="12" x2="14" y2="12"></line>
        </svg>
        <p>No archived notes found</p>
      </div>`;
      return;
    }

    this.innerHTML = notes
      .map((note) => this.createNoteTemplate(note))
      .join('');
  }

  createNoteTemplate(note) {
    const formattedDate = new Date(note.createdAt).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    return `
      <div class="note-item">
        <h2>${note.title}</h2>
        <span>${formattedDate}</span>
        <p>${note.body}</p>
        <div class="action">
          <button type="button" class="btn-unarchive" data-id="${note.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="21 8 21 21 3 21 3 8"></polyline>
              <rect x="1" y="3" width="22" height="5"></rect>
              <line x1="10" y1="12" x2="14" y2="12"></line>
            </svg>
            Unarchive
          </button>
          <button type="button" class="btn-remove" data-id="${note.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Remove
          </button>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    this.querySelectorAll('.btn-unarchive').forEach((button) =>
      button.addEventListener('click', () => this.handleUnarchive(button))
    );

    this.querySelectorAll('.btn-remove').forEach((button) =>
      button.addEventListener('click', () => this.handleRemove(button))
    );
  }

  async handleUnarchive(button) {
    const noteId = button.dataset.id;

    try {
      await unarchiveNote(noteId);
      await Swal.fire({
        title: 'Unarchived!',
        text: 'Your note has been moved back to active notes.',
        icon: 'success',
      });
      this.render();

      const noteListElement = document.querySelector('note-list');
      if (noteListElement && noteListElement.style.display !== 'none') {
        await noteListElement.render();
      }
    } catch (error) {
      Swal.fire({
        title: 'Failed!',
        text: 'Failed to unarchive the note.',
        icon: 'error',
      });
    }
  }

  async handleRemove(button) {
    const noteId = button.dataset.id;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5f6cff',
      cancelButtonColor: '#f56565',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await removeNote(noteId);
        await Swal.fire({
          title: 'Deleted!',
          text: 'Your note has been deleted.',
          icon: 'success',
        });
        this.render();
      } catch (error) {
        Swal.fire({
          title: 'Failed!',
          text: 'Failed to delete the note.',
          icon: 'error',
        });
      }
    }
  }
}

customElements.define('archived-note-list', ArchivedNoteList);
