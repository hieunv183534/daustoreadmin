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
        document.querySelectorAll('.list-media img').forEach(img => {
            img.addEventListener('dblclick', () => {
                var popupBtns = [{ text: "Đóng", enable: true }, { text: "Đặt làm avatar", enable: true }, { text: "Xóa", enable: true }]
                var btns = showPopupDialog("Thông báo", `Bạn muốn làm gì với media này?`, popupBtns);
                btns[0].addEventListener('click', () => {
                    hidePopupDialog();
                });
                btns[1].addEventListener('click', () => {
                    alert("Đặt làm avatar");
                });
                btns[2].addEventListener('click', () => {
                    alert("Xóa media");
                });
            })
        })
    }

    loadListItem() {
        loadTable(listColums.Items, listDatas.Items, 1);
        this.initEventTable();
    }

    tableRowOnDBClick(item, thisTr) {
        var popupBtns = [{ text: "Đóng", enable: true }, { text: "Cập nhật", enable: true }, { text: "Xóa", enable: true }]
        var btns = showPopupDialog("Thông báo", `Bạn muốn làm gì với mặt hàng <b>${item.itemName}</b>`, popupBtns);
        btns[0].addEventListener('click', () => {
            hidePopupDialog();
        });
        btns[1].addEventListener('click', () => {
            alert("Show popup cập nhật mặt hàng");
        });
        btns[2].addEventListener('click', () => {
            alert("Xóa mặt hàng");
        });
    }
}
