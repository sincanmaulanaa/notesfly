import { getAllNotes } from '../data/dataSource';

class NoteList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  async render() {
    try {
      this.innerHTML = '';
      const notes = await getAllNotes();

      if (notes.length === 0) {
        this.innerHTML = '<p class="empty-message">No notes available.</p>';
        return;
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
		<p>${note.body}</p>
		
		<div class="action">
		  <button type="button" class="btn-archive" data-title="${note.title}">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<polyline points="21 8 21 21 3 21 3 8"></polyline>
			<rect x="1" y="3" width="22" height="5"></rect>
			<line x1="10" y1="12" x2="14" y2="12"></line>
			</svg>
			Archive
		  </button>
		  <button type="button" class="btn-remove" data-title="${note.title}">
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
        button.addEventListener('click', () =>
          console.log(`Removing note: ${button.dataset.title}`)
        )
      );
    } catch (error) {
      console.error('Error rendering notes:', error);
    }
  }
}

customElements.define('note-list', NoteList);
