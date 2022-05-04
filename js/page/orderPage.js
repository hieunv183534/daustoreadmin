inputSearch = document.querySelector('#inputSearch');

orderPage = null;
window.onload = () => {
    orderPage = new OrderPage();
}


class OrderPage extends Base {
    constructor() {
        super();
        this.filters = {
            orderStatus : 0,
            searchTerms : null,
            startTime : null,
            endTime : null,
            orderTimeState : 1
        };
        this.initEvent();
        this.loadListOrder(this.filters);
    }

    initEvent() {
        document.querySelector('#inputStartTime').addEventListener('change',(e)=>{
            this.filters.startTime = e.target.value;
            this.loadListOrder(this.filters);
        });

        document.querySelector('#inputEndTime').addEventListener('change',(e)=>{
            this.filters.endTime = e.target.value;
            this.loadListOrder(this.filters);
        });

        inputSearch.addEventListener('input',(e)=>{
            this.filters.searchTerms = e.target.value;
        });

        inputSearch.addEventListener('keypress',(e)=>{
            if (e.key === 'Enter') {
                console.log(this.filters);
                this.loadListOrder(this.filters);
            }
        });
    }

    loadListOrder(myfilters) {
        console.log(myfilters);
        this.API.getOrders(myfilters.orderStatus, myfilters.searchTerms, myfilters.startTime , myfilters.endTime , myfilters.orderTimeState,0,10).done(res=>{
            console.log(res.data.data);
            loadTable(listColums.Orders, res.data.data,1);
            this.initEventTable();
        }).fail(err=>{
            console.log(err.responseJSON);
        })
    }

    tableRowOnDBClick(item, thisTr) {
        var popupBtns = [{ text: "Đóng", enable: true }, { text: "Cập nhật", enable: true }, { text: "Xóa", enable: false }]
        var btns = showPopupDialog("Thông báo", `Bạn muốn làm gì với đơn hàng <b>${item.orderCode}</b>`, popupBtns);
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
