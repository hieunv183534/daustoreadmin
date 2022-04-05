orderPage = null;
window.onload = () => {
    orderPage = new OrderPage();
}


class OrderPage extends Base {
    constructor() {
        super();
        this.mode = 1;
        this.initEvent();
    }

    initEvent() {
        
    }
}
