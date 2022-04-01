cilivianDeclaration = null;
domesticGuestApi = null;
moveDeclarationApi = null;
entryDeclarationApi = null;

window.onload = () => {
    domesticGuestApi = new DomesticGuestsApi();
    moveDeclarationApi = new MoveDeclarationApi();
    entryDeclarationApi = new EntryDeclarationApi();
    cilivianDeclaration = new CilivianDeclaration();
    
}


class CilivianDeclaration extends Base{
    constructor() {
        super();
        this.initEvent();
        this.loadHeaderInfo();
    }

    initEvent(){
        document.querySelector('#declaration1').addEventListener('click',()=>{
            this.chooseDeclarationType(1);
            
        });
        document.querySelector('#declaration2').addEventListener('click',()=>{
            this.chooseDeclarationType(2);
            
        });
        document.querySelector('#declaration3').addEventListener('click',()=>{
            this.chooseDeclarationType(3);
            
        });

        document.querySelector('#btnDeclare1').addEventListener('click',()=>{
             var ismovingThroughTerritory =getBoolean( document.querySelector('#domes1'));
             var nCoVSignal = getBoolean(document.querySelector('#domes2'));
             var patientContact = getBoolean(document.querySelector('#domes3'));
             var nCoVConPCountry = getBoolean(document.querySelector('#domes4'));
             var nCoVConPSignal = getBoolean(document.querySelector('#domes5'));

             var newDeclare = {ismovingThroughTerritory, nCoVSignal, patientContact, nCoVConPCountry, nCoVConPSignal};
             console.log("hit");
             console.log(newDeclare);
             domesticGuestApi.add(newDeclare).then(res=>{
                showToastMessenger('success',"Khai báo thành công!");
            }).catch(error=>{
                console.log(error);
            });
         })

         document.querySelector('#btnDeclare2').addEventListener('click',()=>{
             
            var vehicle = document.querySelector('#vehicle').value;
            var  vehicleNumber = document.querySelector('#vehicleNumber').value;
            var chairNumber =Number( document.querySelector('#chairNumber').value );
            var departureDay = document.querySelector('#departureDay').value;
            var departureAddress = document.querySelector('#departureAddress').value;
            var arrivalAddress = document.querySelector('#arrivalAddress').value;
            var ismovingThroughTerritory = getBoolean(document.querySelector('#move1'));
            var nCoVSignal = getBoolean(document.querySelector('#move2'));
            var patientContact = getBoolean(document.querySelector('#move3'));
            var nCoVConPCountry = getBoolean(document.querySelector('#move4'));
            var nCoVConPSignal = getBoolean(document.querySelector('#move5'));
            
            var newMove = {vehicle,vehicleNumber,chairNumber,departureDay ,
                departureAddress,arrivalAddress , ismovingThroughTerritory,
            nCoVSignal,patientContact,nCoVConPCountry,nCoVConPSignal};
            
            console.log(newMove);
            
            moveDeclarationApi.add(newMove).then(res=>{
                showToastMessenger('success',"Khai báo thành công!");
            }).catch(error=>{
                console.log(error);
            });
            
         })

         /**
          * object: Đối tượng(nước ngoài hay Vn, ...) /String
     * gate: Cửa khẩu /String
     * vehicle: Phương tiện /String
     * vehicleNumber: Số hiệu phương tiện /String 
     * chairNumber: Số ghế /Number
     * departureDay: Ngày khởi hành /Date
     * entryDate: Ngày nhập cảnh /Date
     * departureCountry: Quốc gia khởi hành /String
     * departureCity: Thành phố khởi hành /String
     * destinationCountry: Quốc gia cần đến /String
     * passingCountry: Đã đi qua quốc gia nào /String
     * addressAfterQuarantine: Địa chỉ lưu trú sau cách ly tập trung /String
     * fever: Ho /Boolean
     * cough: Sốt /Boolean
     * stuffy: Khó thở /Boolean
     * soreThroat: Đau họng /Boolean
     * nausea: nôn /Boolean
     * diarrhea: Tiêu chảy /Boolean
     * hemorrhage: Xuất huyết /Boolean
     * rash: Nổi ban /Boolean
     * vaccinesUsed: Loại Vacxin đã sử dụng /String
     * animalContact: Có tiếp xúc với động vật hay cơ sở giết mổ /Boolean
     * nCoVPContact: Có tiếp xúc với người mắc nCoV /Boolean
     * isolationFacility: Cơ sở cách ly /String
     * negativeConfirmation: xác nhận âm tính// boolean
     */
    document.querySelector('#btnDeclare3').addEventListener('click',()=>{
         var object = document.querySelector('#object').value;
         var gate = document.querySelector('#gate').value;
         var vehicle = "";
         var vehicleNumber = document.querySelector('#vehicleNumber').value;
         var chairNumber = document.querySelector('#chairNumber').value;
         var departureDay = document.querySelector('#departureDay').value;
         var entryDate = document.querySelector('#entryDate').value;
         var departureCountry = document.querySelector('#departureCountry').value;
         var departureCity = document.querySelector('#departureCity').value; 
         var destinationCountry = document.querySelector('#destinationCountry').value;
         var passingCountry = document.querySelector('#passingCountry').value;
         var addressAfterQuarantine = document.querySelector('#addressAfterQuarantine').value;
         var vaccinesUsed = document.querySelector('#vaccinesUsed').value;
         var isolationFacility = document.querySelector('#isolationFacility').value;
         var fever  = getBoolean(document.querySelector('#fever'));
         var cough = getBoolean(document.querySelector('#cough'));
         var soreThroat = getBoolean(document.querySelector('#soreThroat'));
         var nausea = getBoolean(document.querySelector('#nausea'));
         var diarrhea = getBoolean(document.querySelector('#diarrhea'));
         var hemorrhage = getBoolean(document.querySelector('#hemorrhage'));
         var rash = getBoolean(document.querySelector('#rash'));
         var animalContact = getBoolean(document.querySelector('#animalContact'));
         var nCoVPContact = getBoolean(document.querySelector('#nCoVPContact'));
         var negativeConfirmation = getBoolean(document.querySelector('#negativeConfirmation'));
            
         var newEntry = {
             object,
             gate,
             vehicle,
             vehicleNumber,
             chairNumber,
             departureDay,
             entryDate,
             departureCountry,
             departureCity,
             destinationCountry,
             passingCountry,
             addressAfterQuarantine,
             vaccinesUsed,
             isolationFacility,
             fever,
             cough,
             soreThroat,
             nausea,
             diarrhea,
             hemorrhage,
             rash,
             animalContact,
             nCoVPContact,
             negativeConfirmation
         }
         
         console.log(newEntry);
            
            entryDeclarationApi.add(newEntry).then(res=>{
                showToastMessenger('success',"Khai báo thành công!");
            }).catch(error=>{
                console.log(error);
            });
            
         })
    }

    chooseDeclarationType(type){
        if(type==1){
            document.querySelector('#formDomesticGuests').classList.add('d-block');
            document.querySelector('#formMoveDeclaration').classList.remove('d-block');
            document.querySelector('#formEntryDeclaration').classList.remove('d-block');
            document.querySelector('#formMoveDeclaration').classList.add('d-none');
            document.querySelector('#formEntryDeclaration').classList.add('d-none');
            
            
        }else if(type==2){
            document.querySelector('#formEntryDeclaration').classList.add('d-block');
            document.querySelector('#formDomesticGuests').classList.remove('d-block');
            document.querySelector('#formMoveDeclaration').classList.remove('d-block');
            document.querySelector('#formDomesticGuests').classList.add('d-none');
            document.querySelector('#formMoveDeclaration').classList.add('d-none');

        }else{
            document.querySelector('#formMoveDeclaration').classList.add('d-block');
            document.querySelector('#formDomesticGuests').classList.remove('d-block');
            document.querySelector('#formEntryDeclaration').classList.remove('d-block');
            document.querySelector('#formDomesticGuests').classList.add('d-none');
            document.querySelector('#formEntryDeclaration').classList.add('d-none');
        }
    }

    
}
