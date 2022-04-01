cilivianHome = null;
window.onload = () => {
    personApi = new PersonApi();
    unitApi = new UnitApi();
    cilivianHome = new CilivianHome();
}


class CilivianHome extends Base {
    constructor() {
        super();
        this.loadUserInfo();
        this.initEvent();
    }

    initEvent() {
        document.querySelector('#btnUpdateUserInfo').addEventListener('click', () => {

            var newInfo={
                fullName: document.querySelector('#valueFullName').value,
                dateOfBirth: new Date(document.querySelector('#valueDateOfBirth').value) ,
                address: document.querySelector('#valueAddress').value,
                nationality: document.querySelector('#valueNationality').value,
                Sex: getValueRGB(document.querySelector('#valueSex')),
                diseaseStatus: getValueRGB(document.querySelector('#valueDiseaseStatus')),
                addressCode: document.querySelector('#valueWard').getAttribute('value')
            }
            console.log(newInfo);

            var userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
            if (userinfo.userId === "000"){
                personApi.add(newInfo).then(res=>{
                    showToastMessenger('success',"Thêm thông tin thành công!");
                    this.getUserInfo();
                }).catch(error=>{
                    console.log(error);
                })
            }else{
                personApi.update(newInfo).then(res=>{
                    showToastMessenger('success',"Cập nhật thông tin thành công!");
                    this.getUserInfo();
                }).catch(error=>{
                    console.log(error);
                })
            }
        });
    }

    getUserInfo() {
        personApi.get().then(res => {
            sessionStorage.setItem('userinfo', JSON.stringify(res.data));
            window.location.reload();
        }).catch(error => {
            showToastMessenger('danger', "Có lỗi vui lòng thử lại sau!")
        })
    }
}
