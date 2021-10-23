
function sendSms(to, body) {

  var messages_url = "https://ip.sms.ir/SendMessage.ashx?user=9127742208&pass=aryaarousha51910&lineNo=30004747471484" ;

  var payload = {
    "To": to,
    "text" : body,
    "From" : "30004747471484"
  };

  var options = {
    "method"  : "post",
    "payload" : payload
  };
  
  UrlFetchApp.fetch(messages_url,options);
}

function sendAll() {
  
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2; 
  var numRows = sheet.getLastRow() - 1; 
  var dataRange = sheet.getRange(startRow, 1, numRows,3);
  var data = dataRange.getValues();
  
  for (i in data) {

    try{
      if( data[i][2] !== "sent" ){
        sendSms('+98'+data[i][0],data[i][1]);
        status = "sent";
      }
          
    }catch(err) {
        Logger.log(err);
        status = "ارسال ناموفق !";
    }
    sheet.getRange(startRow + Number(i),3).setValue("sent");

  }
}

function myFunction() {

  sendAll();
}

