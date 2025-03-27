class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer>
	<p>Made with <3 by Sincan Maulana - 2025</p>
</footer>`;
  }
}

customElements.define("app-footer", AppFooter);
