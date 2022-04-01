class AccountApi extends BaseApi{
    constructor(){
        super();
        this.apiController = "account/";
    }

    /**
     * Lấy về danh sách tài khoản nhân viên y tế cần duyệt
     * @param {
     * index,
     * count,
     * keyword, 
     * } query 
     * @returns 
     * +, Thành công
     * status:200
     * {
			message: "Successfully",
			data: [
			    {
                    userId,
				    phoneNumber,
                    unitCode,
                    unitDetail,
                },...
            ],
		}
     * +, Thất bại
     * status: 204
     * {
            message: "No medical account to approve",
       }
     * 
     * status: 500    
     */
    getListMedical(index, count, keyword){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}getListMedical?index=${index}&count=${count}&keyword=${keyword}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Lấy về danh sách tài khoản quản lý cần duyệt
     * @param {
     * index,
     * count,
     * keyword 
     * } query
     * @returns 
     * +, Thành công
     * status:200
     * {
			message: "Successfully",
			data: [
			    {
                    userId,
				    phoneNumber,
                    unitCode,
                    unitDetail,
                },...
            ],
		}
     * +, Thất bại
     * status: 204
     * {
            message: "No admin account to approve",
        }
     * 
     * status: 500    
     */
    getListAdmin(index,count,keyword){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}getListAdmin?index=${index}&count=${count}&keyword=${keyword}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Duyệt tài khoản
     * @param {
     * userId,
     * status, /0 là xoá, 1 là duyệt 
     * } body 
     * @returns 
     * +, Thành công
     * status:200
     * {
			message: "Successfully",
		}
     * +, Thất bại
     * status: 403
     * {
            message: "Fail",
        }
     * 
     * status: 500    
     */
    accountBrowsing(body){
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(body),
        };

        return fetch(this.baseUrl + `${this.apiController}` + "accountbrowsing", options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };
}