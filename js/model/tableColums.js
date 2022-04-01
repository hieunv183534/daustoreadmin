
class listColums {

    static User = [
        {
            title : "Họ tên",
            width : "200px",
            field: 'name'
        },
        {
            title : "Ngày sinh",
            width : "150px",
            field: 'dob'
        },
        {
            title : "Địa chỉ",
            width : "250px",
            field: 'address'
        },
        {
            title : "Số điện thoại",
            width : "100px",
            field: 'phoneNumber'
        },
        {
            title : "Email",
            width : "150px",
            field: 'email'
        }
    ];

    static Unit = [
        {
            title : "Tên đơn vị",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'unitName'
        },
        {
            title : "Mã đơn vị",
            style : "text-align: left;",
            width: "min-width: 150px;",
            field: 'unitCode'
        },
        {
            title : "Mức báo động",
            style : "text-align: left;",
            width: "min-width: 120px;",
            field: 'warningLevel'
        },
        {
            title : "Tổng số ca nhiễm",
            style : "text-align: right;  background-color: #edd8bb33;",
            width: "min-width: 250px;",
            field: 'totalCases'
        },
        {
            title : "Tổng số ca tử vong",
            style : "text-align: right;  background-color: #f5b8b833;",
            width: "min-width: 250px;",
            field: 'totalDeaths'
        },
        {
            title : "Tổng số ca phục hồi",
            style : "text-align: right; background-color: #afebae33;",
            width: "min-width: 250px;",
            field: 'totalRecovereds'
        },
        {
            title : "Số ca nhiễm mới",
            style : "text-align: right;  background-color: #edd8bb33;",
            width: "min-width: 250px;",
            field: 'lastUpdateCases'
        },
        {
            title : "Số ca tử vong mới",
            style : "text-align: right;  background-color: #f5b8b833;",
            width: "min-width: 250px;",
            field: 'lastUpdateDeaths'
        },
        {
            title : "Số ca phục hồi mới",
            style : "text-align: right; background-color: #afebae33;",
            width: "min-width: 250px;",
            field: 'lastUpdateRecovereds'
        }
    ];

    static Account = [
        {
            title : "Số điện thoại",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'phoneNumber'
        },
        {
            title : "Mã đơn vị",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'unitCode'
        },
        {
            title : "Thông tin đơn vị",
            style : "text-align: left;",
            width: "min-width: 600px;",
            field: 'unitDetail'
        }
    ]

    static DomesticQuest = [
        {
            title : "Họ và tên",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'info',
            field1: "fullName"
        },
        {
            title : "Ngày sinh",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'info',
            field1: "dateOfBirth",
            format: "date"
        },
        {
            title : "Số điện thoại",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: "phoneNumber"
        },
        {
            title : "Quốc tịch",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'info',
            field1: "nationality"
        },
        {
            title : "Thuộc đơn vị quản lí",
            style : "text-align: left;",
            width: "min-width: 500px;",
            field: 'unitDetail'
        },
        {
            title : "Có đi qua vùng bệnh",
            style : "text-align: center;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'ismovingThroughTerritory',
            format: "boolean"
        },
        {
            title : "Có đi dấu hiệu mắc covid",
            style : "text-align: center;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'nCoVSignal',
            format: "boolean"
        },
        {
            title : "Có tiếp xúc với người bệnh,nghi ngờ",
            style : "text-align: center;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'patientContact',
            format: "boolean"
        },
        {
            title : "Có tiếp xúc với người từ nước có Covid không",
            style : "text-align: center;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'nCoVConPCountry',
            format: "boolean"
        },
        {
            title : "Có tiếp xúc với người có dấu hiệu mắc nCoV",
            style : "text-align: center;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'nCoVConPSignal',
            format: "boolean"
        },
    ]

    static MoveDeclaration = [
        {
            title : "Họ và tên",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'info',
            field1: "fullName"
        },
        {
            title : "Ngày sinh",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'info',
            field1: "dateOfBirth",
            format: "date"
        },
        {
            title : "Số điện thoại",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: "phoneNumber"
        },
        {
            title : "Quốc tịch",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'info',
            field1: "nationality"
        },
        {
            title : "Thuộc đơn vị quản lí",
            style : "text-align: left;",
            width: "min-width: 500px; ",
            field: 'unitDetail'
        },
        {
            title : "Phương tiện",
            style : "text-align: left;",
            width: "min-width: 150px;",
            field: 'declaration',
            field1:'vehicle'
        },
        {
            title : "Số hiệu phương tiện",
            style : "text-align: left;",
            width: "min-width: 150px;",
            field: 'declaration',
            field1:'vehicleNumber'
        },
        {
            title : "Số ghế",
            style : "text-align: left;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'chairNumber'
        },
        {
            title : "Ngày khởi hành",
            style : "text-align: left;",
            width: "min-width: 200px;",
            field: 'declaration',
            field1:'departureDay',
            format: "date"
        },
        {
            title : "Địa chỉ xuất phát",
            style : "text-align: left;",
            width: "min-width: 200px;",
            field: 'declaration',
            field1:'departureAddress'
        },
        {
            title : "Địa chỉ đến",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'arrivalAddress'
        },
        {
            title : "Có di chuyển qua quốc gia lãnh thổ nào",
            style : "text-align: center;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'ismovingThroughTerritory',
            format: "boolean"
        },
        {
            title : "Có đi dấu hiệu mắc covid",
            style : "text-align: center;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'nCoVSignal',
            format: "boolean"
        },
        {
            title : "Có tiếp xúc với người bệnh,nghi ngờ",
            style : "text-align: center;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'patientContact',
            format: "boolean"
        },
        {
            title : "Có tiếp xúc với người từ nước có Covid không",
            style : "text-align: center;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'nCoVConPCountry',
            format: "boolean"
        },
        {
            title : "Có tiếp xúc với người có dấu hiệu mắc nCoV",
            style : "text-align: center;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'nCoVConPSignal',
            format: "boolean"
        },
    ]


    static EntryDeclaration = [
        {
            title : "Họ và tên",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'info',
            field1: "fullName"
        },
        {
            title : "Ngày sinh",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'info',
            field1: "dateOfBirth",
            format: "date"
        },
        {
            title : "Số điện thoại",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: "phoneNumber"
        },
        {
            title : "Quốc tịch",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'info',
            field1: "nationality"
        },
        {
            title : "Thuộc đơn vị quản lí",
            style : "text-align: left;",
            width: "min-width: 500px; ",
            field: 'unitDetail'
        },
        {
            title : "Đối tượng",
            style : "text-align: left;",
            width: "min-width: 150px;",
            field: 'declaration',
            field1:'object'
        },
        {
            title : "Cửa khẩu",
            style : "text-align: left;",
            width: "min-width: 200px;",
            field: 'declaration',
            field1:'date'
        },
        {
            title : "Phương tiện",
            style : "text-align: left;",
            width: "min-width: 150px;",
            field: 'declaration',
            field1:'vehicle'
        },
        {
            title : "Số hiệu phương tiện",
            style : "text-align: left;",
            width: "min-width: 150px;",
            field: 'declaration',
            field1:'vehicleNumber'
        },
        {
            title : "Số ghế",
            style : "text-align: left;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'chairNumber'
        },
        {
            title : "Ngày khởi hành",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'departureDay',
            format: "date"
        },
        {
            title : "Ngày nhập cảnh",
            style : "text-align: left;",
            width: "min-width: 150px;",
            field: 'declaration',
            field1:'entryDate',
            format: "date"
        },
        {
            title : "Quốc gia khởi hành",
            style : "text-align: left;",
            width: "min-width: 150px;",
            field: 'declaration',
            field1:'departureCountry'
        },
        {
            title : "Thành phố khởi hành",
            style : "text-align: left;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'departureCity'
        },
        {
            title : "Quốc gia cần đến",
            style : "text-align: left;",
            width: "min-width: 200px;",
            field: 'declaration',
            field1:'destinationCountry'
        },
        {
            title : "Đã đi qua quốc gia nào",
            style : "text-align: left;",
            width: "min-width: 200px;",
            field: 'declaration',
            field1:'passingCountry'
        },
        {
            title : "Địa chỉ lưu trú sau cách ly tập trung",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'addressAfterQuarantine'
        },
        {
            title : "Loại Vacxin đã sử dụng",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'vaccinesUsed'
        },
        {
            title : "Cơ sở cách ly",
            style : "text-align: left;",
            width: "min-width: 250px;",
            field: 'declaration',
            field1:'isolationFacility'
        },
        {
            title : "Ho",
            style : "text-align: center;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'fever',
            format: "boolean"
        },
        {
            title : "Sốt",
            style : "text-align: center;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'cough',
            format: "boolean"
        },
        {
            title : "Khó thở",
            style : "text-align: center;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'stuffy',
            format: "boolean"
        },
        {
            title : "Đau họng",
            style : "text-align: center;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'soreThroat',
            format: "boolean"
        },
        {
            title : "Nôn",
            style : "text-align: center;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'nausea',
            format: "boolean"
        },
        {
            title : "Tiêu chảy",
            style : "text-align: center;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'diarrhea',
            format: "boolean"
        },
        {
            title : "Xuất huyết",
            style : "text-align: center;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'hemorrhage',
            format: "boolean"
        },
        {
            title : "Nổi ban",
            style : "text-align: center;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'rash',
            format: "boolean"
        },
        {
            title : "Có tiếp xúc với động vật hay cơ sở giết mổ",
            style : "text-align: center;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'animalContact',
            format: "boolean"
        },
        {
            title : "Có tiếp xúc với người mắc nCoV",
            style : "text-align: center;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'nCoVPContact',
            format: "boolean"
        },
        {
            title : "Xác nhận âm tính",
            style : "text-align: center;",
            width: "min-width: 100px;",
            field: 'declaration',
            field1:'negativeConfirmation',
            format: "boolean"
        }
    ]

}