itemPage = null;
window.onload = () => {
    itemPage = new ItemPage();
}


class ItemPage extends Base {
    constructor() {
        super();
        this.mode = 1;
        this.initEvent();
        this.loadListItem();
    }

    initEvent() {
        
    }

    loadListItem(){
        loadTable(listColums.Items, listDatas.Items, 1);
    }
}
