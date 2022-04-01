medicalstaffEpidemicSituation = null;

window.onload = () => {
    unitApi = new UnitApi();
    medicalstaffEpidemicSituation = new MedicalstaffEpidemicSituation();
}

class MedicalstaffEpidemicSituation extends Base {
    constructor() {
        super();
        this.level = 0;
        this.unitCode = '|';
        this.initEvent();
        this.loadHeaderInfo();
        this.loadListUnit(this.unitCode);
    }

    initEvent() {
        document.querySelector(".search-box").addEventListener("keypress", (e) => {
            if (e.key === 'Enter') {
                this.loadListUnit(this.unitCode);
            }
        });
        document.querySelector('#btnRefresh').addEventListener('click', () => {
            document.querySelector(".search-box").value = '';
            this.index = 0;
            this.unitCode = '|';
            this.loadListUnit(this.unitCode);
        });
        document.querySelector('#btnReturn').addEventListener('click', () => {
            document.querySelector(".search-box").value = '';
            this.index = 0;
            this.setToParentUnit();
            this.loadListUnit(this.unitCode);
        })
    }

    loadListUnit(unitCode) {
        showLoader();
        var keyword = document.querySelector('.search-box').value;
        unitApi.getById(unitCode, this.getPage(), this.count, keyword).then(res => {
            console.log(res.data);
            this.total = res.data.length;
            loadTable(listColums.Unit, res.data, this.index + 1);
            this.reloadPagingInfo();
            this.initEventTable();
        }).catch(error => {
            console.log(error);
            hideLoader();
            if (error.status == 405) {
                if (this.index == 0) {
                    loadTable(listColums.Account, [], this.index + 1);
                    showToastMessenger('success', "Không có bản ghi nào cả hiuhiu!");
                } else {
                    showToastMessenger('danger', "Bạn đã đến trang cuối mất rồi!");
                    this.index = this.index - this.count;
                }
            } else {
                showToastMessenger('danger', "Đã có lỗi, vui lòng thử lại sau!");
            }
        })
    }

    getPage() {
        return (this.index + this.count) / this.count;
    }

    tableRowOnDBClick(item, thisTr) {
        var popupBtns = [{ text: "Đóng", enable: true }, { text: "Xem", enable: true }, { text: "QR Code", enable: true }]
        var btns = showPopupDialog("Thông báo", "Bạn có muốn xem tình hình dịch các đơn vị con của đơn vị " + item.unitName + " không?", popupBtns);
        btns[0].addEventListener('click', () => {
            hidePopupDialog();
        });
        btns[1].addEventListener('click', () => {
            hidePopupDialog();
            if (item.type == "w") {
                showToastMessenger("danger", "Đây đã là đơn vị cấp nhỏ nhất!!");
            } else {
                this.unitCode = item.unitCode;
                document.querySelector(".search-box").value = '';
                this.index = 0;
                this.loadListUnit(this.unitCode);
            }
        });
        btns[2].addEventListener('click', () => {
            showUnitQr(item.unitCode);
        });
    }
}