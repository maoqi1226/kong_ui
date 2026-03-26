
export const assertElementTextEquals = (selector, text) => {
  if (text !== undefined && text !== null) {
    selector().should("have.text", String(text));
  }
}

export const assertElementContainsText = (selector, text) => {
  if (text !== undefined && text !== null) {
    selector().should("contain.text", String(text));
  }
};
