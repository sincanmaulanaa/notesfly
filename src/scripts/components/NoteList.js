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
        const emptyMessage = document.createElement('p');
        emptyMessage.classList.add('empty-message');
        emptyMessage.innerText = 'No notes available.';
        this.appendChild(emptyMessage);
        return;
      }

      notes.forEach((note) => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');

        const titleElement = document.createElement('h2');
        titleElement.innerText = note.title;

        const bodyElement = document.createElement('p');
        bodyElement.innerText = note.body;

        const archivedButtonElement = document.createElement('button');
        archivedButtonElement.setAttribute('type', 'button');
        archivedButtonElement.classList.add('btn-archive');
        archivedButtonElement.innerText = 'Archive';
        archivedButtonElement.addEventListener('click', () => {
          console.log(`Archiving note: ${note.title}`);
        });

        const removeButtonElement = document.createElement('button');
        removeButtonElement.setAttribute('type', 'button');
        removeButtonElement.classList.add('btn-remove');
        removeButtonElement.innerText = 'Remove';
        removeButtonElement.addEventListener('click', () => {
          console.log(`Removing note: ${note.title}`);
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('action');
        buttonContainer.append(archivedButtonElement, removeButtonElement);

        noteItem.append(titleElement, bodyElement, buttonContainer);
        this.appendChild(noteItem);
      });
    } catch (error) {
      console.error('Error rendering notes:', error);
    }
  }
}

customElements.define('note-list', NoteList);
