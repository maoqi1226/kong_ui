import OverallPage from "./OverallPage.js";
import ServiceListPage from "./ServiceListPage.js";
import ServiceCreatePage from "./ServiceCreatePage.js";
import ServiceDetailPage from "./ServiceDetailPage.js";

class PageFactory {
  constructor() {
    this.pages = {
      overall: new OverallPage(),
      servicelist: new ServiceListPage(),
      servicecreate: new ServiceCreatePage(),
      servicedetail: new ServiceDetailPage(),
    };
  }

  get(pageName) {
    return this.pages[pageName];
  }
}

export default new PageFactory();