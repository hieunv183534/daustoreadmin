class UnitApi extends BaseApi{
    constructor(){
        super();
        this.apiController = "unit/"
    }

    /**
     * Lay thong tin cua cac don vi con. VD truy van Ha Noi se lay duoc cac quan (khong lay xa) 
     * @param {
     *  unit: unitcode cua don vi: VD: |1|1|
     *  page: trang nao dang duoc truy van - phuc vu cho phan trang
     *  total: tong so cac don vi muon duoc truy van ( mac dinh la 20 don vi)
     *  keyword: tu de seach ten cac don vi
     * } query 
     *
     * 
     * @returns 
     * +, Thành công
     * status: 200 OK
     * {
     *  message: "fetching list of units successfully",
     *  data: unitList,
     * }
     * +, Thất bại
     * status: 403
     * {
     *  err
     * }
     */

     getById(unit,page,total,keyword){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return fetch(this.baseUrl + `${this.apiController}/unit-info?unit=${unit}&page=${page}&total=${total}&keyword=${keyword}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    }

    /**
     * Lay thong tin cua chinh don vi do
     * @param {
     *  unit: unit code cua don vi
     * } params
     * @returns
     * +, Thành công
     * status: 200
     * {
     *      message: "fetching unit successfully",
     *      data: unit,
     * }
     * +, Thất bại
     * status: 403
     * {
     *  err
     * }
     */

    getSingleUnitInfo(unit){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return fetch(this.baseUrl + `${this.apiController}unit-single?unit=${unit}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    }

    /**
     * Cap nhat thong tin cac don vi con. Cac don vi cha, ong se duoc tu dong cap nhap
     * @param {
     * lastUpdateCases: so ca mac moi
     * lastUpdateDeaths: so ca tu vong moi
     * lastUpdateRecovereds: so ca phuc hoi moi
     * } body
     * 
     * @param {
     * unit: unitCode cua don vi can cap nhap
     * } params
     * 
     * @returns 
     * +, Thành công
     * status: 200
     * {
     *  message: "Update successful",
     * }
     * 
     * +, Thất bại
     * status; 500
     * {
     *  err
     * }
     */
    update(body,unit) {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(body),
        };

        return fetch(this.baseUrl + `${this.apiController}/unit-update?unit=${unit}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    }


}