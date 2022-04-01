class DeclarationApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "listdeclaration/";
    }

    /**
     * lấy ds khai báo toàn dân
     * @param {*} index 
     * @param {*} count 
     * @param {*} keyword 
     */
    getListDomesticQuest(index, count, keyword) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}getlistdomesticquest?index=${index}&count=${count}&keyword=${keyword}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    }

    /**
     * lấy ds khai báo di chuyển trong nước
     * @param {*} index 
     * @param {*} count 
     * @param {*} keyword 
     */
    getListMoveDeclaration(index, count, keyword) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}getlistmovedeclaration?index=${index}&count=${count}&keyword=${keyword}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    }

    /**
     * lấy ds khai báo nhập cảnh
     * @param {*} index 
     * @param {*} count 
     * @param {*} keyword 
     */
    getListEntryDeclaration(index, count, keyword) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}getlistentrydeclaration?index=${index}&count=${count}&keyword=${keyword}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    }
}