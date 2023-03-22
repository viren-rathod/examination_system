

async function gen_qz(id) {
    let g_id = id;
    let temp = await fetch(`/categoryGet?id=${g_id}`);
    let ans = await temp.json();

    let s = ` <div >
                <h3 >Q.</h3>
                <h5 >${ans.data[0].question_text}</h5>
              </div>
            
              <div >
                <label class="radio">
                  <input type="radio" name="q-${ans.data[0].question_id}" value="${ans.data[0].option_a}">
                  <span>${ans.data[0].option_a}</span>
                </label>
              </div>
              <div >
                <label class="radio">
                  <input type="radio" name="q-${ans.data[0].question_id}" value="${ans.data[0].option_b}">
                  <span>${ans.data[0].option_b}</span>
                </label>
              </div>
              <div >
                <label class="radio">
                  <input type="radio" name="q-${ans.data[0].question_id}" value="${ans.data[0].option_c}">
                  <span>${ans.data[0].option_c}</span>
                </label>
              </div>
              <div >
                <label class="radio">
                  <input type="radio" name="q-${ans.data[0].question_id}" value="${ans.data[0].option_d}">
                  <span>${ans.data[0].option_d}</span>
                </label>
              </div>
            
              
              <div class="next">
                <input type="submit" value="next" />
              </div>`
              ;
              quiz.innerHTML = s;

   
  }