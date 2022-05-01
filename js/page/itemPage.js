inputSearch = document.querySelector('#inputSearch');
btnRefresh = document.querySelector('#btnRefresh');
formCategory = $('.form-category');
closeCategory = document.querySelector('#closeCategory');
formData = $('.form-data');
btnAddItem = document.querySelector('#btnAddItem');
closeFormData = document.querySelector('#closeFormData');
btnCategory = document.querySelector('#btnCategory');
tagItems = document.querySelectorAll('.tag-item');


itemPage = null;
window.onload = () => {
    itemPage = new ItemPage();
}


class ItemPage extends Base {
    constructor() {
        super();
        this.categoryCode = "";
        this.initEvent();
        this.loadListItem(null, null, 0, 10);
        this.renderTreeList();
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
        });


        inputSearch.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                this.loadListItem(inputSearch.value, null, this.index, this.count);
            }
        });

        btnRefresh.addEventListener('click', () => {
            inputSearch.value = '';
            this.index = 0;
            this.count = 10;
            this.loadListItem(inputSearch.value, null, this.index, this.count);
        });

        btnCategory.addEventListener('click', () => {
            formCategory.show();
        });

        closeCategory.addEventListener('click', () => {
            formCategory.hide();
        });

        btnAddItem.addEventListener('click', () => {
            formData.show();
        });

        closeFormData.addEventListener('click', () => {
            formData.hide();
        });

        tagItems.forEach(item=>{
            item.addEventListener('click',()=>{
                if(item.classList.contains('checked')){
                    item.classList.remove('checked');
                }else{
                    item.classList.add('checked');
                }
            })
        })
    }

    loadListItem(searchTerms, categoryCode, index, count) {
        console.log({searchTerms,categoryCode,index,count});
        this.API.getItems(null, searchTerms, null, 1, index, count).done(res => {
            loadTable(listColums.Items, res.data.data, this.index + 1);
            this.total = res.data.total;
            this.initEventTable();
            this.reloadPagingInfo();
        }).fail(err => {
            showToastMessenger('danger', "Có lỗi")
        })
    }

    renderTreeList(){
        this.API.getCategorys().done(res=>{
            console.log(res.data);
            loadListCategory(res.data);
            loadListCategoryx(res.data);
            this.initEventTreeList();
        }).fail(err=>{
            showToastMessenger('danger', "Có lỗi")
        });
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

    changeCount() {
        this.loadListItem(inputSearch.value, this.categoryCode, this.index, this.count);
    }
    prePage() {
        this.loadListItem(inputSearch.value, this.categoryCode, this.index, this.count);
    }
    nextPage() {
        if (this.index >= this.total) {
            this.index -= this.count
            showToastMessenger('danger', "Đã đến trang cuối!")
        } else {
            this.loadListItem(inputSearch.value, this.categoryCode, this.index, this.count);
        }
    }

    initEventTreeList(){
        document.querySelectorAll('.tree-nav__item-title').forEach(element=>{
            element.addEventListener('click',()=>{
                console.log(element.getAttribute('code'));
                this.categoryCode = element.getAttribute('code');
                this.loadListItem(inputSearch.value, this.categoryCode, this.index, this.count);
            })
        });
    }

}
