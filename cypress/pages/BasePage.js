class BasePage {
  typeText(ele, text) {
    ele.clear().type(text);

  }

  typeNum(ele, text){
    ele.clear().clear().type(text);
  }

  typeSpecialText(ele, text) {
    if (text.includes("\t")) {
      ele.invoke("val", text).trigger("input");
    } else {
      ele.clear().type(text);
    }
  }
}
export default BasePage;