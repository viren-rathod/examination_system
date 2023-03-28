// var accesscode = document.getElementById('accesscode').value;
let ischeckname = true;
let ischeckemail = true;
let ischeckAccesscode = true;

let exid;
function sendfoo(x) {
  exid = x.id;

//   console.log("send foo");
//   console.log(exid);

  // return false;
}

function clearf() {
  document.getElementById("access").value = null;
  document.getElementById("err1_access").innerHTML = "";
  document.getElementById("submit1").disabled = true;
//   console.log("clearf");
  return false;
}

async function validateCode() {
  var email = document.getElementById("email").value;
  console.log(email);
  let code = document.getElementById("access").value;

//   console.log("val code");
//   console.log(exid);

  var valid_code = await (
    await fetch(`/checkCode?email=${email}&exam_id=${exid}`)
  ).json();
  console.log(valid_code[0][0].exam_access_code);
  let check_code = valid_code[0][0].exam_access_code;

  if (check_code != code) {
    document.getElementById("err1_access").style.color = "red";
    document.getElementById("err1_access").innerHTML = "Access code is invalid";
    document.getElementById("submit1").disabled = true;

    return false;
  } else {
    document.getElementById("err1_access").innerHTML = "";
    document.getElementById("submit1").disabled = false;

    return true;
  }
}
function foo() {
  // let flag=0
  let c1 = document.getElementById("check1").checked;
  let c2 = document.getElementById("check2").checked;
  console.log(c1, c2);

  if (c1 && c2) {
    document.getElementById("submit").disabled = false;
    return true;
  } else {
    document.getElementById("submit").disabled = true;
    return false;
  }
}
