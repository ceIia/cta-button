import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("cta-button")
export class CTAButton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .cta-btn {
      font-size: 1rem;
      padding: 12px 24px;
      cursor: pointer;
      border: none;
      border-radius: 3px;
      color: var(--text-color);
      background-color: var(--background-color);
      border: 1px solid var(--background-color);

      transition-property: transform color background-color;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
    }
    .cta-btn:hover {
      color: var(--hover-text-color);
      background-color: var(--hover-background-color);
    }
    .cta-btn:active {
      transform: scale(0.98);
    }
  `;

  @property({ type: String }) textColor = "#eef2ff";
  @property({ type: String }) backgroundColor = "#6366f1";
  @property({ type: String }) hoverTextColor = "#6366f1";
  @property({ type: String }) hoverBackgroundColor = "#eef2ff";
  @property({ type: String }) requestUrl = "https://dummyjson.com/http/200";
  @property({ type: String }) successMessage = "Request successful!";
  @property({ type: String }) errorMessage = "Request failed!";

  render() {
    return html`
      <button class="cta-btn" @click=${this._onClick}>
        <slot name="label">Click me!</slot>
      </button>
    `;
  }

  updated(changedProperties) {
    this.style.setProperty("--text-color", this.textColor);
    this.style.setProperty("--background-color", this.backgroundColor);
    this.style.setProperty("--hover-text-color", this.hoverTextColor);
    this.style.setProperty(
      "--hover-background-color",
      this.hoverBackgroundColor
    );
  }

  private _onClick() {
    fetch(this.requestUrl)
      .then((response) => {
        if (response.status === 200) {
          alert(this.successMessage);
        } else {
          alert(this.errorMessage);
        }
      })
      .catch(() => {
        alert(this.errorMessage);
      });
  }

  get _slottedChildren() {
    const slot = this.shadowRoot.querySelector("slot");
    return slot.assignedElements({ flatten: true });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cta-button": CTAButton;
  }
}
