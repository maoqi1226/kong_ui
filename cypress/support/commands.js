

Cypress.Commands.add("typeText", (selector, text) => {
  selector().clear().type(text);
});

Cypress.Commands.add("typeNum", (selector, text) => {
  selector().clear().clear().type(text);
});

Cypress.Commands.add("typeSpecialText", (selector, text) => {
  if (text.includes("\t")) {
    selector().invoke("val", text).trigger("input");
  } else {
    selector().clear().type(text);
  }
});
