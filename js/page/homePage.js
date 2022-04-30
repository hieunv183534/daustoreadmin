homePage = null;
window.onload = () => {
    showChart();
    showToastMessenger('success',  "Đăng nhập thành công!")
    homePage = new HomePage();
}


class HomePage extends Base {
    constructor() {
        super();
        this.mode = 1;
        this.initEvent();
    }

    initEvent() {

        let order = {
            "orderCode": "DH16513283616798",
            "buyerName": "Nguyễn Bảo Trâm111",
            "phone": "0974300198",
            "address": "32 Bằng Liệt",
            "unitCode": "unitCode",
            "status": 2,
            "paymentMethod": 1,
            "paymentStatus": true,
            "items": "2|a802a0e8-c81c-11ec-b950-00155e1f4204|139999",
            "totalMoney": 139999,
            "ship": "Đơn hàng trên 200k sẽ được free ship! Hàng sẽ được giao từ 2-7 ngày tùy nơi đặt.",
            "shipPayStatus": true,
            "note": "string",
            "voucherId": "00000000-0000-0000-0000-000000000000",
            "createdAt": "2022-04-30T07:19:22",
            "modifiedAt": "0001-01-01T00:00:00"
        };

        this.API.deleteOrder('880d2686-c890-11ec-b950-00155e1f4204').done(res=>{
            console.log(res);
        }).fail(err=>{
            console.log(err.responseJSON);
            console.log(err);
        })

    }
}

function showChart(){
    var options = {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Số lượt truy cập và đơn được chốt"
        },
        axisX:{
            valueFormatString: "DD MMM"
        },
        axisY: {
            title: "Số lượng",
            suffix: "",
            minimum: 30
        },
        toolTip:{
            shared:true
        },  
        legend:{
            cursor:"pointer",
            verticalAlign: "bottom",
            horizontalAlign: "left",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: [{
            type: "line",
            showInLegend: true,
            name: "Lượt truy cập",
            markerType: "square",
            xValueFormatString: "DD MMM, YYYY",
            color: "#F08080",
            yValueFormatString: "#,##0 Lượt",
            dataPoints: [
                { x: new Date(2017, 10, 1), y: 63 },
                { x: new Date(2017, 10, 2), y: 69 },
                { x: new Date(2017, 10, 3), y: 65 },
                { x: new Date(2017, 10, 4), y: 70 },
                { x: new Date(2017, 10, 5), y: 71 },
                { x: new Date(2017, 10, 6), y: 65 },
                { x: new Date(2017, 10, 7), y: 73 },
                { x: new Date(2017, 10, 8), y: 96 },
                { x: new Date(2017, 10, 9), y: 84 },
                { x: new Date(2017, 10, 10), y: 85 },
                { x: new Date(2017, 10, 11), y: 86 },
                { x: new Date(2017, 10, 12), y: 94 },
                { x: new Date(2017, 10, 13), y: 97 },
                { x: new Date(2017, 10, 14), y: 86 },
                { x: new Date(2017, 10, 15), y: 89 }
            ]
        },
        {
            type: "line",
            showInLegend: true,
            name: "Số đơn",
            lineDashType: "dash",
            yValueFormatString: "#,##0 Đơn",
            dataPoints: [
                { x: new Date(2017, 10, 1), y: 60 },
                { x: new Date(2017, 10, 2), y: 57 },
                { x: new Date(2017, 10, 3), y: 51 },
                { x: new Date(2017, 10, 4), y: 56 },
                { x: new Date(2017, 10, 5), y: 54 },
                { x: new Date(2017, 10, 6), y: 55 },
                { x: new Date(2017, 10, 7), y: 54 },
                { x: new Date(2017, 10, 8), y: 69 },
                { x: new Date(2017, 10, 9), y: 65 },
                { x: new Date(2017, 10, 10), y: 66 },
                { x: new Date(2017, 10, 11), y: 63 },
                { x: new Date(2017, 10, 12), y: 67 },
                { x: new Date(2017, 10, 13), y: 66 },
                { x: new Date(2017, 10, 14), y: 56 },
                { x: new Date(2017, 10, 15), y: 64 }
            ]
        }]
    };
    $("#chartContainer").CanvasJSChart(options);
    
    function toogleDataSeries(e){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else{
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
}
