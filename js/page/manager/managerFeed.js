managerFeed = null;

window.onload = () => {
    notificationApi = new NotificationApi();
    managerFeed = new ManagerFeed();
}

class ManagerFeed extends Base{
    constructor() {
        super();
        this.mode = 1;
        this.initEvent();
        this.loadHeaderInfo();
        this.loadNotification(this.mode);
    }

    initEvent(){
        document.querySelector('#cilivianPost').addEventListener('click',()=>{
            this.mode = 1;
            this.index=0;
            this.count=100;
            this.loadNotification(this.mode);
            document.querySelector('.post-list').setAttribute('mode', "default")
        });
        document.querySelector('#medicalStaffPost').addEventListener('click',()=>{
            this.mode = 2;
            this.index=0;
            this.count=100;
            this.loadNotification(this.mode);
            document.querySelector('.post-list').setAttribute('mode', "default")
        });
        document.querySelector('#managerPost').addEventListener('click',()=>{
            this.mode = 3;
            this.index=0;
            this.count=100;
            this.loadNotification(this.mode);
            document.querySelector('.post-list').setAttribute('mode', "default")
        });
        document.querySelector('#seftPost').addEventListener('click',()=>{
            this.mode = 4;
            this.index=0;
            this.count=100;
            this.loadNotification(this.mode);
            document.querySelector('.post-list').setAttribute('mode', "seft");
        });
        document.querySelector('#approvePost').addEventListener('click',()=>{
            this.mode = 5;
            this.index=0;
            this.count=100;
            this.loadNotification(this.mode);
            document.querySelector('.post-list').setAttribute('mode', "approve");
        });
        document.querySelector('#btnAddNewPost').addEventListener('click',()=>{
            this.postMode = "add";
            document.querySelector('#valueTitle').value = "";
            document.querySelector('#valueContent').value = "";
            document.querySelector('.dialog').classList.add('d-block');
        });
        document.querySelector('.close-from').addEventListener('click',()=>{
            document.querySelector('.dialog').classList.remove('d-block');
        });

        document.querySelector("#btnRefresh").addEventListener("click", () => {
            this.loadNotification(this.mode);
        })
    }
}