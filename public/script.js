async function fetcher(str) {
  let temp = await fetch(str);
  let ans = await temp.json();
  let s = `<div id="que">
              <div class="d-flex flex-row align-items-center question-title">
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
              </div>
            </div>`;
  que.innerHTML = s;
  let qn = `<span class= "que-no">${ans[0].question_id}</span>`;
  que_no.innerHTML = qn;
}

async function next_btn(id) {
  let temp1 = await fetch(`http://localhost:4321/next?id=${id}`);
  let tmp = await temp1.json();
  await fetcher(`/paging/?question_no=${tmp[0].question_id}`);
  let s = `<div class="buttons p-3 bg-white">
  <div
    class="row justify-content-around align-items-center"
    id="row"
  >
    <input
      type="button"
      value="PREV"
      onclick="fetcher('${tmp[0].question_id}')"
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
  </div>
</div>`;
  btns.innerHTML = s;
}

// async function prev_btn(id) {
//   let temp2 = await fetch(`http://localhost:4321/prev?id=${id}`);
//   console.log(temp2);
  // let tmp = await temp2.json();
//   await fetcher(`/paging/?question_no=${tmp[0].question_id}`);
//   let s = `<div class="buttons p-3 bg-white">
//   <div
//     class="row justify-content-around align-items-center"
//     id="row"
//   >
//     <input
//       type="button"
//       value="PREV"
//       onclick="fetcher('${tmp[0].question_id}')"
//       class="border border-info rounded p-1 bg-white text-info font-weight-bold col-2"
//       id="prev"
//     />

//     <input
//       type="button"
//       value="NEXT"
//       onclick="next_btn('${tmp[0].question_id}')"
//       class="btn btn-primary btn-success col-2 font-weight-bold"
//       id="next"
//     />
//   </div>
// </div>`;
//   btns.innerHTML = s;
// }

async function previous_btn(id) {
  console.log(id);
  // let temp2 = await fetch(`htp://localhost:4321/previous?id=${id}`);
  
}