let ans = null;
function getAnswers(temp) {
  ans = temp.value;
}
console.log("script is already working....");
let chk = ["", "", "", "", ""];
async function fetcher(str) {
  let temp = await fetch(str);
  let ans = await temp.json();
  let user_ans = await fetch("/getAns", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(ans),
  });
  let user_ans_json = await user_ans.json();
  let opts = [
    ans[0].option_a,
    ans[0].option_b,
    ans[0].option_c,
    ans[0].option_d,
  ];
  console.log("check :- ", chk);
  if (user_ans_json.length != 0)
    for (let i = 0; i < opts.length; i++) {
      if (opts[i] == user_ans_json[0].user_answers) chk[i] = "checked";
      else chk[i] = "";
    }
  // console.log("ans 0 :- ", user_ans_json);
  let s = ` <div class="d-flex flex-row align-items-center question-title">
                  <h3 class="text-danger">Q.</h3>
                  <h5 class="mt-1 ml-2">${ans[0].question_text}</h5>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="q-${ans[0].question_id}" value="${ans[0].option_a}"
                    onclick="getAnswers(this)" ${chk[0]} >
                    <span>${ans[0].option_a}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="q-${ans[0].question_id}" value="${ans[0].option_b}"
                    onclick="getAnswers(this)" ${chk[1]}>
                    <span>${ans[0].option_b}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="q-${ans[0].question_id}" value="${ans[0].option_c}"
                    onclick="getAnswers(this)" ${chk[2]} >
                    <span>${ans[0].option_c}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="q-${ans[0].question_id}" value="${ans[0].option_d}"
                    onclick="getAnswers(this)" ${chk[3]}>
                    <span>${ans[0].option_d}</span>
                  </label>
                </div>`;
  if (total_questions >= ans[0].question_id) que.innerHTML = s;
  else {
    // console.log("bnhjhjbdbtbjnjnytn");
  }
  let qn = `<span class= "que-no">${ans[0].question_id}</span>`;
  que_no.innerHTML = qn;
  let btn = `<div
      class="row justify-content-around align-items-center"
      id="row"
    >
      <input
        type="button"
        value="PREV"
        onclick="previous_btn('${ans[0].question_id}')"
        class="border border-info rounded p-1 bg-white text-info font-weight-bold col-2"
        id="prev"
        ${ans[0].question_id == 1 ? " disabled" : ""}
      />
  
      <input
        type="button"
        value="SAVE"
        onclick="next_btn('${ans[0].question_id}')"
        class="btn btn-primary btn-success col-2 font-weight-bold"
        id="next"
        />
    </div>`;
  btns.innerHTML = btn;
}

async function next_btn(id) {
  let temp1 = await fetch(`/nextGet?id=${id}`);
  let tmp = await temp1.json();
  // console.log('length',tmp[0].question_id == total_questions);
  if (tmp[0]) {
    await fetcher(
      `/pagingGet/?question_no=${tmp[0].question_id}&category_id=${tmp[0].category_id}`
    );
    if (tmp[0].question_id == total_questions) {
      let next = document.querySelector("#next");
      next.setAttribute("value", "SUBMIT");
    }
  }
  // }
  let a1 = await fetch(`/answerPost?ans=${ans}&id=${id}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ans, id }),
  });
  let s = `<div
      class="row justify-content-around align-items-center"
      id="row"
    >
      <input
        type="button"
        value="PREV"
        onclick="previous_btn('${tmp[0].question_id}')"
        class="border border-info rounded p-1 bg-white text-info font-weight-bold col-2"
        id="prev"
        ${tmp[0].question_id == 1 ? " disabled" : ""}
      />
  
      <input
        type="button"
        value="SAVE"
        onclick="next_btn('${tmp[0].question_id}')"
        class="btn btn-primary btn-success col-2 font-weight-bold"
        id="next"
      />
    </div>`;
  if (total_questions != 7) btns.innerHTML = s;
}

async function previous_btn(id) {
  let temp = await fetch(`/prevGet?id=${id}`);
  let tmp = await temp.json();
  if (tmp[0]) {
    await fetcher(
      `/pagingGet/?question_no=${tmp[0].question_id}&category_id=${tmp[0].category_id}`
    );
    if (tmp[0].question_id == total_questions) {
      let next = document.querySelector("#next");
      next.setAttribute("value", "SUBMIT");
    }
  }
  let s = `<div
      class="row justify-content-around align-items-center"
      id="row"
    >
      <input
        type="button"
        value="PREV"
        onclick="previous_btn('${tmp[0].question_id}')"
        class="border border-info rounded p-1 bg-white text-info font-weight-bold col-2"
        id="prev"
        ${tmp[0].question_id == 1 ? " disabled" : ""}
      />
  
      <input
        type="button"
        value="SAVE"
        onclick="next_btn('${tmp[0].question_id}')"
        class="btn btn-primary btn-success col-2 font-weight-bold"
        id="next"
      />
    </div>`;
  btns.innerHTML = s;
}

async function category_changer(e) {
  let temp = await fetch(`/categoryGet?id=${e.id}`);
  let ans = await temp.json();
  // console.log('Data : -',ans);
  let s = ` <div class="d-flex flex-row align-items-center question-title">
                  <h3 class="text-danger">Q.</h3>
                  <h5 class="mt-1 ml-2">${ans.data[0].question_text}</h5>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="q-${ans.data[0].question_id}" value="${ans.data[0].option_a}">
                    <span>${ans.data[0].option_a}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="q-${ans.data[0].question_id}" value="${ans.data[0].option_b}">
                    <span>${ans.data[0].option_b}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="q-${ans.data[0].question_id}" value="${ans.data[0].option_c}">
                    <span>${ans.data[0].option_c}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="q-${ans.data[0].question_id}" value="${ans.data[0].option_d}">
                    <span>${ans.data[0].option_d}</span>
                  </label>
                </div>`;
  que.innerHTML = s;
  let qn = `<span class= "que-no">${ans.data[0].question_id}</span>`;
  que_no.innerHTML = qn;
  let btn = `<div
      class="row justify-content-around align-items-center"
      id="row"
    >
      <input
        type="button"
        value="PREV"
        onclick="previous_btn('${ans.data[0].question_id}')"
        class="border border-info rounded p-1 bg-white text-info font-weight-bold col-2"
        id="prev"
        ${total_questions == 1 ? " disabled" : ""}
      />
  
      <input
        type="button"
        value="SAVE"
        onclick="next_btn('${ans.data[0].question_id}')"
        class="btn btn-primary btn-success col-2 font-weight-bold"
        id="next"
      />
      
    </div>`;

  btns.innerHTML = btn;

  let page = "";
  for (var i = 0; i < ans.category[0].no_of_question; i++) {
    if (i + 1 === ans.question_no) {
      page += `<span
      class="selected m-1 btn pagination-number"
        onclick="fetcher('pagingGet/?question_no=${
          ans.data[0].question_id + i
        }&category_id=${ans.category[0].category_id}')"
        >${i + 1}</span
      >`;
      continue;
    }
    page += `<span
    class="m-1 btn pagination-number"
        onclick="fetcher('/pagingGet/?question_no=${
          ans.data[0].question_id + i
        }&category_id=${ans.category[0].category_id}')"
        >${i + 1}</span
      >`;
  }
  document.getElementById("page").innerHTML = page;
}

submit.addEventListener('click',async () => {
  // console.log("submitted");
  console.log(ans); 
  if(!ans) {
    await fetch(`/answerPost?ans=${ans}&id=${id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ans, id }),
    });
  }
  window.location.href = '/endExam';
});
