unitApi = null;
personApi = null;
listUnitForCbb = null;
authApi = null;
notificationApi = null;
accountApi = null;
declarationApi = null;


class Base {
    constructor() {
        this.initEventBase();
        this.index = 0;
        this.count = 100;
        this.total = null;
        this.postMode = "add";
        this.postId ="";
    }

    initEventBase() {
        var seft = this;

        // sự kiện click menu-item
        var menuItems = document.querySelectorAll(".menu-item");
        menuItems.forEach(menuItem => {
            menuItem.addEventListener('click', function () {
                seft.menuItemOnClick(this);
            });
        });

        // sự kiện toggle menu
        document.querySelector('.toggle-menu').addEventListener('click', function () {
            seft.toggleMenu();
        });


        // sự kiện click vào user menu 
        document.querySelector(".content-header-right .user").addEventListener('click', () => {
            document.querySelector(".content-header-right .list-option").classList.add('list-option-show');
        })

        // sự kiện blur user menu 
        document.querySelector(".content-header-right .user").addEventListener('blur', () => {
            setTimeout(() => {
                document.querySelector(".content-header-right .list-option").classList.remove('list-option-show');
            }, 500);
        });


        // sự kiện click btn logout
        document.querySelector(".item-option.btn-logout").addEventListener('click', () => {
            window.location.href = "../../index.html";
        });

        if (document.querySelector('.paging-bar')) {
            document.querySelectorAll('.paging-bar .dropdown-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.count = Number(item.getAttribute('valuename'));
                    if(document.querySelector('#btnPostPost')){
                        this.loadNotification(this.mode);
                    }
                    if(document.querySelector('#thisIsApproveAccount')){
                        this.loadListAccount(this.mode);
                    }
                    if(document.querySelector('#thisIsListUnit')){
                        this.loadListUnit(this.unitCode);
                    }
                    if(document.querySelector('#thisIsListDeclaration')){
                        this.loadListDeclaration(this.mode);
                    }
                })
            });

            document.querySelector(".paging-bar .next-page").addEventListener('click', () => {
                this.index = this.index + this.count;
                if(document.querySelector('#btnPostPost')){
                    this.loadNotification(this.mode);
                }
                if(document.querySelector('#thisIsApproveAccount')){
                    this.loadListAccount(this.mode);
                }
                if(document.querySelector('#thisIsListUnit')){
                    this.loadListUnit(this.unitCode);
                }
                if(document.querySelector('#thisIsListDeclaration')){
                    this.loadListDeclaration(this.mode);
                }
            });

            document.querySelector(".paging-bar .pre-page").addEventListener('click', () => {
                if ((this.index - this.count) < 0) {
                    this.index = 0;
                } else {
                    this.index = this.index - this.count;
                    if(document.querySelector('#btnPostPost')){
                        this.loadNotification(this.mode);
                    }
                    if(document.querySelector('#thisIsApproveAccount')){
                        this.loadListAccount(this.mode);
                    }
                    if(document.querySelector('#thisIsListUnit')){
                        this.loadListUnit(this.unitCode);
                    }
                    if(document.querySelector('#thisIsListDeclaration')){
                        this.loadListDeclaration(this.mode);
                    }
                }
            });
        };

        if (document.querySelector("#btnPostPost")) {
            document.querySelector("#btnPostPost").addEventListener('click', () => {
                
                if (this.postMode == "add") {
                    var newPost = {
                        title: document.querySelector('#valueTitle').value,
                        notificationContent: document.querySelector('#valueContent').value
                    }
                    notificationApi.add(newPost).then(res => {
                        console.log(res);
                        this.loadNotification(this.mode);
                        document.querySelector('.dialog').classList.remove('d-block');
                        showToastMessenger('success', 'Thêm thành công 1 thông báo mới!');
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    var newPost = {
                        title: document.querySelector('#valueTitle').value,
                        notificationContent: document.querySelector('#valueContent').value,
                        notificationId: this.postId
                    }
                    notificationApi.update(newPost).then(res => {
                        console.log(res);
                        this.loadNotification(this.mode);
                        document.querySelector('.dialog').classList.remove('d-block');
                        showToastMessenger('success', 'Thông báo đã được cập nhật thành công!');
                    }).catch(error => {
                        console.log(error);
                    });
                }
            })
        }
    }

    reloadPagingInfo() {
        document.querySelector('#pagingInfo').innerHTML =
            `Hiển thị bản ghi từ ${this.index + 1} đến ${this.index+this.total}`;
    }

    menuItemOnClick(thisElement) {
        console.log(thisElement);
        var toHref = thisElement.getAttribute('toHref');
        window.location.href = `./${toHref}.html`;
    }

    toggleMenu() {
        var menuElement = document.querySelector('.menu');
        if (menuElement.classList.contains('menu-in-toggle')) {
            menuElement.classList.remove('menu-in-toggle');
        } else {
            menuElement.classList.add('menu-in-toggle');
        }
    }

    initEventTable() {
        var trs = document.querySelectorAll('tbody tr');
        trs.forEach(tr => {
            tr.addEventListener('dblclick', () => {
                var item = JSON.parse(tr.getAttribute("myItem"));
                this.tableRowOnDBClick(item, tr);
            })
        });
    }

    loadUnit(unitCode, page, total, keyword, keyListUnit) {
        unitApi.getById(unitCode, page, total, keyword).then(res => {
            console.log(res.data);
            localStorage.setItem(keyListUnit, JSON.stringify(res.data));
        }).catch(error => {
            console.log(error);
        })
    };

    loadHeaderInfo(){
        document.querySelector('h2#unitDetail').innerHTML = sessionStorage.getItem('unitDetail');
        var userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
        document.querySelector('p.display-user').innerHTML = userinfo.fullName;
    }

    loadUserInfo() {
        document.querySelector('h2#unitDetail').innerHTML = sessionStorage.getItem('unitDetail');

        var userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
        console.log(userinfo);
        if (userinfo.userId !== "000") {
            document.querySelector('p.display-user').innerHTML = userinfo.fullName;

            document.querySelector('#valueFullName').value = userinfo.fullName;
            document.querySelector('#valueDateOfBirth').value = Util.formatDateToValue(userinfo.dateOfBirth);
            document.querySelector('#valueAddress').value = userinfo.address;
            document.querySelector('#valueNationality').value = userinfo.nationality;
            setValueForRBG(document.querySelector('#valueSex'), userinfo.Sex);
            setValueForRBG(document.querySelector('#valueDiseaseStatus'), userinfo.diseaseStatus);

            this.loadUnitCbbs(userinfo.addressCode);


        } else {
            var popupBtns = [{ text: "", enable: false }, { text: "Đồng ý", enable: true }, { text: "", enable: false }]
            var btns = showPopupDialog("Thông báo!", "Vui lòng đăng kí thông tin trước khi sử dụng!", popupBtns);
            btns[1].addEventListener('click', () => {
                hidePopupDialog();
                document.querySelector("#valueFullName").focus();
            })
        }
    }

    loadUnitCbbs(wardCode) {
        var codeArr = wardCode.split('|');
        let a = codeArr[1];
        let b = codeArr[2];
        let c = codeArr[3];

        var districtCode = `|${a}|${b}|`;
        var provinceCode = `|${a}|`;

        setValueCbb(document.querySelector('#valueProvince'), provinceCode);
        setValueCbb(document.querySelector('#valueDistrict'), districtCode);
        setValueCbb(document.querySelector('#valueWard'), wardCode);
    }

    setToParentUnit(){
        var codeArr = this.unitCode.split('|');
        let a = codeArr[1];
        let b = codeArr[2];
        let c = codeArr[3];
        if(codeArr.length ==2){
            this.unitCode = '|';
        }else if(codeArr.length==3){
            this.unitCode = `|`;
        }else if(codeArr.length==4){
            this.unitCode = `|${a}|`;
        }else if(codeArr.length==5){
            this.unitCode = `|${a}|${b}|`;
        }
    }

    

    initEventForPost() {
        var btnDeletePosts = document.querySelectorAll('#btnDeletePost');
        btnDeletePosts.forEach(btnDeletePost => {
            btnDeletePost.addEventListener('click', () => {
                var post = JSON.parse(btnDeletePost.parentElement.getAttribute('myPost'));
                notificationApi.delete({ notificationId: post.notificationId }).then(res => {
                    showToastMessenger('success', 'Xóa thành công thông báo!');
                    btnDeletePost.parentElement.parentElement.remove();
                }).catch(error => {
                    console.log(error);
                })
            })
        });

        var btnUpdatePosts = document.querySelectorAll('#btnUpdatePost');
        btnUpdatePosts.forEach(btnUpdatePost => {
            btnUpdatePost.addEventListener('click', () => {
                this.postMode = "update";
                var post = JSON.parse(btnDeletePost.parentElement.getAttribute('myPost'));
                this.postId = post.notificationId;
                document.querySelector('#valueTitle').value = post.title;
                document.querySelector('#valueContent').value = post.notificationContent;
                document.querySelector('.dialog').classList.add('d-block');
            })
        })

        var btnApprovePosts = document.querySelectorAll('#btnApprovePost');
        btnApprovePosts.forEach(btnApprovePost => {
            btnApprovePost.addEventListener('click', () => {
                var post = JSON.parse(btnApprovePost.parentElement.getAttribute('myPost'));
                notificationApi.browsingNotification({notificationId: post.notificationId, status: 1}).then(res=>{
                    console.log(res);
                    showToastMessenger('success', 'Duyệt thành công thông báo!');
                    btnApprovePost.parentElement.parentElement.remove();
                }).catch(error=>{
                    console.log(error);
                    showToastMessenger('success', 'Duyệt thất bại. Vui lòng thử lại sau!');
                })
            })
        })

        var btnRefusePosts = document.querySelectorAll('#btnRefusePost');
        btnRefusePosts.forEach(btnRefusePost => {
            btnRefusePost.addEventListener('click', () => {
                var post = JSON.parse(btnRefusePost.parentElement.getAttribute('myPost'));
                notificationApi.browsingNotification({notificationId: post.notificationId, status: 0}).then(res=>{
                    console.log(res);
                    showToastMessenger('success', 'Từ chối thành công thông báo!');
                    btnRefusePost.parentElement.parentElement.remove();
                }).catch(error=>{
                    console.log(error);
                    showToastMessenger('success', 'Từ chối thất bại. Vui lòng thử lại sau!');
                })
            })
        })
    }

    loadNotification(mode) {
        showLoader();
        switch (mode) {
            case 1:
                notificationApi.viewDifficultNotification(this.index, this.count).then(res => {
                    console.log(res.data);
                    this.total = res.data.length;
                    this.reloadPagingInfo();
                    loadListPost(res.data);
                }).catch(error => {
                    console.log(error);
                    hideLoader();
                    if (error.status == 405) {
                        if (this.index == 0) {
                            loadListPost([]);
                            showToastMessenger('success', "Không có bản ghi nào cả hiuhiu!");
                        } else {
                            showToastMessenger('danger', "Bạn đã đến trang cuối mất rồi!");
                            this.index = this.index - this.count;
                        }
                    } else {
                        showToastMessenger('danger', "Đã có lỗi, vui lòng thử lại sau!");
                    }
                })
                break;
            case 2:
                notificationApi.viewMedicalNotification(this.index, this.count).then(res => {
                    console.log(res.data);
                    this.total = res.data.length;
                    this.reloadPagingInfo();
                    loadListPost(res.data);
                }).catch(error => {
                    console.log(error);
                    hideLoader();
                    if (error.status == 405) {
                        if (this.index == 0) {
                            loadListPost([]);
                            showToastMessenger('success', "Không có bản ghi nào cả hiuhiu!");
                        } else {
                            showToastMessenger('danger', "Bạn đã đến trang cuối mất rồi!");
                            this.index = this.index - this.count;
                        }
                    } else {
                        showToastMessenger('danger', "Đã có lỗi, vui lòng thử lại sau!");
                    }
                })
                break;
            case 3:
                notificationApi.viewAdminNotification(this.index, this.count).then(res => {
                    console.log(res.data);
                    this.total = res.data.length;
                    this.reloadPagingInfo();
                    loadListPost(res.data);
                }).catch(error => {
                    console.log(error);
                    hideLoader();
                    if (error.status == 405) {
                        if (this.index == 0) {
                            loadListPost([]);
                            showToastMessenger('success', "Không có bản ghi nào cả hiuhiu!");
                        } else {
                            showToastMessenger('danger', "Bạn đã đến trang cuối mất rồi!");
                            this.index = this.index - this.count;
                        }
                    } else {
                        showToastMessenger('danger', "Đã có lỗi, vui lòng thử lại sau!");
                    }
                })
                break;
            case 4:
                notificationApi.get(this.index, this.count).then(res => {
                    console.log(res.data);
                    this.total = res.data.length;
                    this.reloadPagingInfo();
                    loadListPost(res.data);
                    this.initEventForPost();
                }).catch(error => {
                    console.log(error);
                    hideLoader();
                    if (error.status == 405) {
                        if (this.index == 0) {
                            loadListPost([]);
                            showToastMessenger('success', "Không có bản ghi nào cả hiuhiu!");
                        } else {
                            showToastMessenger('danger', "Bạn đã đến trang cuối mất rồi!");
                            this.index = this.index - this.count;
                        }
                    } else {
                        showToastMessenger('danger', "Đã có lỗi, vui lòng thử lại sau!");
                    }
                })
                break;
            case 5:
                notificationApi.getListNotification(this.index, this.count).then(res => {
                    console.log(res.data);
                    this.total = res.data.length;
                    this.reloadPagingInfo();
                    loadListPost(res.data);
                    this.initEventForPost();
                }).catch(error => {
                    console.log(error);
                    hideLoader();
                    if (error.status == 405) {
                        if (this.index == 0) {
                            loadListPost([]);
                            showToastMessenger('success', "Không có bản ghi nào cả hiuhiu!");
                        } else {
                            showToastMessenger('danger', "Bạn đã đến trang cuối mất rồi!");
                            this.index = this.index - this.count;
                        }
                    } else {
                        showToastMessenger('danger', "Đã có lỗi, vui lòng thử lại sau!");
                    }
                });
        }
    }
}