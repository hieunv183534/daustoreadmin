inputSearch = document.querySelector('#inputSearch');
formData = $('.form-data');
listItemForm = document.querySelector('#valueItems');

orderPage = null;
window.onload = () => {
    orderPage = new OrderPage();
}


class OrderPage extends Base {
    constructor() {
        super();
        this.filters = {
            orderStatus: 0,
            searchTerms: null,
            startTime: null,
            endTime: null,
            orderTimeState: 1
        };
        this.orderId = '';
        this.initEvent();
        this.loadListOrder(this.filters);
        initEventCheckbox();
    }

    initEvent() {
        document.querySelector('#btnRefresh').addEventListener('click',()=>{
            window.location.reload();
        });

        document.querySelector('#inputStartTime').addEventListener('change', (e) => {
            this.filters.startTime = e.target.value;
            this.loadListOrder(this.filters);
        });

        document.querySelector('#inputEndTime').addEventListener('change', (e) => {
            this.filters.endTime = e.target.value;
            this.loadListOrder(this.filters);
        });

        inputSearch.addEventListener('input', (e) => {
            this.filters.searchTerms = e.target.value;
        });

        inputSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                console.log(this.filters);
                this.loadListOrder(this.filters);
            }
        });

        inputSearch.addEventListener('blur', (e) => {
            console.log(this.filters);
            this.loadListOrder(this.filters);
        });

        document.querySelectorAll('#inputOrderStatus .dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                let val = Number(item.getAttribute('value'));
                this.filters.orderStatus = val;
                this.loadListOrder(this.filters);
            });
        });

        document.querySelectorAll('#inputOrderTimeState .dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                let val = Number(item.getAttribute('value'));
                this.filters.orderTimeState = val;
                this.loadListOrder(this.filters);
            });
        });


        document.querySelectorAll('.change-status').forEach(btn => {
            btn.addEventListener('click', () => {
                let i = Number(btn.parentElement.getAttribute('value'));
                let a = Number(btn.getAttribute('value'));
                i = i + a;
                i = (i == 0) ? 6 : i;
                i = (i == 7) ? 1 : i;
                btn.parentElement.setAttribute('value', i);
                document.querySelector('.order-status-input p').innerHTML = orderStatus[i];
            });
        });

        document.querySelector('#closeFormData').addEventListener('click', () => {
            formData.hide();
        });

        document.querySelector('#btnUpdateOrder').addEventListener('click', () => {
            let updatedOrder = {
                status: Number(document.querySelector('#valueStatus').getAttribute('value')),
                paymentStatus: getValueCheckBox('#valuePaymentStatus'),
                shipPayStatus: getValueCheckBox('#valueShipPayStatus'),
            };
            this.API.updateOrderByAdmin(updatedOrder, this.orderId).done(res => {
                showToastMessenger('success', "Cập nhật đơn hàng thành công!");
                this.loadListOrder(this.filters);
                formData.hide();
            }).fail(err => {
                console.log(err);
                showToastMessenger('danger', "Cập nhật đơn hàng thất bại!");
            })

        });
    }

    loadListOrder(myfilters) {
        this.API.getOrders(myfilters.orderStatus, myfilters.searchTerms, myfilters.startTime, myfilters.endTime, myfilters.orderTimeState, this.index, this.count).done(res => {
            console.log(res.data.data);
            loadTable(listColums.Orders, res.data.data, 1);
            this.initEventTable();
            this.total = res.data.total;
            this.reloadPagingInfo();
        }).fail(err => {
            showToastMessenger('danger', "Có lỗi vui lòng thử lại!")
        })
    }

    tableRowOnDBClick(order, thisTr) {
        var popupBtns = [{ text: "Đóng", enable: true }, { text: "Cập nhật", enable: true }, { text: "Xóa", enable: false }]
        var btns = showPopupDialog("Thông báo", `Bạn muốn làm gì với đơn hàng <b>${order.orderCode}</b>`, popupBtns);
        btns[0].addEventListener('click', () => {
            hidePopupDialog();
        });
        btns[1].addEventListener('click', () => {
            console.log(order);
            this.orderId = order.orderId;
            // bind dữ liệu cho form
            document.querySelector('#valueOrderCode').value = order.orderCode;
            document.querySelector('#valueOrderTime').value = order.createdAt;
            document.querySelector('#valueStatus').setAttribute('value', order.status);
            document.querySelector('#valueStatus p').innerHTML = orderStatus[order.status];
            document.querySelector('#valuePaymentMethod').innerHTML = paymentMethod[order.paymentMethod];
            setValueCheckbox('#valuePaymentStatus', order.paymentStatus);
            setValueCheckbox('#valueShipPayStatus', order.shipPayStatus);
            document.querySelector('#valueTotalMoney').value = order.totalMoney;
            document.querySelector('#valueBuyerInfo').value = `- Tên: ${order.buyerName}\n- SDT: ${order.phone}\n- Địa chỉ: ${order.address}\n\n- Ghi chú: ${order.note}`;
            listItemForm.innerHTML = '';
            let listItem = order.items.split(' _and_ ');
            listItem.forEach(i => {
                listItemForm.append(parseHTML(`<div class="item-order">
                                            <img src="${getMediaUrl(i.split('|')[3])}" alt="" style="width: 80px;">
                                            <span> <b>X${i.split('|')[0]}</b> ${i.split('|')[4]}</span>
                                        </div>`));
            })

            formData.show();
            hidePopupDialog();
        });
        btns[2].addEventListener('click', () => {
            alert("Xóa mặt hàng");
        });
    }

    changeCount() {
        this.loadListOrder(this.filters);
    }
    prePage() {
        this.loadListOrder(this.filters);
    }
    nextPage() {
        if (this.index >= this.total) {
            this.index -= this.count
            showToastMessenger('danger', "Đã đến trang cuối!")
        } else {
            this.loadListOrder(this.filters);
        }
    }
}
