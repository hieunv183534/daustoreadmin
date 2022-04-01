managerApproveAccount = null;
window.onload = () => {
    accountApi = new AccountApi();
    managerApproveAccount = new ManagerApproveAccount();
}


class ManagerApproveAccount extends Base {
    constructor() {
        super();
        this.mode = 1;
        this.initEvent();
        this.loadHeaderInfo();
        this.loadListAccount(this.mode);
        this.initEventTable();
    }

    initEvent() {
        document.querySelector('#managerAccount').addEventListener('click', () => {
            this.mode = 1;
            this.loadListAccount(this.mode);
        });
        document.querySelector('#medicalStaffAccount').addEventListener('click', () => {
            this.mode = 2;
            this.loadListAccount(this.mode);
        });

        document.querySelector(".search-box").addEventListener("keypress", (e) => {
            if (e.key === 'Enter') {
                this.loadListAccount(this.mode);
            }
        });
        document.querySelector('#btnRefresh').addEventListener('click',()=>{
            document.querySelector(".search-box").value = '';
            this.index =0;
            this.loadListAccount(this.mode);
        })
    }

    loadListAccount(mode) {
        var keyword = document.querySelector('.search-box').value;
        if (keyword == null) keyword = '';
        showLoader();
        if (mode == 1) {
            accountApi.getListAdmin(this.index, this.count, keyword).then(res => {
                console.log(res.data);
                this.total = res.data.length;
                loadTable(listColums.Account, res.data, this.index + 1);
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
        } else {
            accountApi.getListMedical(this.index, this.count, keyword).then(res => {
                console.log(res.data);
                this.total = res.data.length;
                loadTable(listColums.Account, res.data, this.index + 1);
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
    }

    tableRowOnDBClick(item, thisTr) {
        var popupBtns = [{ text: "Đóng", enable: true }, { text: "Duyệt", enable: true }, { text: "Từ chối", enable: true }]
        var btns = showPopupDialog("Thông báo", "Bạn có muốn duyệt tài khoản " + item.phoneNumber + " không?", popupBtns);
        btns[0].addEventListener('click', () => {
            hidePopupDialog();
        });
        btns[1].addEventListener('click', () => {
            let body = {
                userId: item.userId,
                status: 1
            }
            hidePopupDialog();
            accountApi.accountBrowsing(body).then(res => {
                console.log(res);
                showToastMessenger('success', "Duyệt thành công!");
                thisTr.remove();
            }).catch(error => {
                console.log(error);
                showToastMessenger('danger', "Duyệt thất bại. Vui lòng thử lại sau!");
            })
        });
        btns[2].addEventListener('click', () => {
            let body = {
                userId: item.userId,
                status: 1
            }
            hidePopupDialog();
            accountApi.accountBrowsing(body).then(res => {
                console.log(res);
                showToastMessenger('success', "Từ chối thành công!");
                thisTr.remove();
            }).catch(error => {
                console.log(error);
                showToastMessenger('danger', "Từ chối thất bại. Vui lòng thử lại sau!");
            })
        });
    }

}
