let ischeckemail = true;
let ischeckname1 = true,
    ischeckname2 = true;
let isContact = true;
var savebutton = document.getElementById('savebutton');
var saveall = document.getElementById('totalSave');
var readonly = true;
var inputs = document.querySelectorAll('input');
var firstname = document.getElementById('first_name').value;
var id = document.getElementById('id_data').value;
var email = document.getElementById('email').value;
let contact = document.getElementById('contact');

async function checkNameValid1(ele) {
    let input_val = ele.value;
    let err_mes = document.getElementById('err_name');
    var regex = /^[a-zA-Z ]*$/;
    if (input_val == "" || !regex.test(input_val)) {
        err_mes.innerHTML = "Not a Valid Name";
        ischeckname1 = false;
    } else {
        firstname = input_val;
        err_mes.innerHTML = "";
        ischeckname1 = true;
    }
    checksubmit();
}

async function checkEmail(ele) {
    const inputtxt = ele.value;

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
    checksubmit();
}


// savebutton.addEventListener('click', function () {
//     for (var i = 0; i < inputs.length; i++) {
//         console.log(inputs[i]);
//         inputs[i].toggleAttribute('readonly');
//         
//     };
// });

async function checksubmit() {
    if (ischeckemail && ischeckname1 && isContact) {
        saveall.disabled = false;
        saveall.style.cursor = 'pointer';
        // console.log(firstname, email)
        const ans = await fetch('/profile_update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id,
                firstname,
                email,
                contact
            })
        });

    } else {
        saveall.disabled = true;
    }
}


async function checkContact(ele) {
    const contact_val = ele.value;
    const contact_id = document.getElementById('contact_id');

    if (contact_val.length === 10) {
        contact.value = contact_val;
        contact_id.innerHTML = '';
        isContact = true;
    }
    if (contact_val.length < 10 && contact_val.length > 0) {
        contact.value = contact_val;
        contact_id.innerHTML = 'length is less than 10';
        isContact = false;
    }
    if (contact_val.length > 10) {
        contact.value = contact_val;
        contact_id.innerHTML = 'length is greater than 10';
        isContact = false;
    }


    checksubmit();
}