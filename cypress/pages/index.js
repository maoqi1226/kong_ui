import OverallPage from "./OverallPage.js";
import ServiceListPage from "./ServiceListPage.js";
import ServiceCreatePage from "./ServiceCreatePage.js";
import ServiceDetailPage from "./ServiceDetailPage.js";

/**
 * @typedef {Object} Pages
 * @property {OverallPage} overall
 * @property {ServiceListPage} servicelist
 * @property {ServiceCreatePage} servicecreate
 * @property {ServiceDetailPage} servicedetail
 */
class PageFactory {
  constructor() {
    /** @type {Pages} */
    this.pages = {
      overall: new OverallPage(),
      servicelist: new ServiceListPage(),
      servicecreate: new ServiceCreatePage(),
      servicedetail: new ServiceDetailPage(),
    };
  }

  /**
   * @template {keyof Pages} T
   * @param {T} pageName
   * @returns {Pages[T]}
   */
  get(pageName) {
    return this.pages[pageName];
  }
}

export default new PageFactory();
