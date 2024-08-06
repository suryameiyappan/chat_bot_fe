var questionMapId;
var question_Id;
var nextQuestion_Id;
let reqBodyArray = [];
let onInit = {};
let qaInputType;
let updateQaCodeinputType;
let body = document.querySelector(".body");
let sun = document.querySelector(".sun");
let moon = document.querySelector(".moon");
let radioButtonCount = 1;

onInit.loadObject = {
  init: function init() {
    const theme = localStorage.getItem('app-theme');
    if (theme) {
      body.classList.add("dark--mode")
    }
    const currentURL = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar--items a');
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href == currentURL) {
        link.classList.add('active');
      }
    });
  }
};
onInit.loadObject.init();

moon.onclick = function(){
    body.classList.add("dark--mode")
    localStorage.setItem('app-theme', 'dark--mode')
}
sun.onclick = function(){
    body.classList.remove("dark--mode")
    localStorage.removeItem('app-theme')
}
let menu = document.querySelector(".menu")
let sidebar = document.querySelector(".sidebar")
let mainContainer = document.querySelector(".main--container")
menu.onclick = function(){
    sidebar.classList.toggle("activemenu")
}
mainContainer.onclick = function(){
    sidebar.classList.remove("activemenu")
}

function apiCall(url, data, headersReq , callbackRes){
  fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headersReq
    }).then(res => res.json())
    .then(response => callbackRes(response)
    )
    .catch(error => console.error('Error:', error));
}

function openComapny() {
  initModal("#openOrganizationAddModal");
}

function openProduct() {
  initModal("#openProductAddModal");
}

function initModal(id) {
  document.body.classList.add('modal-open');
  document.body.insertAdjacentHTML(
      'beforeend',
      '<div class="modal-backdrop fade"></div>'
  );
  var backdrop = document.querySelector('.modal-backdrop');
  backdrop.classList.add('show');
  let activeTabContent = document.body.querySelector(id);
  activeTabContent.style.display = 'block';
  setTimeout(() => {
      activeTabContent.classList.add('show');
      // Modal align at Bottom
      if (window.innerWidth <= 767) {
          if (activeTabContent.classList.contains('modal-align-mobile-bottom')) {
              activeTabContent.classList.add('modal-up-animate');
          }
      }
  }, 300);
}

function closePopUp() {
    let modals = document.querySelectorAll('.modal.fade.show');
    modals.forEach(modal => {
      if (modal?.style?.display == 'block') {
        modal.classList.remove('show');
        modal.style.display = 'none';
        setTimeout(() => {
          let backdrop = document.querySelector(
            '.modal-backdrop'
          );
          backdrop?.classList.remove('show');
          backdrop?.remove();
        }, 150);
        setTimeout(() => {
          let body = document.body;
          body?.classList.remove('modal-open');
          }, 150);
      }
  });
}

function openQuestionPopup() {
  const form = document.getElementById('qaForm');
  if (form) {
    form.reset();
  }
  const radioDivs = document.querySelectorAll('.rm-radio');
  console.log(radioDivs);
  radioDivs.forEach(div => {
    div.remove();
  });
  document.getElementById('add_questions_array').disabled = false;
  document.getElementById('step-2').disabled = true;
  document.getElementById('qaInputType').disabled = false;
  addLanguageOption();
  initModal("#GetQuoteForm");
}

function addLanguageOption() {
  const newOptions = [
    { value: 'TAMIL', text: 'TAMIL' },
    { value: 'ENGLISH', text: 'ENGLISH' },
    { value: 'HINDI', text: 'HINDI' }
  ];
  let qaLanguage = document.getElementById('qaLanguage');
  while (qaLanguage.firstChild) {
    qaLanguage.removeChild(qaLanguage.firstChild);
  }
  newOptions.forEach(option => {
    const newOption = document.createElement('option');
    newOption.value = option.value;
    newOption.textContent = option.text;
    qaLanguage.appendChild(newOption);
  });
}

function submitOrganizationDetails() {
    let organizationName = document.getElementById("organizationName");
    let organizationCode = document.getElementById("organizationCode");
    let ReqBody = {
        "module": "ChatBotCms",
        "module_code": "ChatCmsService",
        "action": "addOrganization",
        "data": {
          "organization_code" : organizationCode.value,
          "organization_name" : organizationName.value
        }
    };
    let headers = {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + sessionStorage.getItem('SLIC_CHAT_TOKEN')
    };
    apiCall("http://product-service-be.dv/api/v1/chatbot/service", ReqBody, headers, response => {
        if (response.code == 200) {
          closePopUp();
          Swal.fire({
            title: 'Organization added Successfully..!',
            text: 'success',
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true
          });
        } else {
          closePopUp();
          Swal.fire({
            title: 'Organization added failure..!',
            text: 'error',
            icon: 'error',
            showConfirmButton: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true
          });
        }
    });
}

function submitProductDetails() {
    let productName = document.getElementById("productName");
    let productCode = document.getElementById("productCode");
    let organizationCode = document.getElementById("organizationCode");
    let ReqBody = {
        "module": "ChatBotCms",
        "module_code": "ChatCmsService",
        "action": "addProducts",
        "data": {
          "product_code" : productCode.value,
          "product_name" : productName.value,
          "organization_code" : organizationCode.value
        }
    };
    let headers = {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + sessionStorage.getItem('SLIC_CHAT_TOKEN')
    };
    apiCall("http://product-service-be.dv/api/v1/chatbot/service", ReqBody, headers, response => {
      if (response.code == 200) {
        closePopUp();
        Swal.fire({
          title: 'Product added Successfully..!',
          text: 'success',
          icon: 'success',
          showConfirmButton: true,
          allowOutsideClick: true,
          allowEscapeKey: true,
          allowEnterKey: true
        });
      } else {
        closePopUp();
        Swal.fire({
          title: 'Product added failure..!',
          text: 'error',
          icon: 'error',
          showConfirmButton: true,
          allowOutsideClick: true,
          allowEscapeKey: true,
          allowEnterKey: true
        });
      }
    });
}

function addQuestionArray() {
  document.getElementById('qaInputType').disabled = true;
  let qaLanguage = document.getElementById('qaLanguage');
  let language = qaLanguage.value;
  let options = qaLanguage.options;
  let clearFields = true;
  if (options.length != 1) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === qaLanguage.value) {
          qaLanguage.remove(i);
          break;
      }
    }
  } else {
    clearFields = false;
    document.getElementById('add_questions_array').disabled = true;
    document.getElementById('step-2').disabled = false;
  }
  if (qaInputType.value == 'radio') {
      const textareas = document.querySelectorAll('textarea');
      let options = {}, optionArray = [];
      textareas.forEach(textarea => {
        const name = textarea.getAttribute('name');
        const value = textarea.value;
        if (name === 'OptionText' && value.trim() !== '') {
          options.question = value;
        }
        if (name === 'OptionTitle' && value.trim() !== '') {
          options.question_title = value;
          optionArray.push(options);
          options = {};
        }
      });
      reqBodyArray.push({
        "language" : language,
        "product_id" : document.getElementById("productCode").value,
        "question_type" : document.getElementById("qaInputType").value,
        "question" : document.getElementById("QuestionText").value,
        "options" : optionArray
      });
  } else if (qaInputType.value == 'inputBox') {
    let validationType = document.getElementById("validationType").value;
    reqBodyArray.push({
          "language" : language,
          "product_id" : document.getElementById("productCode").value,
          "question_type": document.getElementById("qaInputType").value,
          "question": document.getElementById("QuestionText").value,
          "validation": {
              "minLength": document.getElementById("minLength").value,
              "maxLength": document.getElementById("maxLength").value,
              "regexPattern": document.getElementById("regex").value,
              "placeHolder": document.getElementById("placeHolder").value,
              "autocomplete": document.getElementById("autoComplete").value,
              "type": validationType,
              "errorMessage": {
                "minLength" : document.getElementById("minLengthErr").value,
                "maxLength" : document.getElementById("maxLengthErr").value,
                [validationType] : document.getElementById("regexErr").value,
                "required": document.getElementById("RequiredErr").value 
              }
          }
    });
  }
  Swal.fire({
    title: 'Question added Successfully..!',
    text: 'success',
    showConfirmButton: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true
  });
  if (clearFields) clearFieldValues();
}

function clearFieldValues() {
  let containers = document.querySelectorAll('.remove_value');
  containers.forEach(container => {
      let select = container.querySelector('select');
      if (select) select.value = '';
      let inputs = container.querySelectorAll('input');
      inputs.forEach(input => {
          input.value = '';
      });
      let textareas = container.querySelectorAll('textarea');
      textareas.forEach(textarea => {
          textarea.value = '';
      });
  });
}

function questionSave() {
    let ReqBody = {
        "module": "ChatBotCms",
        "module_code": "ChatCmsService",
        "action": "addQuestion",
        "data": {
          "question" : reqBodyArray,
          "product_id": document.getElementById("productCode").value,
        }
    };
    let headers = {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + sessionStorage.getItem('SLIC_CHAT_TOKEN')
    };
    apiCall("http://product-service-be.dv/api/v1/chatbot/service", ReqBody, headers, response => {
        reqBodyArray = [];
        closePopUp();
        Swal.fire({
          title: 'Question added Successfully..!',
          text: 'success',
          icon: 'success',
          showConfirmButton: true,
          allowOutsideClick: true,
          allowEscapeKey: true,
          allowEnterKey: true
        });
    });
}

function questionStepOne() {
  var step1Form = document.getElementById("step-1-form");
  var step2Form = document.getElementById("step-2-form");
  step1Form.style.display = "none";
  step2Form.style.display = "block";
}

function getQuestion() {
    const product_code = document.getElementById('searchProductCode');
    let ReqBody = {
        "module": "ChatBotCms",
        "module_code": "ChatCmsService",
        "action": "searchQuestion",
        "data": {
          "product_code" : product_code.value
        }
    };
    let headers = {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + sessionStorage.getItem('SLIC_CHAT_TOKEN')
    };
    apiCall("http://product-service-be.dv/api/v1/chatbot/service", ReqBody, headers, response => {
        const optionData = response.data;
        appendQuestions(optionData);
    });
}

function appendQuestions(questions) {
  const tbodyId = 'questionsTableBody';
  const tbody = document.getElementById(tbodyId);

  if (tbody) {
    tbody.parentNode.removeChild(tbody);
  }
  const newTbody = document.createElement('tbody');
  newTbody.id = tbodyId;

  questions.forEach((question, index) => {
    const tr = document.createElement('tr');

    const tdIndex = document.createElement('td');
    tdIndex.textContent = index + 1;
    tr.appendChild(tdIndex);

    const tdQuestionType = document.createElement('td');
    tdQuestionType.textContent = question.question_type;
    tr.appendChild(tdQuestionType);

    const tdLanguage = document.createElement('td');
    tdLanguage.textContent = question.language;
    tr.appendChild(tdLanguage);
    const tdQuestion = document.createElement('td');

    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'show_questions_' + (index + 1);
    button.className = 'show_questions';
    button.textContent = 'Show Question';
    button.setAttribute('onclick', `openQuestion('${JSON.stringify(question.question)}')`)
    tdQuestion.appendChild(button);

    tr.appendChild(tdQuestion);
    newTbody.appendChild(tr);
  });
  document.querySelector('table').appendChild(newTbody);
}

function openQuestion(question) {
  let qaAppendText = document.getElementById("questionTxt");
  qaAppendText.innerHTML = formatJson(JSON.parse(question));
  initModal("#openQuestions");
}

function formatJson(json) {
  let formatted = '<div>';
  for (let key in json) {
      if (json.hasOwnProperty(key)) {
          formatted += `<p><span class="key">${key}:</span> <span class="value">${json[key]}</span></p>`;
      }
  }
  formatted += '</div>';
  return formatted;
}

function qmSearchOrganizationCode(event, dropDownId) {
    const dropdown = dropDownId;
    if (!event.target.value)  {
      for (let i = dropdown.options.length - 1; i >= 0; i--) {
        dropdown.remove(dropdown.options[i]);
      }
      return;
    }
    for (let i = dropdown.options.length - 1; i >= 0; i--) {
      dropdown.remove(dropdown.options[i]);
    }
    let ReqBody = {
        "module": "ChatBotCms",
        "module_code": "ChatCmsService",
        "action": "getProductCodeByOrganization",
        "data": {
          "organization_code" : event.target.value
        }
    };
    let headers = {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + sessionStorage.getItem('SLIC_CHAT_TOKEN')
    };
    apiCall("http://product-service-be.dv/api/v1/chatbot/service", ReqBody, headers, response => {
        const optionData = response.data;
        optionData.forEach(options => {
          const option = document.createElement('option');
          option.text = options.product_name;
          option.value = options.product_code;
          dropdown.appendChild(option);
        });
    });
}

function openQaMapEditor(data, qaMapId, inputType) {
  reloadModal();
  updateQaCodeinputType = inputType;
  questionMapId = qaMapId;
  let resData = JSON.parse(data);

  if (resData.question_id) {
    document.getElementById("QaCode").value = resData.question_id;
  }

  if (inputType == 'inputBox') {
      if (resData.next_question_id) {
        document.getElementById("NextQaCode").value = resData.next_question_id;
      }
  } else if (inputType == 'radio') {
    document.getElementById("NextQaCode").disabled = true;
    let mappaingQaNext = document.querySelector(".row.question_add");
    const fragment = document.createDocumentFragment();
    resData.options.forEach((option, i) => {
      const tempContainer1 = document.createElement('div');
      tempContainer1.className = 'col-md-3';
      tempContainer1.innerHTML = `
        <div class="form-group focused">
          <label for="Option_${i}">Option:</label>
          <input id="Option_${i}" type="text" name="Option_${i}" value="${option.question}" class="form-control" disabled=true>
        </div>
      `;
      const tempContainer2 = document.createElement('div');
      tempContainer2.className = 'col-md-3';
      tempContainer2.innerHTML = `
        <div class="form-group focused">
          <label for="OptionCode_${i}">Option Code:</label>
          <input id="OptionCode_${i}" type="text" name="OptionCode_${i}" value="${option.question_id}" class="form-control">
        </div>
      `;
      const tempContainer3 = document.createElement('div');
      tempContainer3.className = 'col-md-3';
      tempContainer3.innerHTML = `
        <div class="form-group focused">
          <label for="OptionNextQaCode_${i}">Next Questioncode:</label>
          <input id="OptionNextQaCode_${i}" type="text" name="OptionNextQaCode_${i}" value="${option.next_question_id}" class="form-control">
        </div>
      `;
      fragment.appendChild(tempContainer1);
      fragment.appendChild(tempContainer2);
      fragment.appendChild(tempContainer3);
    });
    mappaingQaNext.appendChild(fragment);
  }
  initModal("#OpenQaMapping");
}

function inputTypeChange(){
  qaInputType = document.getElementById("qaInputType");
  if (qaInputType) {
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => group.classList.add('hidden'));
    const selectedOption = qaInputType.value;
    if (selectedOption) {
      const inputGroup = document.querySelectorAll(`.input-${selectedOption}`);
      inputGroup.forEach(group => {
        if (group) {
          group.classList.remove('hidden');
        }
      });
    }
  }
}

function updateQuestionCode() {
  let reqBody = {};
  const productCode = document.getElementById('qmSearchProductCode');
  const QaCode = document.getElementById('QaCode');
  const NextQaCode = document.getElementById('NextQaCode');
  if (updateQaCodeinputType == 'inputBox') {
    reqBody = {
        "module": "ChatBotCms",
        "module_code": "ChatCmsService",
        "action": "updateQuestionCode",
        "data": {
          "qcode_map_id" : questionMapId,
          "product_code": productCode.value,
          "question_code" : QaCode.value,
          "next_question_code" : NextQaCode.value
        }
    };
  } else if(updateQaCodeinputType == 'radio') {
    let values = [];
    let index = 0;

    while (document.getElementById(`OptionCode_${index}`) && document.getElementById(`OptionNextQaCode_${index}`)) {
        let obj = {};
        obj['index'] = index;
        obj['question_id'] = document.getElementById(`OptionCode_${index}`).value;
        obj['next_question_id'] = document.getElementById(`OptionNextQaCode_${index}`).value;
        values.push(obj);
        index++;
    }
    reqBody = {
      "module": "ChatBotCms",
      "module_code": "ChatCmsService",
      "action": "updateQuestionOptionCode",
      "data": {
        "qcode_map_id" : questionMapId,
        "product_code": productCode.value,
        "question_code" : QaCode.value,
        "question_option_code" : values
      }
    };
  }
  let headers = {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + sessionStorage.getItem('SLIC_CHAT_TOKEN')
  };
  apiCall("http://product-service-be.dv/api/v1/chatbot/service", reqBody, headers, response => {
    closePopUp();
    searchQuestion();
    Swal.fire({
      title: 'Question updated Successfully..!',
      text: 'success',
      icon: 'success',
      showConfirmButton: true,
      allowOutsideClick: true,
      allowEscapeKey: true,
      allowEnterKey: true
    });
  });
}

function searchQuestion() {
  const product_code = document.getElementById('qmSearchProductCode');
    let ReqBody = {
        "module": "ChatBotCms",
        "module_code": "ChatCmsService",
        "action": "searchQuestion",
        "data": {
          "product_code" : product_code.value
        }
    };
    let headers = {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + sessionStorage.getItem('SLIC_CHAT_TOKEN')
    };
    apiCall("http://product-service-be.dv/api/v1/chatbot/service", ReqBody, headers, response => {
      if (response.data) {
        const optionData = response.data;
        const groupedQuestion = optionData.reduce((acc, item) => {
          if (!acc[item.question_map_id]) {
              acc[item.question_map_id] = [];
          }
          acc[item.question_map_id].push(item);
          return acc;
        }, {});

        let container = document.querySelectorAll('.cards')[0];
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        if (Object.getOwnPropertyNames(groupedQuestion).length !== 0) {
            Object.keys(groupedQuestion).forEach(key => {
              const array = groupedQuestion[key];
              const card = document.createElement('div');
              card.className = 'card card-1';
              const titleDiv = document.createElement('div');
              titleDiv.className = 'card--title';
              const titleSpan = document.createElement('span');
              titleSpan.textContent = key;
              titleDiv.appendChild(titleSpan);
              const editDiv = document.createElement('div');
              editDiv.className = 'edit-qa-button ri-edit-box-line'; 
              editDiv.id = 'qa_value_' + key;
              if (array[0].question_type == 'radio') {
                editDiv.setAttribute('onclick', `openQaMapEditor('${JSON.stringify(array[0])}', '${key}', 'radio')`)
              } else if(array[0].question_type == 'inputBox') {
                editDiv.setAttribute('onclick', `openQaMapEditor('${JSON.stringify(array[0])}', '${key}',  'inputBox')`)
              }
              card.appendChild(titleDiv);
              card.appendChild(editDiv);
              array.forEach(item => {
                const valueH3 = document.createElement('h3');
                valueH3.className = 'card--value';
                valueH3.textContent = item.language;
                valueH3.setAttribute("data-question", item.question.question);
                valueH3.setAttribute('onclick', `questionView('${item.question.question}')`)
                card.appendChild(valueH3);
              });
              const chartDiv = document.createElement('div');
              chartDiv.className = 'chart';
              const qId = document.createElement('p');
              qId.id = "q_id_" + key;
              qId.className = array[0].question_id;
              qId.textContent = "q_id : " + array[0].question_id;
              chartDiv.appendChild(qId);
              const nextqId = document.createElement('p');
              nextqId.id = "next_qid_" + key;
              nextqId.className = array[0].next_question_id;
              nextqId.textContent = "next_qid : " + array[0].next_question_id;
              chartDiv.appendChild(nextqId);
              card.appendChild(chartDiv);
              container.appendChild(card);
            });
        } else {
          const notFound = document.createElement('h2');
          notFound.className = 'no_data_found';
          notFound.textContent = "no records found";
          container.appendChild(notFound);
        }
      }
    });
}

function questionView(data) {
  let qaAppendText = document.getElementById("question_text");
  qaAppendText.innerHTML = "Question: " + data;
  initModal("#openQuestionText");
}

function radioButton() {
    // Create the first column
    let radioColumn = 'radio_' + radioButtonCount;
    const col1 = document.createElement('div');
    col1.className = 'col-md-6 input-group remove_value rm-radio input-radio ' + radioColumn;

    const formGroup1 = document.createElement('div');
    formGroup1.className = 'form-group focused';

    const label1 = document.createElement('label');
    label1.setAttribute('for', 'OptionText');
    label1.textContent = 'Option:';

    const textarea1 = document.createElement('textarea');
    textarea1.className = 'form-control';
    textarea1.id = 'OptionText';
    textarea1.name = 'OptionText';
    textarea1.rows = 4;
    textarea1.cols = 50;
    textarea1.spellcheck = false;

    formGroup1.appendChild(label1);
    formGroup1.appendChild(textarea1);
    col1.appendChild(formGroup1);

    // Create the second column
    const col2 = document.createElement('div');
    col2.className = 'col-md-6 input-group remove_value rm-radio input-radio ' + radioColumn;

    const formGroup2 = document.createElement('div');
    formGroup2.className = 'form-group focused';

    const label2 = document.createElement('label');
    label2.setAttribute('for', 'OptionTitle');
    label2.textContent = 'Option title:';

    const textarea2 = document.createElement('textarea');
    textarea2.className = 'form-control';
    textarea2.id = 'OptionTitle';
    textarea2.name = 'OptionTitle';
    textarea2.rows = 4;
    textarea2.cols = 50;

    const removeButton = document.createElement('button');
    removeButton.className = 'remove remove_radio';
    removeButton.id = radioColumn;

    removeButton.setAttribute('onclick', `removeRadioButton('${radioColumn}')`)
    const removeIcon = document.createElement('i');
    removeIcon.className = 'fa.fa-minus';
    removeButton.appendChild(removeIcon);
    removeButton.appendChild(document.createTextNode(' Remove'));

    formGroup2.appendChild(label2);
    formGroup2.appendChild(textarea2);
    formGroup2.appendChild(removeButton);
    col2.appendChild(formGroup2);

    // Append columns to the container
    const container = document.querySelector('.row.new_row');
    container.appendChild(col1);
    container.appendChild(col2);
    radioButtonCount++;
}

function removeRadioButton(data) {
  const elements = document.querySelectorAll('.col-md-6.input-group.input-radio.' + data);
  elements.forEach(element => element.remove());
}

function reloadModal() {
  document.getElementById('OpenQaMapping').remove();
  const modal = document.createElement('div');
  modal.id = 'OpenQaMapping';
  modal.className = 'modal fade modal-align-mobile-bottom show';
  modal.style.display = 'none';
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-lg modal-dialog-center">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" id="closeQaMap" class="modal-close" onclick="closePopUp(document.getElementById('OpenQaMapping'))">
            <span class="sr-only">close</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="form-question">
            <div id="step-1-form" class="step-1-form">
              <h2 class="heading-xlarge text-center">Question Code</h2>
              <br>
              <div class="mobile-scroll-popup">
                <div class="row question_add">
                  <div class="col-md-6">
                    <div class="form-group focused">
                      <label for="QaCode">Question Code:</label>
                      <input id="QaCode" type="text" name="QaCode" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-4" id="mapping_qa_next">
                    <div class="form-group focused">
                      <label for="NextQaCode">Next Question Code:</label>
                      <input id="NextQaCode" type="text" name="NextQaCode" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="row button_submit">
                  <div class="col-md-6 text-center">
                    <button type="button" id="updateQcode" class="button button--large button--blue button--mobile" onclick="updateQuestionCode()">
                      <span>Continue</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}