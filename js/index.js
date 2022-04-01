window.onload = () => {
    authApi = new AuthApi();
    personApi = new PersonApi();
    adminApi = new AdminApi();
    initEvent();
}

function initEvent() {
    document.querySelector("#btnCilivian").addEventListener('click', () => {
        acc = {
            phoneNumber: "0971883025",
            password: "abcd1221"
        }
        usernull = {
            userId : "000"
        }
        authApi.login(acc).then(res => {
            console.log(res);
            sessionStorage.setItem('token', "Bearer " + res.token);
            sessionStorage.setItem('unitDetail',res.unitDetail);
            sessionStorage.setItem('userUnitCode',res.unitCode);
            
            personApi.get().then(res=>{
                console.log(res);
                // sessionStorage.setItem('userinfo',JSON.stringify(usernull));
                sessionStorage.setItem('userinfo',JSON.stringify(res.data));
                window.location.href = "./page/cilivian/cilivian-home.html";
            }).catch(error=>{
                showToastMessenger('danger', "Có lỗi vui lòng thử lại sau!")
            })
            
        }).catch(error => {
            console.log(error);
            showToastMessenger("danger","Tài khoản không hợp lệ hoặc chưa được duyệt");
        })
    });

    document.querySelector("#btnManager").addEventListener('click', () => {
        acc = {
            phoneNumber: "0123456789",
            password: "12345678"
        }
        usernull = {
            userId : "000"
        }
        authApi.login(acc).then(res => {
            console.log(res);
            sessionStorage.setItem('token', "Bearer " + res.token);
            sessionStorage.setItem('unitDetail',res.unitDetail);
            adminApi.get().then(res=>{
                console.log(res);
                // sessionStorage.setItem('userinfo',JSON.stringify(usernull));
                sessionStorage.setItem('userinfo',JSON.stringify(res.data));
                window.location.href = "./page/manager/manager-home.html";
            }).catch(error=>{
                showToastMessenger('danger', "Có lỗi vui lòng thử lại sau!")
            })
            
        }).catch(error => {
            console.log(error);
            showToastMessenger("danger","Tài khoản không hợp lệ hoặc chưa được duyệt");
        })
    })

    document.querySelector("#btnMedicalStaff").addEventListener('click', () => {
        window.location.href = "./page/medicalstaff/medicalstaff-home.html";
    });

    document.querySelector('#pop1').addEventListener('click', () => {
        console.log("show popup");
        var popupBtns = [{ text: "Thêm", enable: true }, { text: "Sửa", enable: true }, { text: "Xóa", enable: false }]
        resultBtns = showPopupDialog("Cảnh báo", "Bạn có muốn xóa tất cả bản ghi?", popupBtns);
        resultBtns[0].addEventListener('click', () => {
            alert("thêm");
        })
        resultBtns[1].addEventListener('click', () => {
            alert("sửa");
        })
        resultBtns[2].addEventListener('click', () => {
            alert("xóa");
        })
    });

    document.querySelector('#pop2').addEventListener('click', () => {
        hidePopupDialog();
    })
}





