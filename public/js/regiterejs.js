function changeevent(x) {
    city1 = document.getElementById("city");
    var state = x.value;
    console.log(state);
    fetch('/get?state=' + state + '').then((response) => {
        return response.json();
    }).then((responsedata) => {
        var str = "";
        for (let i = 0; i < responsedata.length; i++) {
            str += "<option value" + responsedata[i]['Data'] + ">" + responsedata[i]['Data'] + "</option>";

        }
        console.log(str)

        city1.innerHTML = str;
    })

}
function validatename(x, y) {
    let check_name = /[0-9]+/;
    let letters = /^[a-zA-Z\s]*$/;


    if (y == 'f') {
        var fname = document.getElementById("fname").value;
        if (fname == "") {
            // alert("Enter your Name Please!");
            document.getElementById("name1").style.color = "red";
            document.getElementById("name1").innerHTML = "Enter your name Please!";
            return false;
        }
        else {
            if (fname.match(check_name)) {
                document.getElementById("name1").style.color = "red";
                document.getElementById("name1").innerHTML = "Enter Characters only!"
                return false;
            }
            else{
                if(fname.match(letters))
                {
                    document.getElementById("name1").style.color = "green";
                    document.getElementById("name1").innerHTML = ""
                    return true
                }
                else {
                    document.getElementById("name1").style.color = "red";
                    document.getElementById("name1").innerHTML = "No special characters..!"
                    return false
                }
            }
            
        }

    }
    if (y == 'l') {
        var lname = document.getElementById("lname").value;
        if (lname == "") {
            // alert("Enter your Name Please!");
            document.getElementById("name2").style.color = "red";
            document.getElementById("name2").innerHTML = "Enter your name Please!";
            return false;
        }
        else {
            if (lname.match(check_name)) {
                document.getElementById("name2").style.color = "red";
                document.getElementById("name2").innerHTML = "Enter Characters only!"
                return false;
            }
            else{
                if(lname.match(letters))
                {
                    document.getElementById("name2").style.color = "green";
                    document.getElementById("name2").innerHTML = ""
                    return true
                }
                else {
                    document.getElementById("name2").style.color = "red";
                    document.getElementById("name2").innerHTML = "No special characters..!"
                    return false
                }
            }
            
        }

    }


    // var nameerr = document.getElementById("name1")




   


}

async function validateemail() {

    var email = document.getElementById("email").value;
    var flag = false;


    if (flag == false) {

        await fetch("/email?email=" + email + "").then((res) => {
            return res.json()
        }).then((resdata) => {
            console.log(resdata);
            if (email == resdata) {
                document.getElementById("email1").style.color = "red";
                document.getElementById('email1').innerHTML = "Email alredy registered!.....";
                flag = false;
            }
            else {
                document.getElementById('email1').innerHTML = null;

                flag = true;
            }

        })
        return flag

    }

}

async function validatepass() {

    var pass = document.getElementById("pasw").value;
    var repass = document.getElementById("repasw").value;
    var namech = validatename()
    var emailch = validateemail()






    if (pass == "" || pass == "null") {
        document.getElementById("password1").innerHTML = "Please Enter Your Password!"
        return false;
    }
    else {
        if (pass.length < 8) {
            document.getElementById("password1").innerHTML = "Password contains less than 8 characters!";
            return false;

        }
        else {
            var ele = document.getElementById("pasw").value;
            var reg = /^[A-Za-z]\w{2-9}$/;
            if (ele.match(reg)) {

                document.getElementById("password1").innerHTML = "Password is Valid";
                document.getElementById("submit").disabled = false;
                return true
            }

            else {
                if (pass != repass) {
                    document.getElementById('password1').innerHTML = "Password doesn't match";
                    // console.log("false")
                    return false;
                }
                else {

                    if (pass === repass) {
                        document.getElementById('password1').innerHTML = null;
                        document.getElementById("submit").disabled = false;
                        return true;
                    }
                    else {
                        document.getElementById("password1").innerHTML = "Passwod is not valid";
                        return false;
                    }
                }
            }


        }
    }
}




function pwdverify() {
    console.log("bdfghejkfh");
    var psw = document.getElementById('pasw').value;

    var strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

    // var strongPassword = /^[A-Za-z0-9]*$/
    var mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    let passshow = document.getElementById('password1');

    if (psw.match(strongPassword)) {
        passshow.style.color = "green";
        passshow.innerHTML = "strong"
    } else if (psw.match(mediumPassword)) {
        passshow.style.color = "blue";
        passshow.innerHTML = "medium"
    } else {
        passshow.style.color = "red";
        passshow.innerHTML = "weak"
    }


}
