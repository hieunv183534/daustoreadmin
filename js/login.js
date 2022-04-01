authApi = null;
personApi = null;
adminApi = null;
medicalApi = null;
unitApi = null;

window.onload = ()=>{
    authApi = new AuthApi();
    personApi = new PersonApi();
    medicalApi = new MedicalApi();
    adminApi = new AdminApi();
    unitApi = new UnitApi();
    loadListProvince();
    initEvent();
}

function loadListProvince(){
    unitApi.getById('|',1,70,'').then(res=>{
        console.log(res.data);
        localStorage.setItem('listProvince',JSON.stringify(res.data));
    }).catch(error=>{
        console.log(error);
    });
}

function initEvent(){
    usernull = {
        userId : "000"
    };

    document.querySelector('#btnLogin').addEventListener('click',()=>{
        acc = {
            phoneNumber: document.querySelector('#valuePhoneNumber').value,
            password: document.querySelector('#valuePassword').value
        };
        authApi.login(acc).then(res => {
            console.log(res);
            showToastMessenger("success","Đăng nhập thành công!");
            sessionStorage.setItem('token', "Bearer " + res.token);
            sessionStorage.setItem('unitDetail',res.unitDetail);
            sessionStorage.setItem('userUnitCode',res.unitCode);
            sessionStorage.setItem('phoneNumber',acc.phoneNumber);
            if(res.type == 0){
                personApi.get().then(res1=>{
                    sessionStorage.setItem('userinfo',JSON.stringify(res1.data));
                    window.location.href = "./page/cilivian/cilivian-home.html";
                }).catch(error=>{
                    if(error.status == 405){
                        sessionStorage.setItem('userinfo',JSON.stringify(usernull));
                        window.location.href = "./page/cilivian/cilivian-home.html";
                    }else{
                        showToastMessenger("danger","Không lấy được dữ liệu người dùng.Vui lòng đăng nhập lại!");
                    }
                })
            }else if(res.type == 1){
                medicalApi.get().then(res1=>{
                    console.log(res1);
                    sessionStorage.setItem('userinfo',JSON.stringify(res1.data));
                    window.location.href = "./page/medicalstaff/medicalstaff-home.html";
                }).catch(error=>{
                    if(error.status == 405){
                        sessionStorage.setItem('userinfo',JSON.stringify(usernull));
                        window.location.href = "./page/medicalstaff/medicalstaff-home.html";
                    }else{
                        showToastMessenger("danger","Không lấy được dữ liệu người dùng.Vui lòng đăng nhập lại!");
                    }
                })
            }else{
                adminApi.get().then(res1=>{
                    sessionStorage.setItem('userinfo',JSON.stringify(res1.data));
                    window.location.href = "./page/manager/manager-home.html";
                }).catch(error=>{
                    if(error.status == 405){
                        sessionStorage.setItem('userinfo',JSON.stringify(usernull));
                        window.location.href = "./page/manager/manager-home.html";
                    }else{
                        showToastMessenger("danger","Không lấy được dữ liệu người dùng.Vui lòng đăng nhập lại!");
                    }
                })
            }
        }).catch(error => {
            if(error.status== 401){
                showToastMessenger("danger","Tài khoản chưa được duyệt");
            }else{
                showToastMessenger("danger","Sai số điện thoại hoặc mật khẩu!");
            }
        });
    })
}