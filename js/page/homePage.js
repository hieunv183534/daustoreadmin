homePage = null;
window.onload = () => {
    homePage = new HomePage();
}


class HomePage extends Base {
    constructor() {
        super();
        this.mode = 1;
        this.initEvent();
    }

    initEvent() {
        
    }
}
