authApi = null;
personApi = null;
adminApi = null;
unitApi = null;
unitDetail = null;

window.onload = () => {
    authApi = new AuthApi();
    unitApi = new UnitApi();
    initEvent();
}

function initEvent() {
    document.querySelector('#checkProvince').addEventListener('click', () => {
        if (getValueRGB(document.querySelector('#valueRole')) !== 0) {
            document.querySelector('#valueDistrict input').disabled = true;
            document.querySelector('#valueWard input').disabled = true;
        }
    })
    document.querySelector('#checkDistrict').addEventListener('click', () => {
        if (getValueRGB(document.querySelector('#valueRole')) !== 0) {
            document.querySelector('#valueDistrict input').disabled = false;
            document.querySelector('#valueWard input').disabled = true;
        }
    })
    document.querySelector('#checkWard').addEventListener('click', () => {
        if (getValueRGB(document.querySelector('#valueRole')) !== 0) {
            document.querySelector('#valueDistrict input').disabled = false;
            document.querySelector('#valueWard input').disabled = false;
        }
    })

    document.querySelector('#btnRegister').addEventListener('click', () => {
        var phoneNumber = document.querySelector('#valuePhoneNumber').value;
        var password = document.querySelector('#valuePassword').value;
        var password2 = document.querySelector('#valuePassword2').value;
        var type = getValueRGB(document.querySelector('#valueRole'));
        var unitCode = getUnitCode(type);
        if (password !== password2) {
            showToastMessenger("danger", "Mật khẩu nhập lại chưa khớp!");
        } else {
            newacc = { phoneNumber, password, type, unitCode, unitDetail };
            console.log(newacc);
            authApi.signup(newacc).then(res => {
                showToastMessenger("success", "Đăng kí tài khoản thành công!");
                setTimeout(() => {
                    window.location.href = "./index.html";
                }, 2000)
                console.log(res);
            }).catch(error => {
                if (error.status == 422) {
                    showToastMessenger("danger", "Tài khoản đã tồn tại!");
                } else {
                    showToastMessenger("danger", "Đăng kí thất bại. Vui lòng thử lại sau!");
                }
                console.log(error);
            })
        }
    })
}

function getUnitCode(role) {
    unitDetail = "";
    var province = document.querySelector('#valueProvince input').value;
    var district = document.querySelector('#valueDistrict input').value;
    var ward = document.querySelector('#valueWard input').value;
    if (role == 0) {
        unitDetail = `${ward}, ${district}, ${province}`;
        return document.querySelector('#valueWard').getAttribute('value');
    } else {
        var unitLevel = getValueRGB(document.querySelector('#checkUnit'));
        if (unitLevel == "province") {
            unitDetail = `${province}`;
            return document.querySelector('#valueProvince').getAttribute('value');
        } else if (unitLevel == "district") {
            unitDetail = `${district}, ${province}`;
            return document.querySelector('#valueDistrict').getAttribute('value');
        } else {
            unitDetail = `${ward}, ${district}, ${province}`;
            return document.querySelector('#valueWard').getAttribute('value');
        }
    }
}
