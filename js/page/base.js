class Base {
    constructor() {
        this.initEventBase();
        this.liveTime();
    }

    liveTime() {
        var days = ['Chủ nhật ngày', 'Thứ 2 ngày', 'Thứ 3 ngày', 'Thứ 4 ngày', 'Thứ 5 ngày', 'Thứ 6 ngày', 'Thứ 7 ngày'];
        let timeTag = document.querySelector('#livetime');
        let now = new Date();
        timeTag.innerHTML = `${days[now.getDay()]} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}h:${now.getMinutes()}p`;
        setInterval(() => {
            let now = new Date();
            timeTag.innerHTML = `${days[now.getDay()]} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}h:${now.getMinutes()}p`;
        }, 60000);
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
                    if (document.querySelector('#btnPostPost')) {
                        this.loadNotification(this.mode);
                    }
                    if (document.querySelector('#thisIsApproveAccount')) {
                        this.loadListAccount(this.mode);
                    }
                    if (document.querySelector('#thisIsListUnit')) {
                        this.loadListUnit(this.unitCode);
                    }
                    if (document.querySelector('#thisIsListDeclaration')) {
                        this.loadListDeclaration(this.mode);
                    }
                })
            });

            document.querySelector(".paging-bar .next-page").addEventListener('click', () => {
                this.index = this.index + this.count;
                if (document.querySelector('#btnPostPost')) {
                    this.loadNotification(this.mode);
                }
                if (document.querySelector('#thisIsApproveAccount')) {
                    this.loadListAccount(this.mode);
                }
                if (document.querySelector('#thisIsListUnit')) {
                    this.loadListUnit(this.unitCode);
                }
                if (document.querySelector('#thisIsListDeclaration')) {
                    this.loadListDeclaration(this.mode);
                }
            });

            document.querySelector(".paging-bar .pre-page").addEventListener('click', () => {
                if ((this.index - this.count) < 0) {
                    this.index = 0;
                } else {
                    this.index = this.index - this.count;
                    if (document.querySelector('#btnPostPost')) {
                        this.loadNotification(this.mode);
                    }
                    if (document.querySelector('#thisIsApproveAccount')) {
                        this.loadListAccount(this.mode);
                    }
                    if (document.querySelector('#thisIsListUnit')) {
                        this.loadListUnit(this.unitCode);
                    }
                    if (document.querySelector('#thisIsListDeclaration')) {
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
            `Hiển thị bản ghi từ ${this.index + 1} đến ${this.index + this.total}`;
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
}