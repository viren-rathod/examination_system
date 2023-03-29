let prevQuestionId = 1;
let allOptions = document.getElementsByName("option");
let selectedAns = "";
let userAnswers = [...new Array(parseInt(total_questions))];
let questionIds = Array.from(
  { length: parseInt(total_questions) + 1 },
  (_, i) => i
);
async function getAnswers(temp) {
  allOptions.forEach((e) => {
    if (e.checked) selectedAns = e.value;
  });
}
async function getQue(id) {
  // console.log(id, prevQuestionId);
  let que = await fetch(`/getCategoryName?id=${id}`);
  let cat_name = await que.json();
  document.querySelector(
    ".category-title"
  ).innerHTML = `<h4 class="category-title">${cat_name[0].category_name}</h4>`;
  fetcher(
    `/pagingGet/?question_no=${id}&category_id=${cat_name[0].category_id}`
  );
  document.getElementById(`i${prevQuestionId}`).style.backgroundColor = "white";
  document.getElementById(`i${id}`).style.backgroundColor = "lightblue";
  prevQuestionId = id;
}

async function fetcher(str) {
  let temp = await fetch(str);
  let ans = await temp.json();
  let user_ans = await fetch("/getAns", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(ans),
  });
  let user_ans_json = await user_ans.json();
  let s = ` <div class="d-flex flex-row align-items-center question-title">
                  <h3 class="text-danger">Q.</h3>
                  <h5 class="mt-1 ml-2">${ans[0].question_text}</h5>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="option" value="${ans[0].option_a}"
                    onclick="getAnswers(this)" ${user_ans_json.length &&
      user_ans_json[0].user_answers == ans[0].option_a
      ? "checked"
      : ""
    }>
                    <span>${ans[0].option_a}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="option" value="${ans[0].option_b}"
                    onclick="getAnswers(this)" ${user_ans_json.length &&
      user_ans_json[0].user_answers == ans[0].option_b
      ? "checked"
      : ""
    } >
                    <span>${ans[0].option_b}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="option" value="${ans[0].option_c}"
                    onclick="getAnswers(this)" ${user_ans_json.length &&
      user_ans_json[0].user_answers == ans[0].option_c
      ? "checked"
      : ""
    } >
                    <span>${ans[0].option_c}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="option" value="${ans[0].option_d}"
                    onclick="getAnswers(this)" ${user_ans_json.length &&
      user_ans_json[0].user_answers == ans[0].option_d
      ? "checked"
      : ""
    } >
                    <span>${ans[0].option_d}</span>
                  </label>
                </div>`;
  if (total_questions >= ans[0].question_id) que.innerHTML = s;

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
        value=${ans[0].question_id == total_questions ? "SAVE" : "NEXT"}
        onclick="next_btn('${ans[0].question_id}')"
        class="btn btn-primary btn-success col-2 font-weight-bold"
        id="next"
        />
    </div>`;
  btns.innerHTML = btn;
}

async function next_btn(id) {
  prevQuestionId = parseInt(id) + 1;
  if (document.querySelector(`#i${parseInt(id) + 1}`))
    document.querySelector(`#i${parseInt(id) + 1}`).style.backgroundColor =
      "lightblue";
  document.querySelector(`#i${id}`).style.backgroundColor = "white";

  userAnswers[id] = selectedAns;
  questionIds[id] = parseInt(id);

  allOptions.forEach((e) => {
    if (e.checked) selectedAns = e.value;
  });
  let temp1 = await fetch(`/nextGet?id=${id}`);
  let tmp = await temp1.json();
  if (tmp[0]) {
    await fetcher(
      `/pagingGet/?question_no=${tmp[0].question_id}&category_id=${tmp[0].category_id}`
    );
    let cat_name = await fetch(`/getCategoryName?id=${id}&btn=next`);
    let cat_name_json = await cat_name.json();
    document.querySelector(
      ".category-title"
    ).innerHTML = `<h4 class="category-title">${cat_name_json[0].category_name}</h4>`;

    document.querySelectorAll(".pagination").forEach((a) => {
      a.style.backgroundColor = "white";
      a.style.color = "black";
    });
    document.getElementById(`${cat_name_json[0].category_id}`).style.color =
      "black";
    document.getElementById(
      `${cat_name_json[0].category_id}`
    ).style.backgroundColor = "#ffc94e";
  }
  let a1 = await fetch(`/answerPost?ans=${selectedAns}&id=${id}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ selectedAns, id }),
  });
  let a2 = await a1.json();
  selectedAns = "";


  if (tmp[0]) {
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
        value=${tmp[0].question_id == total_questions ? "SAVE" : "NEXT"}
        onclick="next_btn('${tmp[0].question_id}')"
        class="btn btn-primary btn-success col-2 font-weight-bold"
        id="next"
      />
    </div>`;
    if (total_questions != tmp[0].question_id) {
      btns.innerHTML = s;
    }
  }
}

async function previous_btn(id) {
  prevQuestionId = parseInt(id) - 1;
  document.querySelector(`#i${parseInt(id) - 1}`).style.backgroundColor =
    "lightblue";
  document.querySelector(`#i${id}`).style.backgroundColor = "white";
  let temp = await fetch(`/prevGet?id=${id}`);
  let tmp = await temp.json();
  if (tmp[0]) {
    await fetcher(
      `/pagingGet/?question_no=${tmp[0].question_id}&category_id=${tmp[0].category_id}`
    );
  }
  let cat_name = await fetch(`/getCategoryName?id=${id}&btn=prev`);
  let cat_name_json = await cat_name.json();
  document.querySelector(
    ".category-title"
  ).innerHTML = `<h4 class="category-title">${cat_name_json[0].category_name}</h4>`;
  document.querySelectorAll(".pagination").forEach((a) => {
    a.style.backgroundColor = "white";
    a.style.color = "black";
  });
  document.getElementById(`${cat_name_json[0].category_id}`).style.color =
    "black";
  document.getElementById(
    `${cat_name_json[0].category_id}`
  ).style.backgroundColor = "#ffc94e";
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
        value=${tmp[0].question_id == total_questions ? "SAVE" : "NEXT"}
        onclick="next_btn('${tmp[0].question_id}')"
        class="btn btn-primary btn-success col-2 font-weight-bold"
        id="next"
      />
    </div>`;
  btns.innerHTML = s;
}

async function category_changer(e) {
  // console.log(e);
  let temp = await fetch(`/categoryGet?id=${e.id}`);
  let ans = await temp.json();

  let user_ans = await fetch("/getAns", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(ans.data),
  });
  let user_ans_json = await user_ans.json();

  start = parseInt(ans.data[0].question_id);
  end = start + parseInt(ans.category[0].no_of_question) - 1;

  let c_name = e.textContent;
  document.querySelector(
    ".category-title"
  ).innerHTML = `<h4 class="category-title">${c_name}</h4>`;
  // console.log(`#i${ans.data[0].question_id}`);
  document.querySelector(`#i${prevQuestionId}`).style.backgroundColor = "white";
  document.querySelector(`#i${ans.data[0].question_id}`).style.backgroundColor =
    "lightblue";
  prevQuestionId = parseInt(ans.data[0].question_id);
  let s = ` <div class="d-flex flex-row align-items-center question-title">
                  <h3 class="text-danger">Q.</h3>
                  <h5 class="mt-1 ml-2">${ans.data[0].question_text}</h5>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="option" value="${ans.data[0].option_a
    }" ${user_ans_json.length &&
      user_ans_json[0].user_answers == ans.data[0].option_a
      ? "checked"
      : ""
    }>
                    <span>${ans.data[0].option_a}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="option" value="${ans.data[0].option_b
    }" ${user_ans_json.length &&
      user_ans_json[0].user_answers == ans.data[0].option_b
      ? "checked"
      : ""
    }>
                    <span>${ans.data[0].option_b}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="option" value="${ans.data[0].option_c
    }" ${user_ans_json.length &&
      user_ans_json[0].user_answers == ans.data[0].option_c
      ? "checked"
      : ""
    }>
                    <span>${ans.data[0].option_c}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="option" value="${ans.data[0].option_d
    }" ${user_ans_json.length &&
      user_ans_json[0].user_answers == ans.data[0].option_d
      ? "checked"
      : ""
    }>
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
        value=${ans.data[0].question_id == total_questions ? "SAVE" : "NEXT"}
        onclick="next_btn('${ans.data[0].question_id}')"
        class="btn btn-primary btn-success col-2 font-weight-bold"
        id="next"
      />
      
    </div>`;

  btns.innerHTML = btn;

  document.querySelectorAll(".pagination").forEach((a) => {
    a.style.backgroundColor = "white";
    a.style.color = "black";
  });
  e.style.backgroundColor = "#ffc94e";
  e.style.color = "black";
}

submit.addEventListener("click", () => {
  endExam();
});
async function endExam() {
  if (confirm("Are you sure you want to submit the Exam ?")) {
    for (let i = 1; i <= userAnswers.length; i++) {
      if (userAnswers[i] == undefined) {
        console.log(i);
        let a = await fetch(
          `/allAnswerGet?ans=${userAnswers[i]}&id=${parseInt(questionIds[i])}`
        );
        let b = await a.json();
      }
    }
    window.location.href = "/endExam";
  }
}
/*? Timer*/
function timer(x) {
  console.log(x);
  let y = parseInt(x);
  console.log(typeof y);

  var minit = y;
  var second = 0;
  var nareshInterval = setInterval(() => {
    document.getElementById("time1").innerHTML = `${minit}:${second}`;

    if (second == 0) {
      minit--;
      second = 60;
    }
    second--;
    if (minit == -1) {
      clearInterval(nareshInterval);
      // submit();
    }
  }, 1000);
}
