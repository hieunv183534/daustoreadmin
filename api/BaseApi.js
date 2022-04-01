class BaseApi{
    constructor(){
        this.baseUrl = 'https://n8-covid-be.herokuapp.com/';
        this.apiController = null;
    }

    getById(id){

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        };

        return fetch(this.baseUrl + `${this.apiController}/${id}`, options).then(res => {
            return res.json()
        });
    };

    add(body){

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(body),
        };

        return fetch(this.baseUrl + `${this.apiController}`, options).then(res => {
            return res.json()
        });
    };

    update(body){

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            },
            body: JSON.stringify(body),
        };

        return fetch(this.baseUrl + `${this.apiController}`, options).then(res => {
            return res.json()
        });
    };

    getList(index,count){

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        };

        return fetch(this.baseUrl + `${this.apiController}?index=${index}&count=${count}`, options).then(res => {
            return res.json()
        });
    };
}


class ClassError extends Error {

    constructor(message = 'Something went wrong', data = '', code = '') {
      super();
      this.message = message;
      this.data = data;
      this.code = code;
    }
  
  }