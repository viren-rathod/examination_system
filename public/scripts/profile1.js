function edit(){
    for(let i=1;i<5;i++){
      console.log(i)
      document.getElementById('general'+i).disabled = false;
    }
   
    // document.getElementById("general2").disabled = false;
    // document.getElementById("general3").disabled = false;
    // document.getElementById("general4").disabled = false;

  }

  function savechange(){
    let city=document.getElementById("general1").value;
    let state=document.getElementById("general2").value;
    let gender=document.getElementById("general3").value;
    let dob=document.getElementById("general4").value;
    let id=document.getElementById("id").value;
    console.log(id)
    


    fetch(`/profile_update?id=${id}&city=${city}&state=${state}&gender=${gender}&dob=${dob}`).then((response)=>{
      return response.json()
    }).then((resdata)=>{
      console.log(resdata);
      for(let i=1;i<5;i++){
      console.log(i)
      document.getElementById('general'+i).disabled = true;
    }
   


  })

   

   
  }