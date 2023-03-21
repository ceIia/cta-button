import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CTAButton } from "../src";

describe("CTAButton", async () => {
  function getCTAButton(): CTAButton | null | undefined {
    return document.querySelector("cta-button");
  }

  beforeEach(() => {
    document.body.innerHTML = "<cta-button></cta-button>";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render with default text content", () => {
    const button = getCTAButton();

    expect(
      button?.shadowRoot?.querySelector(".cta-btn")?.textContent
    ).toContain("Click me!");
  });

  it("should render with custom text content", async () => {
    const button = getCTAButton();

    const span = document.createElement("span");
    span.slot = "label";
    span.textContent = "hewwo";
    button.appendChild(span);

    document.body.innerHTML = "";
    document.body.appendChild(button);

    await button?.updateComplete;

    expect(button?._slottedChildren[0].textContent).toContain("hewwo");
  });

  it("should handle click event", () => {
    const spyClick = vi.fn();
    const button = getCTAButton();

    button?.addEventListener("click", spyClick);
    getCTAButton()?.click();
    expect(spyClick).toHaveBeenCalled();
  });
});
