orderPage = null;
window.onload = () => {
    orderPage = new OrderPage();
}


class OrderPage extends Base {
    constructor() {
        super();
        this.initEvent();
        this.loadListItem();
    }

    initEvent() {
        
    }

    loadListItem() {
        loadTable(listColums.Orders, listDatas.Orders, 1);
        this.initEventTable();
    }

    tableRowOnDBClick(item, thisTr) {
        var popupBtns = [{ text: "Đóng", enable: true }, { text: "Cập nhật", enable: true }, { text: "Xóa", enable: false }]
        var btns = showPopupDialog("Thông báo", `Bạn muốn làm gì với đơn hàng <b>${item.orderId}</b>`, popupBtns);
        btns[0].addEventListener('click', () => {
            hidePopupDialog();
        });
        btns[1].addEventListener('click', () => {
            alert("Show popup cập nhật đơn hàng");
        });
        btns[2].addEventListener('click', () => {
            alert("Xóa mặt hàng");
        });
    }
}
