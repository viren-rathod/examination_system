let ischeckemail = true;
let ischeckname1 = true, ischeckname2 = true;
var savebutton = document.getElementById('savebutton');
var saveall = document.getElementById('totalSave');
var readonly = true;
var inputs = document.querySelectorAll('input[type="text"]');
var firstname = document.getElementById('first_name').value;
var id = document.getElementById('id_data').value;
var email = document.getElementById('email').value;

async function checkNameValid1(ele) {
    let input_val = ele.value;
    let err_mes = document.getElementById('err_name');
    var regex = /^[a-zA-Z ]*$/;
    if (input_val == "" || !regex.test(input_val)) {
        err_mes.innerHTML = "Not a Valid Name";
        ischeckname1 = false;
    }
    else {
        firstname = input_val;
        err_mes.innerHTML = "";
        ischeckname1 = true;
    }
    checksubmit();
}

async function checkEmail(ele) {
    const inputtxt = ele.value;
    console.log(inputtxt);
    const email_id = document.getElementById('email_id');
    const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regExEmail.test(inputtxt.trim())) {
        email = inputtxt;
        email_id.innerHTML = '';
        ischeckemail = true;
    } else {
        email_id.innerHTML = 'Not a Valid Email';
        ischeckemail = false;
    }
    await checksubmit();
}


savebutton.addEventListener('click', function () {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].toggleAttribute('readonly');
    };
});

async function checksubmit() {
    if (ischeckemail && ischeckname1) {
        saveall.disabled = false;
        saveall.style.cursor = 'pointer';
        console.log(firstname, email)
        const ans = await fetch('/profile_update', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id, firstname, email
            })
        });
        // const data = await ans.json();
        // console.log(data);

    }
    else {
        saveall.disabled = true;
    }
}

