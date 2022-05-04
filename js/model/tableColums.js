
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
            title: "Danh mục",
            width: "min-width: 200px;",
            style: "text-align: center;",
            field: 'categoryName'
        },
        {
            title: "Thẻ",
            width: "min-width: 200px;",
            style: "text-align: center;",
            field: 'tag'
        }
    ]

    static Orders = [
        {
            title : "Mã đơn hàng",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'orderCode'
        },
        {
            title : "Ngày đặt hàng",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'createdAt'
        },
        {
            title : "Sản phẩm",
            width : "min-width: 600px;",
            field: 'items',
            format: 'listitem'
        },
        {
            title : "Tổng tiền",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'totalMoney',
        },
        {
            title : "Người đặt",
            width : "min-width: 200px;",
            style : "text-align: center;",
            format: 'orderer'
        },
        {
            title : "Trạng thái đơn",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'status',
            format: 'status'
        },
        {
            title : "Loại thanh toán",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'paymentMethod',
            format: 'paymentMethod'
        },
        {
            title : "Đã thanh toán",
            width : "min-width: 200px;",
            field: 'paymentStatus',
            style : "text-align: center;",
            format: 'boolean'
        },
        {
            title : "Phí ship",
            width : "min-width: 200px;",
            field: 'shipPayStatus',
            style : "text-align: center;",
            format: 'boolean'
        },
        {
            title : "Ghi chú",
            width : "min-width: 200px;",
            field: 'note',
            style : "text-align: center;",
        }
    ];


    static Vouchers = [
        {
            title : "Mã khuyến mãi",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'voucherCode'
        },
        {
            title : "Mô tả khuyến mãi",
            width : "min-width: 600px;",
            style : "text-align: center;",
            field: 'description'
        },
        {
            title : "Ngày hết hạn",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'dateExpired'
        },
        {
            title : "Số lượng",
            width : "min-width: 200px;",
            style : "text-align: center;",
            field: 'quota'
        }
    ];
}