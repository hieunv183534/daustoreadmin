
class AuthApi extends BaseApi {
    constructor(){
        super();
        this.apiController = "auth/"
    }

    /**
     * dang ky tai khoan
     * @param {
     *  phoneNumber: so dien thoai
     * password: mat khau
     * type: chon chuc vu: 0- nguoi dan, 1- nhan vien y te, 2- admin
     * unitCode: ma unicode cua don vi
     * } body
     * 
     * @returns
     * +, Thành công
     * {
     *      message: "Signup successful",
     *      userId: result._id,
     *      
     * }
     * +, Thất bại
     * status: 400
     * {
     *  err
     * }
     */
    signup(body){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': localStorage['token']
            },
            body: JSON.stringify(body),
        };

        return fetch(this.baseUrl + `${this.apiController}` + "/signup", options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    }

    /**
     * dang nhap tai khoan
     * @param {
     *  phoneNumber: so dien thoai

     * password: mat khau
     * } body
     * 
     * @returns
     * +, Thành công
     * {
     *      token,
     *      type,
     *      unitCode,
     *      UnitDetail
     *      userId: loadedUser._id.toString(),
     * }
     * +, Thất bại
     * status: 400
     * {
     *  err
     * }
     */
    login(body){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };

        return fetch(this.baseUrl + `${this.apiController}` + "/login", options).then(res => {
            if(res.ok){
                return res.json()
            }else{
                return Promise.reject(res);
            }
        });
    }
}