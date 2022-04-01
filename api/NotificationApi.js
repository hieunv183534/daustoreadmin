class NotificationApi extends BaseApi {
    constructor() {
        super();
        this.apiController = "notification/";
    }

    /**
     * Tạo 1 thông báo/khai báo khó khăn
     * @param {
     * notificationId: Nội dung thông báo hoặc khai báo khó khăn
     * title: Tiêu đề
     * } body 
     * @returns
     * +, Thành công
     * status:200
     * {
	 *	    message: "Successful post notification",
	 *	}
     * +, Thất bại
     * status: 400
     * {
     *       message: "Notification Content not null!",
     * }
     * 
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

        return fetch(this.baseUrl + `${this.apiController}` + "postnotification", options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Cập nhật 1 thông báo/khai báo khó khăn
     * @param {
     * notificationId,
     * title, 
     * notificationContent,
     * } body 
     * @returns
     * +, Thành công
     * status:200
     * {
	 *	    message: "Successful edit notification",
	 *	}
     * +, Thất bại
     * status: 400
     * {
     *       message: "Notification Content not null!",
     * }
     * 
     * status: 204
     * {
     *       message: "Fail",
     * }
     * 
     * status: 500 
     */
    update(body) {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(body),
        };

        return fetch(this.baseUrl + `${this.apiController}` + "editnotification", options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Lấy danh sách các thông báo/khai báo khó khăn đã tạo của bản thân
     * @param {
     * index,
     * count, 
     * } query
     * @returns
     * +,Thành công
     * status: 200
     *{
            message: "Successful get notification",
            data: [
                {
                    type,
                    notificationId,
				    title,
                    notificationContent,
                    timePost,
                    unitName,
                    posterName,
                    unitDetal,
                }
            ]
        } 
     * +,Thất bại
     * status: 204
     * {
     *       message: "Have not notification"
     * }
     * 
     * status: 500       
     */
    get(index,count){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}getnotification?index=${index}&count=${count}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

        /**
         * Xoá một thông báo/khai báo khó khăn đã tạo của bản thân mà chưa được duyệt
         * @param {
         * notificationId,
         * } body 
         * @returns
         * +,Thành công
         * status: 200
         *{
         *       message: "Successful delete notification",
         *} 
         * +,Thất bại
         * status: 204
         * {
         *       message: "Fail"
         * }
         * 
         * status: 500       
         */
    delete(body){
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(body),
        };

        return fetch(this.baseUrl + `${this.apiController}` + "deletenotification", options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Lấy danh sách các thông báo/khai báo khó khăn cần duyệt(thuộc quyền quản lý)
     * @param {
     * index,
     * count, 
     * } query
     * @returns 
     * +, Thành công
     * status:200
     * {
			message: "Successfully",
			data: [
			    {
                    type,
                    notificationId,
				    title,
                    notificationContent,
                    timePost,
                    unitName,
                    posterName,
                    unitDetal,
                },...
            ],
		}
     * +, Thất bại
     * status: 204
     * {
            message: "Have not notification",
       }
     * 
     * status: 500    
     */
    getListNotification(index,count){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}getlistnotification?index=${index}&count=${count}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Duyệt thông báo/khai báo khó khăn của người khác thuộc quyền hạn
     * @param {
     * notificationId
     * } body 
     * @returns
     * +,Thành công
     * status: 200
     * {
            message: "Successfully",
        }
     * 
     * +,Thất bại
     * status: 403
     * {
                        message: "Fail",
        }
     * status: 400
     * {
                        message: "notificationId error",
        }
     *  status: 500
     */
    browsingNotification(body){
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(body),
        };

        return fetch(this.baseUrl + `${this.apiController}` + "browsingNotification", options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Lấy danh sách các thông báo của nhân viên y tế cấp cao hơn hoặc bằng(cùng cấp phường, quận xã)
     * @param {
     * index,
     * count, 
     * } body 
     * @returns 
     * +, Thành công
     * status:200
     * {
			message: "Successfully",
			data: [
			    {
                    type,
                    notificationId,
				    title,
                    notificationContent,
                    timePost,
                    unitName,
                    posterName,
                    unitDetal,
                },...
            ],
		}
     * +, Thất bại
     * status: 204
     * {
            message: "Have not notification",
       }
     * 
     * status: 500    
     */
    viewMedicalNotification(index,count){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}viewmedicalnotification?index=${index}&count=${count}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Lấy danh sách các thông báo của quản lý cấp cao hơn hoặc bằng(cùng cấp phường, quận xã)
     * @param {
     * index,
     * count, 
     * } body 
     * @returns 
     * +, Thành công
     * status:200
     * {
			message: "Successfully",
			data: [
			    {
                    type,
                    notificationId,
				    title,
                    notificationContent,
                    timePost,
                    unitName,
                    posterName,
                    unitDetal,
                },...
            ],
		}
     * +, Thất bại
     * status: 204
     * {
            message: "Have not notification",
       }
     * 
     * status: 500    
     */
    viewAdminNotification(index,count){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}viewadminnotification?index=${index}&count=${count}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

    /**
     * Lấy danh sách các khai báo khó khăn của người dân
     * @param {
     * index,
     * count, 
     * } body 
     * @returns 
     * +, Thành công
     * status:200
     * {
			message: "Successfully",
			data: [
			    {
                    type,
                    notificationId,
				    title,
                    notificationContent,
                    timePost,
                    unitName,
                    posterName,
                    unitDetal,
                },...
            ],
		}
     * +, Thất bại
     * status: 204
     * {
            message: "Have not notification",
       }
     * 
     * status: 500    
     */
    viewDifficultNotification(index,count){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
        };

        return fetch(this.baseUrl + `${this.apiController}viewdifficultnotification?index=${index}&count=${count}`, options).then(res => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject(res);
            }
        });
    };

}