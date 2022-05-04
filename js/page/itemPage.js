inputSearch = document.querySelector('#inputSearch');
btnRefresh = document.querySelector('#btnRefresh');
formCategory = $('.form-category');
closeCategory = document.querySelector('#closeCategory');
formData = $('.form-data');
btnAddItem = document.querySelector('#btnAddItem');
closeFormData = document.querySelector('#closeFormData');
btnCategory = document.querySelector('#btnCategory');
tagItems = document.querySelectorAll('.tag-item');
btnUpdateCategory = document.querySelector('#btnUpdateCategory');
btnUploadMedia = document.querySelector('#btnUploadMedia');
inputMedia = document.querySelector('#inputMedia');
listMedia = document.querySelector('.list-media');


var firebaseConfig = {
    apiKey: "AIzaSyC7F1wdlJkzLWC7cnX4P5gVvXR_WaWNL08",
    authDomain: "daustore.firebaseapp.com",
    projectId: "daustore",
    storageBucket: "daustore.appspot.com",
    messagingSenderId: "534961119730",
    appId: "1:534961119730:web:a2eeb7665577aae1860b6b",
    measurementId: "G-9Y2GEJ4777"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


itemPage = null;
window.onload = () => {
    itemPage = new ItemPage();

    Validator({
        form: '.form-data',
        rules: [
            Validator.isRequired('#valueItemName'),
            Validator.isRequired('#valueRealPrice'),
            Validator.isRequired('#valueSaleRate'),
            Validator.isRequired('#valueDescription'),
            Validator.isRequired('#valueMedias'),
        ],
        submitSelector: '#btnUpdateUserInfo',
        onSubmit: itemPage.formItemOnSubmit
    });
}


class ItemPage extends Base {
    constructor() {
        super();
        this.categoryCode = "";
        this.formCategory = {};
        this.formCategoryMode = '';
        this.formItem = {};
        this.formItemMode = '';
        this.listCategory = [];
        this.newCode = '';
        this.initEvent();
        this.loadListItem(null, null, 0, 10);
        this.renderTreeList();
    }

    initEvent() {

        inputSearch.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                this.loadListItem(inputSearch.value, this.categoryCode, this.index, this.count);
            }
        });

        btnRefresh.addEventListener('click', () => {
            window.location.reload();
        });

        btnCategory.addEventListener('click', () => {
            formCategory.show();
        });

        closeCategory.addEventListener('click', () => {
            formCategory.hide();
        });

        btnAddItem.addEventListener('click', () => {

            // reset lại form
            document.querySelector('#valueItemName').value = '';
            document.querySelector('#valueItemCode').value = '';
            document.querySelector('#valueRealPrice').value = '';
            document.querySelector('#valueSaleRate').value = '';
            document.querySelector('#valueCategoryCode .category-main').innerHTML = 'Tất cả sản phẩm';
            document.querySelector('#valueCategoryCode').setAttribute('value', '');
            document.querySelector('#valueDescription').value = "";
            document.querySelector('#valueMedias').setAttribute('value', "");
            listMedia.innerHTML = '';
            document.querySelector('#valueTag').setAttribute('value', "");
            this.setValueTag('');

            // đưa form về dạng chưa cảnh báo
            let listValueSelector = ['#valueItemName', '#valueRealPrice', '#valueSaleRate', '#valueDescription', '#valueMedias'];
            listValueSelector.forEach(selector => {
                let element = document.querySelector(selector);
                element.classList.remove('validate-field');
                element.title = '';
            })
            this.API.getNewItemCode().done(res => {
                document.querySelector('#valueItemCode').value = res.data;
                this.newCode = res.data;
            })
            formData.show();
            document.querySelector('#valueItemName').focus();
            this.formItemMode = 'add';
        });

        closeFormData.addEventListener('click', () => {
            formData.hide();
        });

        tagItems.forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('checked')) {
                    item.classList.remove('checked');
                } else {
                    item.classList.add('checked');
                }

                let value = '';
                tagItems.forEach(tag => {
                    if (tag.classList.contains('checked')) {
                        value += `${tag.getAttribute('data')} `;
                    };
                });
                value = value.trim();
                document.querySelector('#valueTag').setAttribute('value', value);
            })
        });

        btnUpdateCategory.addEventListener('click', () => {
            this.formCategory.categoryName = document.querySelector('#valueCategoryName').value;
            if ((!this.formCategory.categoryName)) {
                showToastMessenger('danger', "Chưa đủ dữ liệu để cập nhật danh mục!")
            } else {
                if (this.formCategoryMode === 'add') {

                    var popupBtns = [{ text: "Hủy", enable: true }, { text: "Thêm", enable: true }, { text: "Xóa", enable: false }]
                    var btns = showPopupDialog("Thông báo",
                        `Xác nhận thêm danh mục <b>${this.formCategory.categoryName}</b> vào danh mục có mã <b>${this.formCategory.categoryCode}</b> ?`, popupBtns);
                    btns[0].addEventListener('click', () => {
                        hidePopupDialog();
                    });
                    btns[1].addEventListener('click', () => {
                        this.API.addCategory({
                            categoryName: this.formCategory.categoryName,
                            parentCode: (this.formCategory.categoryCode === '') ? 'xxx' : this.formCategory.categoryCode
                        }).done(res => {
                            showToastMessenger('success', "Thêm mới thành công một danh mục!");
                            hidePopupDialog();
                            this.renderTreeList();
                            document.querySelector('#valueCategoryName').value = '';
                        })
                    });
                } else {
                    var popupBtns = [{ text: "Hủy", enable: true }, { text: "Cập nhật", enable: true }, { text: "Xóa", enable: false }]
                    var btns = showPopupDialog("Thông báo",
                        `Xác nhận sửa danh mục mã <b>${this.formCategory.categoryCode}</b> tên thành <b>${this.formCategory.categoryName}</b> ?`, popupBtns);
                    btns[0].addEventListener('click', () => {
                        hidePopupDialog();
                    });
                    btns[1].addEventListener('click', () => {
                        this.API.updateCategory(this.formCategory.categoryId, this.formCategory.categoryName).done(res => {
                            showToastMessenger('success', "Chỉnh sửa thành công danh mục!");
                            hidePopupDialog();
                            this.renderTreeList();
                            document.querySelector('#valueCategoryName').value = '';
                        })
                    });
                }
            }
        });

        btnUploadMedia.addEventListener('click', () => {
            let seft = this;
            var newFileName = this.getNewFileName();
            const file = inputMedia.files[0];
            if (file) {
                const storageRef = firebase.storage().ref();
                const final = storageRef.child(`${newFileName}.png`);
                const task = final.put(file);
                // showLoader();
                task.on('state_changed',
                    function progress(progress) {

                        console.log(progress.bytesTransferred / progress.totalBytes * 100)
                    },
                    function error(err) {
                        console.log(err);
                        showToastMessenger('danger', err);
                    },
                    function completed() {
                        inputMedia.value = '';
                        if (document.querySelector('#valueMedias').getAttribute('value')) {
                            let newMedias = document.querySelector('#valueMedias').getAttribute('value').trim() + ` ${newFileName}`;
                            document.querySelector('#valueMedias').setAttribute('value', newMedias);
                        } else {
                            document.querySelector('#valueMedias').setAttribute('value', newFileName);
                        };
                        showToastMessenger('success', "Tải lên thành công media với name: " + newFileName);
                        // hideLoader();
                        let newImg = parseHTML(`<img src="${getMediaUrl(newFileName)}" alt="${newFileName}">`);
                        listMedia.append(newImg);
                        seft.initEventMedia();
                        document.querySelector('#valueMedias').classList.remove('validate-field');
                    }
                )
            } else {
                showToastMessenger('danger', "Vui lòng chọn file từ máy trước!")
            }
        })
    }

    initEventMedia() {
        document.querySelectorAll('.list-media img').forEach(img => {
            img.addEventListener('dblclick', () => {
                let medias = listMedia.getAttribute('value');
                medias = medias.trim().split(' ');
                var popupBtns = [{ text: "Đóng", enable: true }, { text: "Đặt làm avatar", enable: true }, { text: "Xóa", enable: true }]
                var btns = showPopupDialog("Thông báo", `Bạn muốn làm gì với media này?`, popupBtns);
                btns[0].addEventListener('click', () => {
                    hidePopupDialog();
                });
                btns[1].addEventListener('click', () => {

                    medias = [
                        medias.find(e => e === img.alt),
                        ...medias.filter(e => e !== img.alt)
                    ];
                    medias = medias.join(' ');
                    this.loadListMedia(medias);
                    listMedia.setAttribute('value', medias);
                    hidePopupDialog();
                });
                btns[2].addEventListener('click', () => {
                    const storageRef1 = firebase.storage().ref()
                    const final1 = storageRef1.child(`${img.alt}.png`);

                    final1.delete().then(() => {
                        showToastMessenger('success', "Xóa thành công media!");
                        medias = medias.filter(e => e !== img.alt);
                        medias = medias.join(' ');
                        this.loadListMedia(medias);
                        listMedia.setAttribute('value', medias);
                        hidePopupDialog();
                    }).catch(err => {
                        showToastMessenger('danger', "err");
                    })
                });
            })
        });
    }

    getNewFileName() {
        let medias = document.querySelector('#valueMedias').getAttribute('value');
        if (medias) {
            let maxNumber = 0;
            medias.trim().split(' ').forEach(mediaName => {
                let mediaNumber = Number(mediaName.split('_')[1]);
                maxNumber = (maxNumber < mediaNumber) ? mediaNumber : maxNumber;
            });

            return `${this.newCode}_${(maxNumber + 1)}`;
        } else {
            return `${this.newCode}_${0}`;
        }
    }

    loadListMedia(medias) {
        listMedia.innerHTML = '';
        medias = medias.trim().split(' ').forEach(media => {
            let img = parseHTML(`<img src="${getMediaUrl(media)}" alt="${media}">`);
            listMedia.append(img);
        });
        this.initEventMedia();
    }

    loadListItem(searchTerms, categoryCode, index, count) {
        console.log(JSON.stringify({ searchTerms, categoryCode, index, count }));
        this.API.getItems(categoryCode, searchTerms, null, 1, index, count).done(res => {
            loadTable(listColums.Items, res.data.data, this.index + 1);
            this.total = res.data.total;
            this.initEventTable();
            this.reloadPagingInfo();
        }).fail(err => {
            showToastMessenger('danger', "Có lỗi");
        })
    }

    renderTreeList() {
        document.querySelector('#category').innerHTML = '';
        document.querySelector('#categoryx').innerHTML = '';
        document.querySelector('#category_form').innerHTML = '';
        this.API.getCategorys().done(res => {
            this.listCategory = res.data;
            loadListCategory(res.data);
            loadListCategoryx(res.data);
            loadListCategoryForm(res.data);
            this.initEventTreeList();
        }).fail(err => {
            showToastMessenger('danger', "Có lỗi");
        });
    }

    tableRowOnDBClick(item, thisTr) {
        var popupBtns = [{ text: "Đóng", enable: true }, { text: "Cập nhật", enable: true }, { text: "Xóa", enable: true }]
        var btns = showPopupDialog("Thông báo", `Bạn muốn làm gì với mặt hàng <b>${item.itemName}</b>`, popupBtns);
        btns[0].addEventListener('click', () => {
            hidePopupDialog();
        });
        btns[1].addEventListener('click', () => {
            this.formItemMode = 'update';
            console.log(JSON.stringify(item));

            // bind dữ liệu item lên form;
            this.newCode = item.itemCode;
            this.formItem.itemId = item.itemId;
            document.querySelector('#valueItemName').value = item.itemName;
            document.querySelector('#valueItemCode').value = item.itemCode;
            document.querySelector('#valueRealPrice').value = item.realPrice;
            document.querySelector('#valueSaleRate').value = item.saleRate;
            document.querySelector('#valueCategoryCode .category-main').innerHTML = item.categoryName;
            document.querySelector('#valueCategoryCode').setAttribute('value', item.categoryCode);
            document.querySelector('#valueDescription').value = item.description;
            document.querySelector('#valueMedias').setAttribute('value', item.medias);
            this.loadListMedia(item.medias);
            document.querySelector('#valueTag').setAttribute('value', item.tag);
            this.setValueTag(item.tag);
            formData.show();
            hidePopupDialog();
        });
        btns[2].addEventListener('click', () => {
            hidePopupDialog();
            var popupBtns = [{ text: "Không", enable: true }, { text: "Xóa", enable: true }, { text: "Xóa", enable: false }]
            var btns = showPopupDialog("Thông báo", `Bạn chắc chắn muốn xóa mặt hàng <b>${item.itemName}</b>`, popupBtns);
            btns[0].addEventListener('click', () => {
                hidePopupDialog();
            });
            btns[1].addEventListener('click', () => {
                this.API.deleteItem(item.itemId).done(res => {
                    showToastMessenger('success', "Xóa thành công");
                    hidePopupDialog();
                    thisTr.remove();
                }).fail(err => {
                    showToastMessenger('danger', err.responseJSON);
                })
            });
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

    setValueTag(tag){
        console.log(tag);
        document.querySelectorAll('.tag-item').forEach(tagItem=>{
            if(tag.includes(tagItem.getAttribute('data'))){
                tagItem.classList.add('checked');
            }else{
                tagItem.classList.remove('checked');
            }
        });
    }

    initEventTreeList() {
        // chọn category trong filter
        document.querySelectorAll('.function-bar div.tree-nav__item-title').forEach(element => {
            element.addEventListener('click', () => {
                document.querySelectorAll('.function-bar div.tree-nav__item-title').forEach(e => {
                    e.classList.remove('active');
                });
                element.classList.add('active');
                document.querySelector('.function-bar .category-main').innerHTML = element.getAttribute('name');
                this.categoryCode = element.getAttribute('code');
                this.loadListItem(inputSearch.value, this.categoryCode, this.index, this.count);


            });
        });

        //chọn category trong form
        document.querySelectorAll('.form-data div.tree-nav__item-title').forEach(element => {
            element.addEventListener('click', () => {
                document.querySelector('#valueCategoryCode').setAttribute('value', element.getAttribute('code'));
                document.querySelector('#valueCategoryCode .category-main').innerHTML = element.getAttribute('name');

                document.querySelectorAll('.form-data div.tree-nav__item-title').forEach(e => {
                    e.classList.remove('active');
                })

                element.classList.add('active');
            });
        });

        document.querySelectorAll('.tool-option.add').forEach(element => {
            element.addEventListener('click', () => {
                let value = element.parentElement.parentElement.getAttribute('code');
                console.log(value);
                this.formCategoryMode = 'add';
                this.formCategory.categoryCode = value;
                document.querySelector('#valueCategoryName').focus();
            })
        });

        document.querySelectorAll('.tool-option.edit').forEach(element => {
            element.addEventListener('click', () => {
                this.formCategory.categoryCode = element.parentElement.parentElement.getAttribute('code');
                this.formCategory.categoryId = element.parentElement.parentElement.getAttribute('categoryId');
                this.formCategoryMode = 'edit';
                document.querySelector('#valueCategoryName').value = element.parentElement.parentElement.getAttribute('name');
                document.querySelector('#valueCategoryName').focus();
            })
        });

        document.querySelectorAll('.tool-option.delete').forEach(element => {
            element.addEventListener('click', () => {
                let id = element.parentElement.parentElement.getAttribute('categoryId');
                let code = element.parentElement.parentElement.getAttribute('code');
                var popupBtns = [{ text: "Đóng", enable: true }, { text: "Xóa", enable: true }, { text: "Xóa", enable: false }]
                var btns = showPopupDialog("Thông báo", `Bạn muốn xóa danh mục có mã <b>${code}</b> ?`, popupBtns);
                btns[0].addEventListener('click', () => {
                    hidePopupDialog();
                });
                btns[1].addEventListener('click', () => {
                    this.API.deleteCategory(id).done(res => {
                        showToastMessenger('success', "Xóa thành công!");
                        hidePopupDialog();
                        this.renderTreeList();
                    }).fail(err => {
                        showToastMessenger('danger', "Lỗi");
                    });
                });
            })
        });
    }

    formItemOnSubmit() {
        itemPage.formItem.itemName = document.querySelector('#valueItemName').value;
        itemPage.formItem.itemCode = document.querySelector('#valueItemCode').value;
        itemPage.formItem.realPrice = Number(document.querySelector('#valueRealPrice').value);
        itemPage.formItem.saleRate = Number(document.querySelector('#valueSaleRate').value);
        itemPage.formItem.tag = document.querySelector('#valueTag').getAttribute('value');
        itemPage.formItem.categoryCode = document.querySelector('#valueCategoryCode').getAttribute('value');
        itemPage.formItem.description = document.querySelector('#valueDescription').value;
        itemPage.formItem.medias = document.querySelector('#valueMedias').getAttribute('value');

        console.log(itemPage.formItem);

        if (itemPage.formItemMode === 'add') {
            itemPage.API.addItem(itemPage.formItem).done(res => {
                showToastMessenger('success', "Thêm mới mặt hàng thành công!");
                formData.hide();
                itemPage.loadListItem(inputSearch.value, itemPage.categoryCode, itemPage.index, itemPage.count);
            }).fail(err => {
                console.log(err);
                showToastMessenger('danger', "Có lỗi, vui lòng thử lại!");
            });
        } else {
            itemPage.API.updateItem(itemPage.formItem,itemPage.formItem.itemId).done(res=>{
                showToastMessenger('success', "Cập nhật mặt hàng thành công!");
                formData.hide();
                itemPage.loadListItem(inputSearch.value, itemPage.categoryCode, itemPage.index, itemPage.count);
            }).fail(err=>{
                showToastMessenger('danger', "Có lỗi, vui lòng thử lại!");
            })
        }
    }
}
