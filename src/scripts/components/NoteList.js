import { getAllNotes, removeNote } from '../data/dataSource';
import Swal from 'sweetalert2';
import './Loading';

class NoteList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async render() {
    try {
      const noteListElement = document.querySelector('note-list');
      this.innerHTML =
        '<loading-spinner fullscreen size="large"></loading-spinner>';
      const spinner = this.querySelector('loading-spinner');

      const notes = await getAllNotes();

      if (spinner) {
        spinner.remove();
      }

      this.innerHTML = notes
        .map((note) => {
          const formattedDate = new Date(note.createdAt).toLocaleDateString(
            'id-ID',
            {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }
          );
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
        })
        .join('');

      this.querySelectorAll('.btn-archive').forEach((button) =>
        button.addEventListener('click', () =>
          console.log(`Archiving note: ${button.dataset.title}`)
        )
      );

      this.querySelectorAll('.btn-remove').forEach((button) =>
        button.addEventListener('click', async () => {
          const noteId = button.dataset.id;
          console.log(noteId);

          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5f6cff',
            cancelButtonColor: '#f56565',
            confirmButtonText: 'Yes, delete it!',
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await removeNote(noteId);
                Swal.fire({
                  title: 'Deleted!',
                  text: 'Your file has been deleted.',
                  icon: 'success',
                });
                if (noteListElement) {
                  await noteListElement.render();
                }
              } catch (error) {
                Swal.fire({
                  title: 'Failed!',
                  text: 'Failed to delete the note.',
                  icon: 'error',
                });
              }
            }
          });
        })
      );
    } catch (error) {
      console.log('Error rendering notes:', error);
    }
  }
}

customElements.define('note-list', NoteList);
