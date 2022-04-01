managerHome = null;

window.onload = () => {
    unitApi = new UnitApi();
    adminApi = new AdminApi();
    managerHome = new ManagerHome();
}


class ManagerHome extends Base{
    constructor() {
        super();
        this.loadUserInfo();
        this.initEventTable();
    }

    initEventTable(){
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
                adminApi.add(newInfo).then(res=>{
                    showToastMessenger('success',"Thêm thông tin thành công!");
                    this.getUserInfo();
                }).catch(error=>{
                    console.log(error);
                });
            }else{
                adminApi.update(newInfo).then(res=>{
                    showToastMessenger('success',"Cập nhật thông tin thành công!");
                    this.getUserInfo();
                }).catch(error=>{
                    console.log(error);
                });
            }
        });
    }

    getUserInfo() {
        adminApi.get().then(res => {
            sessionStorage.setItem('userinfo', JSON.stringify(res.data));
            window.location.reload();
        }).catch(error => {
            showToastMessenger('danger', "Có lỗi vui lòng thử lại sau!")
        })
    }
}
