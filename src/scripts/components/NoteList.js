import { archiveNote, getAllNotes, removeNote } from '../data/dataSource';
import Swal from 'sweetalert2';
import './Loading';

class NoteList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async render() {
    try {
      this.showLoadingSpinner();
      const notes = await getAllNotes();
      this.hideLoadingSpinner();
      this.renderNotes(notes);
      this.attachEventListeners();
    } catch (error) {
      console.error('Error rendering notes:', error);
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
		  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
		  <p>No active notes found</p>
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
					<button type="button" class="btn-archive" data-id="${note.id}">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="21 8 21 21 3 21 3 8"></polyline>
							<rect x="1" y="3" width="22" height="5"></rect>
							<line x1="10" y1="12" x2="14" y2="12"></line>
						</svg>
						Archive
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
    this.querySelectorAll('.btn-archive').forEach((button) =>
      button.addEventListener('click', () => this.handleArchive(button))
    );

    this.querySelectorAll('.btn-remove').forEach((button) =>
      button.addEventListener('click', () => this.handleRemove(button))
    );
  }

  async handleArchive(button) {
    const noteId = button.dataset.id;
    try {
      await archiveNote(noteId);
      await Swal.fire({
        title: 'Archived!',
        text: 'Your note has been moved to archived notes.',
        icon: 'success',
      });
      this.render();

      const archivedNoteListElement =
        document.querySelector('archived-note-list');
      if (
        archivedNoteListElement &&
        archivedNoteListElement.style.display !== 'none'
      ) {
        await archivedNoteListElement.render();
      }
    } catch (error) {
      Swal.fire({
        title: 'Failed!',
        text: 'Failed to archive the note.',
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

customElements.define('note-list', NoteList);
