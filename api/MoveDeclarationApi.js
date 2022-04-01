class MoveDeclarationApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "movedeclaration/";
    }

    /**
     * Tạo 1 bản khai y tế di chuyển nội địa
     * @param {
     * vehicle: Phương tiện /String
     * vehicleNumber: Số hiệu phương tiện /String
     * chairNumber: Số ghế /Number
     * departureDay: Ngày khởi hành /Date
     * departureAddress: Địa chỉ xuất phát /String
     * arrivalAddress: Địa chỉ đến /String
     * ismovingThroughTerritory: Có di chuyển qua quốc gia lãnh thổ nào /Boolean
     * nCoVSignal: Có dấu hiệu mắc nCoV /Boolean
     * patientContact: Có tiếp xúc với người bênh hoạc nghi ngờ /Boolean
     * nCoVConPCountry: Có tiếp xúc với người từ nước có nCoV /Boolean
     * nCoVConPSignal: Có tiếp xúc với người có dấu hiệu mắc nCoV /Boolean
     * } body 
     * @returns 
     * +,Thành công
     * status:201 
     * {
     *        message: "Update a move delcaration successfully",
     *        link: process.env.SERVER_URL + "/movedeclaration/getmovedeclaration"
     *    }
     * status:201
     * {
     *        message: "Add a move delcaration successfully",
     *        link: process.env.SERVER_URL + "/movedeclaration/getmovedeclaration"
     *    }
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

        return fetch(this.baseUrl + `${this.apiController}` + "addmovedeclaration", options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Lấy thông tin 1 bản khai y tế di chuyển nội địa
     * @returns 
     * +, Thành công
     * status: 200
     * {
     *	    message: "Get infomation entry declaration successful",
	 *		data: {
     *          userId,
                vehicle,
                vehicleNumber,
                chairNumber,
                departureDay,
                departureAddress,
                arrivalAddress,
                ismovingThroughTerritory,
                nCoVSignal,
                patientContact,
                nCoVConPCountry,
                nCoVConPSignal,
     *          declarationDate,
	 *		},
	 * }
     * 
     * +,Thất bại
     * status: 204
     * {
     *       message: "The account has not yet move declaration",
     * }
     * 
     * status 500
     */
    get(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}` + "getmovedeclaration", options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Xoá 1 bản khai y tế di chuyển nội địa
     * @returns 
     * +, Thành công
     * status: 200
     * {
     *	    message: "Delete infomation move declaration successful",
	 * }
     * 
     * +,Thất bại
     * status: 204
     * {
     *       message: "The account has not yet move declaration",
     * }
     * 
     * status 500
     */
    delete(){
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}` + "deletemovedeclaration", options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };
}