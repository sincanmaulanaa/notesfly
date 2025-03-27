import { createNote } from '../data/dataSource';

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initializeElements();
    this.attachEventListeners();
    this.initializeValidation();
  }

  render() {
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
  }

  initializeElements() {
    this.form = this.querySelector('#note-form');
    this.titleInput = this.querySelector('#title');
    this.bodyInput = this.querySelector('#body');
    this.button = this.querySelector('button');
    this.titleValidation = this.querySelector('#title-validation');
    this.bodyValidation = this.querySelector('#body-validation');
  }

  attachEventListeners() {
    this.titleInput.addEventListener('input', () =>
      this.handleInputValidation('title')
    );
    this.bodyInput.addEventListener('input', () =>
      this.handleInputValidation('body')
    );
    this.form.addEventListener('submit', (event) => this.handleSubmit(event));
  }

  initializeValidation() {
    if (this.titleInput.value) {
      this.validateAndDisplayMessage('title', this.titleInput.value);
    }
    if (this.bodyInput.value) {
      this.validateAndDisplayMessage('body', this.bodyInput.value);
    }
    this.updateButtonState();
  }

  validateTitle(value) {
    if (!value) return { valid: false, message: 'Title is required' };
    if (value.length < 3)
      return { valid: false, message: 'Title must be at least 3 characters' };
    if (value.length > 50)
      return { valid: false, message: 'Title must be less than 50 characters' };
    return { valid: true, message: 'Title looks good!' };
  }

  validateBody(value) {
    if (!value) return { valid: false, message: 'Body is required' };
    if (value.length < 10)
      return { valid: false, message: 'Body must be at least 10 characters' };
    if (value.length > 500)
      return { valid: false, message: 'Body must be less than 500 characters' };
    return { valid: true, message: 'Body looks good!' };
  }

  validateAndDisplayMessage(field, value) {
    const validationResult =
      field === 'title' ? this.validateTitle(value) : this.validateBody(value);
    const validationElement =
      field === 'title' ? this.titleValidation : this.bodyValidation;

    validationElement.textContent = validationResult.message;
    validationElement.className = `validation-message ${
      validationResult.valid ? 'valid' : 'invalid'
    }`;
  }

  handleInputValidation(field) {
    const value =
      field === 'title' ? this.titleInput.value : this.bodyInput.value;
    this.validateAndDisplayMessage(field, value);
    this.updateButtonState();
  }

  updateButtonState() {
    const isTitleValid = this.validateTitle(this.titleInput.value).valid;
    const isBodyValid = this.validateBody(this.bodyInput.value).valid;
    this.button.disabled = !(isTitleValid && isBodyValid);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const isTitleValid = this.validateTitle(this.titleInput.value).valid;
    const isBodyValid = this.validateBody(this.bodyInput.value).valid;

    if (isTitleValid && isBodyValid) {
      const newNote = {
        title: this.titleInput.value,
        body: this.bodyInput.value,
      };

      try {
        await createNote(newNote);
        this.resetForm();
        const noteListElement = document.querySelector('note-list');
        if (noteListElement) {
          await noteListElement.render();
        }
      } catch (error) {
        this.displayErrorMessage('Failed to create note. Please try again.');
      }
    }
  }

  resetForm() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
    this.titleValidation.textContent = '';
    this.bodyValidation.textContent = '';
    this.titleValidation.className = 'validation-message';
    this.bodyValidation.className = 'validation-message';
    this.button.disabled = true;
  }

  displayErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    this.form.appendChild(errorMessage);

    setTimeout(() => {
      if (errorMessage.parentNode) {
        errorMessage.parentNode.removeChild(errorMessage);
      }
    }, 3000);
  }
}

customElements.define('note-form', NoteForm);
