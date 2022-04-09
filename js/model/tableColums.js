
class listColums {

    static Items = [
        {
            title: "Mã sản phẩm",
            width: "min-width: 200px;",
            style: "text-align: center;",
            field: 'itemCode'
        },
        {
            title: "Tên sản phẩm",
            width: "min-width: 200px;",
            style: "text-align: center;",
            field: 'itemName'
        },
        {
            title: "Giá ban đầu",
            width: "min-width: 200px;",
            style: "text-align: center;",
            field: 'realPrice'
        },
        {
            title: "Phầm trăm khuyến mãi",
            width: "min-width: 200px;",
            style: "text-align: center;",
            field: 'saleRate'
        },
        {
            title: "Mô tả sản phẩm",
            width: "min-width: 200px; max-width:1000px;",
            style: "text-align: center;",
            field: 'itemDescription'
        },
    ]

    static Orders = [
        {
            title : "Mã đơn hàng",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'orderId'
        },
        {
            title : "Ngày đặt hàng",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'orderDate'
        },
        {
            title : "Sản phẩm",
            width : "min-width: 600px;",
            field: 'listItem',
            format: 'listitem'
        },
        {
            title : "Người đặt",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'orderer',
            format: 'orderer'
        },
        {
            title : "Trạng thái đơn",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'orderStatus'
        },
        {
            title : "Loại thanh toán",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'paymentMethod'
        },
        {
            title : "Đã thanh toán",
            width : "min-width: 200px;",
            field: 'paymentStatus',
            style : "text-align: center;",
            format: 'boolean'
        }
    ];
}