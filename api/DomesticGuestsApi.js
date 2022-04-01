class DomesticGuestsApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "domesticguests/";
    }
    
    /**
     * Tạo 1 bản khai y tế toàn dân
     *  @param {
     * ismovingThroughTerritory: Có đi qua vùng bệnh không /Boolean
     * nCoVSignal: Có dấu hiệu mắc Covid không /Boolean
     * patientContact: Có tiếp xúc với người bệnh hoặc nghi ngờ không /Boolean
     * nCoVConPCountry: Có tiếp xúc với người từ nước có Covid không /Boolean
     * nCoVConPSignal: Có tiếp xúc với người có dấu hiệu mắc nCoV /Boolean
     * } body 
     * @returns 
     * +,Thành công:
     * status: 201
     * {
     *      message: "Update a domestic guests successfully",
     *      link: process.env.SERVER_URL + "/domesticguests/getdomesticguests"
     * }
     * status: 201
     * {
     *      message: "Update a domestic guests successfully",
     *      link: process.env.SERVER_URL + "/domesticguests/getdomesticguests"
     * }
     * 
     * +,Thất bại
     * status: 500
     */
    add(body) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(body),
        };

        return fetch(this.baseUrl + `${this.apiController}` + "adddomesticguests", options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Lấy thông tin 1 bản khai y tế toàn dân
     * @returns 
     * +,Thành công
     * status: 200
     * {
			message: "Get infomation domestic guests successful",
			data: {
				userId,
     *          ismovingThroughTerritory,
     *          nCoVSignal,
     *          patientContact
     *          nCoVConPCountry
     *          nCoVConPSignal
                declarationDate,
			},
		}
     * 
     * +,Thất bại
     * status: 204
     * {
            message: "The account has not yet domestic guests",
        }
     * 
     * status: 500
     */
    get(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}` + "getdomesticquest", options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Xoá 1 bản khai y tế toàn dân
     * @returns 
     * +,Thành công
     * status: 200
     * {
			message: "Delete infomation domestic guests successful",
		}
     * 
     * +,Thất bại
     * status: 204
     * {
            message: "The account has not yet domestic guests",
        }
     * 
     * status: 500
     */
    delete(){
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}` + "deletedomesticquest", options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };
}