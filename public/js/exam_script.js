console.log("script is already working....");
async function fetcher(str) {
    console.log(str);
  let temp = await fetch(str);
  let ans = await temp.json();
  // let ans = answer.data;
  let s = ` <div class="d-flex flex-row align-items-center question-title">
                  <h3 class="text-danger">Q.</h3>
                  <h5 class="mt-1 ml-2">${ans[0].question_text}</h5>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="q-${ans[0].question_id}" value="${ans[0].option_a}">
                    <span>${ans[0].option_a}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="q-${ans[0].question_id}" value="${ans[0].option_b}">
                    <span>${ans[0].option_b}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="q-${ans[0].question_id}" value="${ans[0].option_c}">
                    <span>${ans[0].option_c}</span>
                  </label>
                </div>
                <div class="ans ml-2">
                  <label class="radio">
                    <input type="radio" name="q-${ans[0].question_id}" value="${ans[0].option_d}">
                    <span>${ans[0].option_d}</span>
                  </label>
                </div>`;
  que.innerHTML = s;
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
      />
  
      <input
        type="button"
        value="NEXT"
        onclick="next_btn('${ans[0].question_id}')"
        class="btn btn-primary btn-success col-2 font-weight-bold"
        id="next"
      />
    </div>`;
  btns.innerHTML = btn;
}

async function next_btn(id) {
  // console.log(id);
  let temp1 = await fetch(`/nextGet?id=${id}`);
  let tmp = await temp1.json();
  // console.log(tmp[0].question_id);
  await fetcher(
    `/pagingGet/?question_no=${tmp[0].question_id}&category_id=${tmp[0].category_id}`
  );
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
      />
  
      <input
        type="button"
        value="NEXT"
        onclick="next_btn('${tmp[0].question_id}')"
        class="btn btn-primary btn-success col-2 font-weight-bold"
        id="next"
      />
    </div>`;
  btns.innerHTML = s;
}

async function previous_btn(id) {
  let temp = await fetch(`/prevGet?id=${id}`);
  let tmp = await temp.json();
  await fetcher(
    `/pagingGet/?question_no=${tmp[0].question_id}&category_id=${tmp[0].category_id}`
  );
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
      />
  
      <input
        type="button"
        value="NEXT"
        onclick="next_btn('${tmp[0].question_id}')"
        class="btn btn-primary btn-success col-2 font-weight-bold"
        id="next"
      />
    </div>`;
  btns.innerHTML = s;
}

async function category_changer(e, a) {
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
      />
  
      <input
        type="button"
        value="NEXT"
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
        class="selectlink m-1 btn"
        onclick="fetcher('pagingGet/?question_no=${
          ans.data[0].question_id + i
        }&category_id=${ans.category[0].category_id}')"
        >${i + 1}</span
      >`;
      continue;
    }

    page += ` <span
        class="student m-1 btn"
        onclick="fetcher('/pagingGet/?question_no=${
          ans.data[0].question_id + i
        }&category_id=${ans.category[0].category_id}')"
        >${i + 1}</span
      >`;
  }

  // console.log(page);s
  document.getElementById("page").innerHTML = page;
}
