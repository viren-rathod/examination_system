var name = document.getElementById('name').value;
var email = document.getElementById('email').value;
var accesscode = document.getElementById('accesscode').value;
let ischeckname = true;
let ischeckemail = true;
let ischeckAccesscode = true;
async function checkNameValidName(ele) {

    let input_val = ele.value;
    let err_mes = document.getElementById('err_name');

    var regex = /^[a-zA-Z ]*$/;
    if (input_val == "" || !regex.test(input_val)) {
        err_mes.innerHTML = "Please Enter Valid Name";
        ischeckname = false;
    }
    else {
        firstname = input_val;
        err_mes.innerHTML = "";
        ischeckname = true;
    }
    await checksubmit();
}

async function checkEmail(ele) {
    var id = document.getElementById('id').value;
    var student = await (await fetch(`/studentdata?id=${id}`)).json();
    const inputtxt = ele.value;
    const email_id = document.getElementById('email_id');
    const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regExEmail.test(inputtxt.trim())) {
        email = inputtxt;
        email_id.innerHTML = '';
        ischeckemail = true;
    } else {
        email_id.innerHTML = 'please Enter valid email';
        ischeckemail = false;
    }
    if (student[0].email != email) {
        email_id.innerHTML = 'email does not exits';
    }
    await checksubmit();
}

async function checkAccesscode(ele) {
    var id = document.getElementById('id').value;
    fetch(`/studentdata?id=${id}`).then((response) => {
        return response.json()
    }).then((resdata) => {
        // console.log("resdata", resdata);
    })

    var examdata = await (await fetch(`/studentdata?id=${id}`)).json();
    let input_val = ele.value;
    let err_mes = document.getElementById('accesscodeError');

    var regex = /^[a-zA-Z ]*$/;
    if (input_val == "" || isNaN(input_val)) {
        err_mes.innerHTML = "Please Enter Valid Accesscode";
        ischeckAccesscode = false;
    }
    else
        if (examdata[0].exam_access_code != input_val) {
            err_mes.innerHTML = "Accesscode does not match";
            ischeckAccesscode = false;
        }
        else {
            firstname = input_val;
            err_mes.innerHTML = "";
            ischeckAccesscode = true;
        }
    await checksubmit();
}



async function checksubmit() {
    if (ischeckname && ischeckemail && ischeckAccesscode) {
        console.log("data match suucessfully")
    }
    else {
        console.log("data does not match");
    }
}


async function popupdata(id) {
    document.querySelector(".overlay").classList.add("showoverlay");
    document.querySelector(".loginform").classList.add("showloginform");
    document.getElementById('id').value = id;
}
;

function closeModel() {
    document.querySelector(".overlay").classList.remove("showoverlay");
    document.querySelector(".loginform").classList.remove("showloginform");
}

// var btnlogin = document.querySelector(".btn-login"); //Button
// btnlogin.addEventListener("click", showmodel); //Button click

var c = document.querySelector("span"); //Button
c.addEventListener("click", closeModel); //Button click