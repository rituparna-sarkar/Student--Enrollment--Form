var connToken = "90933220|-31949279792679386|90950732";
var stuDBName = "SCHOOL-DB";
var stuRelationName = "STUDENT-TABLE";

var jpdbBaseURL = "http://api.login2explore.com:5577"
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";

$("stuRoll").focus();

function saveRecNo2lS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getStuRollJsonObj() {
    var stuRoll = $("#stuRoll").val();
    var jsonstr = {
        Rollnumber: stuRoll

    };
    return JSON.stringify(jsonstr);
}
function fillData(jsonObj) {
    saveRecNo2lS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#stuRoll").val(record.Rollnumber);
    $("#stuName").val(record.Name);
    $("#stuClass").val(record.Class);

    $("#stuBirthDate").val(record.BirthDate);
    $("#stuAddress").val(record.Address);
    $("#stuEnrollDate").val(record.EnrollmentDate);

}
function resetForm() {
    $("#stuRoll").val("");
    $("#stuName").val("");
    $("#stuClass").val("");
    $("#stuBirthDate").val("");
    $("#stuAddress").val("");
    $("#stuEnrollDate").val("");

    $("#stuRoll").prop("disabled", false);
    $("#stuName").prop("disabled", true);
    $("#stuClass").prop("disabled", true);
    $("#stuBirthDate").prop("disabled", true);
    $("#stuAddress").prop("disabled", true);
    $("#stuEnrollDate").prop("disabled", true);

    $("#save").prop('disabled', true);
    $("#update").prop('disabled', true);
    $("#reset").prop('disabled', true);

    $("#stuRoll").focus();
}


function validateData() {
    var stuRoll, stuName, stuClass, stuBirthDate, stuAddress, stuEnrollDate;
    stuRoll =  $("#stuRoll").val();
    stuName =  $("#stuName").val();
    stuClass =  $("#stuClass").val();
    stuBirthDate =  $("#stuBirthDate").val();
    stuAddress =  $("#stuAddress").val();
    stuEnrollDate = $("#stuEnrollDate").val();
    if (stuRoll === "") {
        alert("Student RollNumber missing");
        $("#stuRoll").focus();
        return "";
    }
    if (stuName === "") {
        alert("Student Name missing");
        $("#stuName").focus();
        return "";
    }
    if (stuClass === "") {
        alert("Student class missing");
        $("#stuClass").focus();
        return "";
    }
    if (stuBirthDate === "") {
        alert("Student Date of Birth missing");
        $("#stuBirthDate").focus();
        return "";
    }
    if (stuAddress === "") {
        alert("Student Address missing");
        $("#stuAdress").focus();
        return "";
    }
    if (stuEnrollDate === "") {
        alert("Student Enrollment Date missing");
        $("#stuEnrollDate").focus();
        return "";
    }
    var jsonStrObj = {
        Rollnumber: stuRoll,
        Name: stuName,
        Class: stuClass,
        BirthDate: stuBirthDate,
        Address: stuAddress,
        EnrollmentDate: stuEnrollDate
    }
    return JSON.stringify(jsonStrObj);
}
function getStu() {
    var stuRollJsonObj = getStuRollJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stuDBName, stuRelationName, stuRollJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: true });
    if (resJsonObj.status === 400) {

        // $("#stuRoll").prop("disabled", false);
        $("#stuName").prop("disabled", false);
        $("#stuClass").prop("disabled", false);
        $("#stuBirthDate").prop("disabled", false);
        $("#stuAddress").prop("disabled", false);
        $("#stuEnrollDate").prop("disabled", false);

        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuName").focus();

    } else if (resJsonObj.status === 200) {
        
        $("#stuRoll").prop("disabled", true);
        $("#stuName").prop("disabled", false);
        $("#stuClass").prop("disabled", false);
        $("#stuBirthDate").prop("disabled", false);
        $("#stuAddress").prop("disabled", false);
        $("#stuEnrollDate").prop("disabled", false);

        fillData(resJsonObj);

        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuName").focus();
    }
}


function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return;
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stuDBName, stuRelationName);
    // alert(putRequest);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    // alert(JSON.stringify(resJsonObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
    alert("Student record added successfully")
    $("#stuRoll").focus();
}
function updateData() {
    $("#update").prop("disabled", true);
    jsonUpd = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonUpd, stuDBName, stuRelationName, localStorage.getItem("recno"))
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    console.log(resJsonObj);
    alert("Student record updated successfully")
    resetForm();
    $("stuName").focus();
}

