/**
 * A custom HTML element that displays a loading spinner with various styles, sizes, and colors.
 *
 * @class LoadingSpinner
 * @extends {HTMLElement}
 *
 * @example
 * <loading-spinner size="large" color="secondary" type="dots" aria-label="Loading data"></loading-spinner>
 *
 * @attribute {string} size - The size of the spinner. Options: "small", "medium", "large". Default: "medium".
 * @attribute {string} color - The color of the spinner. Options: "primary", "secondary", "white", "gray". Default: "primary".
 * @attribute {string} type - The type of spinner. Options: "circle", "dots", "pulse". Default: "circle".
 * @attribute {string} aria-label - The accessible label for the spinner. Default: "Loading".
 * @attribute {boolean} fullscreen - If present, the spinner will be displayed in fullscreen mode.
 *
 * @property {string} size - The size of the spinner.
 * @property {string} color - The color of the spinner.
 * @property {string} type - The type of spinner.
 * @property {string} label - The accessible label for the spinner.
 * @property {boolean} fullscreen - Whether the spinner is displayed in fullscreen mode.
 *
 * @method connectedCallback - Lifecycle method called when the element is added to the DOM. Initializes attributes and renders the spinner.
 * @method attributeChangedCallback - Lifecycle method called when an observed attribute changes. Updates the spinner accordingly.
 * @method render - Renders the spinner based on the current attributes and properties.
 *
 * @static
 * @method observedAttributes - Returns an array of attributes to observe for changes.
 *
 * @csspart spinner-container - The container for the spinner.
 * @csspart fullscreen-container - The container for the spinner in fullscreen mode.
 * @csspart spinner-circle - The circle spinner element.
 * @csspart spinner-dots - The dots spinner element.
 * @csspart spinner-pulse - The pulse spinner element.
 * @csspart sr-only - The screen-reader-only text element.
 */
class LoadingSpinner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.size = this.getAttribute('size') || 'medium';
    this.color = this.getAttribute('color') || 'primary';
    this.type = this.getAttribute('type') || 'circle';
    this.label = this.getAttribute('aria-label') || 'Loading';
    this.fullscreen = this.hasAttribute('fullscreen');

    this.render();
  }

  static get observedAttributes() {
    return ['size', 'color', 'type', 'aria-label', 'fullscreen'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'fullscreen') {
      this.fullscreen = this.hasAttribute('fullscreen');
    } else if (oldValue !== newValue) {
      this[name] = newValue;
    }
    this.render();
  }

  render() {
    const style = document.createElement('style');
    style.textContent = `
		:host {
		  display: inline-block;
		}
		
		.spinner-container {
		  display: flex;
		  align-items: center;
		  justify-content: center;
		}
		
		.fullscreen-container {
		  position: fixed;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  background-color: rgba(255, 255, 255, 0.8);
		  z-index: 9999;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		}
		
		.dark-theme .fullscreen-container {
		  background-color: rgba(0, 0, 0, 0.7);
		}
		
		.sr-only {
		  position: absolute;
		  width: 1px;
		  height: 1px;
		  padding: 0;
		  margin: -1px;
		  overflow: hidden;
		  clip: rect(0, 0, 0, 0);
		  white-space: nowrap;
		  border-width: 0;
		}
		
		/* Size variations */
		.spinner-small {
		  width: 16px;
		  height: 16px;
		}
		
		.spinner-medium {
		  width: 24px;
		  height: 24px;
		}
		
		.spinner-large {
		  width: 36px;
		  height: 36px;
		}
		
		.fullscreen-container .spinner-medium {
		  width: 48px;
		  height: 48px;
		}
		
		.fullscreen-container .spinner-large {
		  width: 64px;
		  height: 64px;
		}
		
		/* Color variations */
		.color-primary {
		  --spinner-color: var(--primary-color, #5f6cff);
		}
		
		.color-secondary {
		  --spinner-color: var(--secondary-color, #64ecce);
		}
		
		.color-white {
		  --spinner-color: #ffffff;
		}
		
		.color-gray {
		  --spinner-color: #718096;
		}
		
		/* Circle spinner */
		.spinner-circle {
		  border-radius: 50%;
		  border: 2px solid rgba(0, 0, 0, 0.1);
		  border-top-color: var(--spinner-color);
		  animation: spin 0.8s linear infinite;
		}
		
		.dark-theme .spinner-circle {
		  border-color: rgba(255, 255, 255, 0.1);
		  border-top-color: var(--spinner-color);
		}
		
		/* Dots spinner */
		.spinner-dots {
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  gap: 4px;
		}
		
		.spinner-dots .dot {
		  width: 25%;
		  height: 25%;
		  background-color: var(--spinner-color);
		  border-radius: 50%;
		  animation: pulse 1.5s infinite ease-in-out;
		}
		
		.spinner-dots .dot:nth-child(1) {
		  animation-delay: -0.3s;
		}
		
		.spinner-dots .dot:nth-child(2) {
		  animation-delay: -0.15s;
		}
		
		.spinner-dots .dot:nth-child(3) {
		  animation-delay: 0s;
		}
		
		/* Pulse spinner */
		.spinner-pulse {
		  border-radius: 50%;
		  background-color: var(--spinner-color);
		  opacity: 1;
		  animation: pulse-animation 1.2s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
		}
		
		/* Animations */
		@keyframes spin {
		  0% { transform: rotate(0deg); }
		  100% { transform: rotate(360deg); }
		}
		
		@keyframes pulse {
		  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
		  40% { transform: scale(1); opacity: 1; }
		}
		
		@keyframes pulse-animation {
		  0% { transform: scale(0.8); opacity: 0.7; }
		  50% { transform: scale(1); opacity: 1; }
		  100% { transform: scale(0.8); opacity: 0.7; }
		}
	  `;

    let spinnerHTML = '';

    if (this.type === 'circle') {
      spinnerHTML = `<div class="spinner-circle spinner-${this.size} color-${this.color}" role="status"></div>`;
    } else if (this.type === 'dots') {
      spinnerHTML = `
		  <div class="spinner-dots spinner-${this.size} color-${this.color}" role="status">
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
		  </div>
		`;
    } else if (this.type === 'pulse') {
      spinnerHTML = `<div class="spinner-pulse spinner-${this.size} color-${this.color}" role="status"></div>`;
    }

    spinnerHTML += `<span class="sr-only">${this.label}</span>`;

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.className = this.fullscreen
      ? 'fullscreen-container'
      : 'spinner-container';
    wrapper.innerHTML = spinnerHTML;
    this.shadowRoot.appendChild(wrapper);
  }
}

customElements.define('loading-spinner', LoadingSpinner);

class LoadingContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const style = document.createElement('style');
    style.textContent = `
		:host {
		  display: block;
		  width: 100%;
		}
		
		.loading-container {
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  width: 100%;
		  height: 100%;
		  min-height: 200px;
		}
	  `;

    const container = document.createElement('div');
    container.className = 'loading-container';

    const slot = document.createElement('slot');
    container.appendChild(slot);

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);
  }
}

customElements.define('loading-container', LoadingContainer);

export { LoadingSpinner, LoadingContainer };
