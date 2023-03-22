
function timer(x) {
    console.log(x);
    let y = parseInt(x);
    console.log(typeof (y));

    var minit = 2;
var second = 0;
var nareshInterval = setInterval(() => {
document.getElementById("time1").innerHTML = `${minit}:${second}`;

if (second == 0) {
minit--;
second = 10;
}
second--;
if (minit == -1) {

clearInterval(nareshInterval);
submit();
}
}, 1000);

    // let i;
    //     let seconds = 5;
    //     var minutes=2
    //     const makeIteration = () => {
    //         console.clear();

    //         document.getElementById("time1").innerHTML = minutes+ ":" + seconds;

    //         //console.log(seconds);
    //         setTimeout(makeIteration, 1000); // 1 second waiting



    //         if (seconds != 0) {
    //             seconds -= 1;
    //         }
    //         else{
                
    //             minutes-=1
    //             seconds=5
    //         console.log(i)
            
                
    //             // setTimeout(makeIteration, 1000);
    //         }

    //         if(minutes==0 && minutes<=0) {
    //             alert("Time is over")
    //             var naresh_rm=document.getElementById("id1");
    //             naresh_rm.remove();
    //             location.reload();
    //             document.getElementById("id1").innerHTML="";
    //             fetch("/over")
                
    //         }
           
        
    //     }

    //     setTimeout(makeIteration, 1000);
      
        //var time= document.getElementById("timer").innerHTML=seconds
    }




function submit() {
    console.log("hello world");
    alert("hii")
}



