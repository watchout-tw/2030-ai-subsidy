const errorImgSrc = 'https://raw.githubusercontent.com/watchout-tw/2030-ai-subsidy/main/assets/error.png'
const errorPageSrc = 'https://digi.nstc.gov.tw/AnnoucePage2.aspx'
const _FIELDS = [
  'name',
  'organizer',
  'description',
  'target',
  'type',
  'contact',
  'url',
  'logo'
];

function createSection() {
  const section = document.createElement('div');
  section.className = 'section';

  return section
}

function createEmptySectionHeader(message) {
  const errorBlock = document.createElement('div');
  errorBlock.className = 'error-header';

  const errorMessageElement = document.createElement('div');
  errorMessageElement.className = 'error-message';

  const textElement = document.createElement('p');
  textElement.className = 'text';
  textElement.textContent = message;
  errorMessageElement.appendChild(textElement);

  errorBlock.appendChild(errorMessageElement);
  return errorBlock;
}

function createSectionHeader(title, logo, count, updateTime, isError = false) {
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'section-header';

  if(logo) {
    const imgElement = document.createElement('img');
    imgElement.src = logo;
    imgElement.className = 'section-logo';
    sectionHeader.appendChild(imgElement);
  } else {
    const divElement = document.createElement('div');
    divElement.className = 'section-logo';
    sectionHeader.appendChild(divElement);
  }

  const sectionInfo = document.createElement('div');
  sectionInfo.className = 'section-info';

  const titleElement = document.createElement('h2');
  titleElement.textContent = title;
  titleElement.className = 'title';
  sectionInfo.appendChild(titleElement);

  if(!isError) {
    const summaryElement = document.createElement('p');
    summaryElement.textContent = `共 ${count} 筆補助資料`;
    summaryElement.className = 'summary';
    sectionInfo.appendChild(summaryElement);
  }

  if(updateTime) {
    const updateTimeElement = document.createElement('p');
    updateTimeElement.textContent = `更新時間：${updateTime}`;
    updateTimeElement.className = 'update-time';
    sectionInfo.appendChild(updateTimeElement);
  }

  sectionHeader.appendChild(sectionInfo);

  return sectionHeader
}

function createDetailContentBlock(item) {
  const detailContent = document.createElement('div');
  detailContent.className = 'detail-content';
  detailContent.style.display = 'none';

  const organizerTitle = document.createElement('div');
  organizerTitle.className = 'detail-title organizer';
  organizerTitle.textContent = '主辦單位';

  const descriptionTitle = document.createElement('div');
  descriptionTitle.className = 'detail-title description';
  descriptionTitle.textContent = '簡介與補助範疇';

  const targetTitle = document.createElement('div');
  targetTitle.className = 'detail-title target';
  targetTitle.textContent = '補助對象';

  const contactTitle = document.createElement('div');
  contactTitle.className = 'detail-title contact';
  contactTitle.textContent = '聯絡諮詢窗口';

  const organizer = document.createElement('p');
  organizer.className = 'detail-content-text organizer';
  organizer.textContent = item.organizer;

  const description = document.createElement('p');
  description.className = 'detail-content-text description';
  description.textContent = item.description;

  const target = document.createElement('p');
  target.className = 'detail-content-text target';
  target.textContent = item.target;

  const contact = document.createElement('p');
  contact.className = 'detail-content-text contact';
  contact.textContent = item.contact;

  const aTag = document.createElement('a');
  aTag.href = item.url;
  aTag.target = '_blank';
  const applyButton = document.createElement('button');
  applyButton.className = 'apply-button';
  applyButton.textContent = '前往申請';
  aTag.appendChild(applyButton);

  detailContent.appendChild(organizerTitle);
  detailContent.appendChild(organizer);
  detailContent.appendChild(descriptionTitle);
  detailContent.appendChild(description);
  detailContent.appendChild(targetTitle);
  detailContent.appendChild(target);
  detailContent.appendChild(contactTitle);
  detailContent.appendChild(contact);
  detailContent.appendChild(aTag);

  return detailContent
}

// Function to create a content block
function createContentBlock(item) {
  const contentBlock = document.createElement('div');
  contentBlock.className = 'content-block';

  const titleElement = document.createElement('h3');
  titleElement.textContent = item.name;
  contentBlock.appendChild(titleElement);

  const blueButton = document.createElement('div');
  blueButton.className = 'type';
  blueButton.textContent = item.type;
  contentBlock.appendChild(blueButton);

  const flexDiv = document.createElement('div');
  flexDiv.className = 'expand';
  contentBlock.appendChild(flexDiv);

  const expandButton = document.createElement('button');
  expandButton.className = 'button';
  expandButton.textContent = '展開';

  flexDiv.appendChild(expandButton);
  contentBlock.appendChild(flexDiv);
  contentBlock.appendChild(createDetailContentBlock(item));

  return contentBlock;
}

function createErrorBlock() {
  const errorLink = document.createElement('a');
  errorLink.className = 'error-link';
  errorLink.href = errorPageSrc;
  errorLink.target = '_blank';

  const errorBlock = document.createElement('div');
  errorBlock.className = 'error-block';

  const errorIconImg = document.createElement('img');
  errorIconImg.src = errorImgSrc;
  errorIconImg.className = 'error-icon';

  const errorMessageElement = document.createElement('div');
  errorMessageElement.className = 'error-message';

  const codeElement = document.createElement('p');
  codeElement.className = 'code';
  codeElement.textContent = '404';
  errorMessageElement.appendChild(codeElement);

  const textElement = document.createElement('p');
  textElement.className = 'text';
  textElement.textContent = '此筆資料不完全，暫時無法顯示';
  errorMessageElement.appendChild(textElement);

  errorBlock.appendChild(errorIconImg);
  errorBlock.appendChild(errorMessageElement);
  errorLink.appendChild(errorBlock);
  return errorLink
}

function buildBlock(item) {
  const block = fieldValidate(item) ? createContentBlock(item) : createErrorBlock();
  return block
}

function fieldValidate(data) {
  return _FIELDS.every(field => !!data[field]);
}

function setButtonEvent() {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.detail-content').forEach(block => {
        block.style.display = 'none'
      })
      document.querySelectorAll('.expand button').forEach(block => {
        block.style.display = 'block'
      })

      const detailContent = this.parentNode.nextElementSibling;

      if (detailContent.style.display === 'none' || detailContent.style.display === '') {
          detailContent.style.display = 'block';
          this.style.display = 'none';
      } else {
          detailContent.style.display = 'none';
      }
    });
  });
}

async function readData(dataList = []) {
  for(let i = 0; i < dataList.length; i++) {
    const data = dataList[i]
    const mainContent = document.querySelector('.main-content');
    const section = createSection();
    const sectionHeader = createSectionHeader(data.projects[0].organizer, data.projects[0].logo, data.projects.length, data.last_update_time, data.isError);
    section.appendChild(sectionHeader);
    data.projects.forEach(item => {
      section.appendChild(buildBlock(item));
    });
    mainContent.appendChild(section);
  }
  setButtonEvent();
}

let dataList = []

// TODO: 若尚有其它 AI 補助資源，請於此處填入，樣板如下：
/*
  try {
    dataList.push(**請填入補助資源變數名稱**);
  } catch(err) {
    dataList.push({
      last_update_time: '',
      isError: true,
      projects: [{
        organizer: '**補助來源單位名稱**'
      }]
    })
  }
*/

try {
  dataList.push(digiMoeaGovTwDataList);
} catch(err) {
  dataList.push({
    last_update_time: '',
    isError: true,
    projects: [{
      organizer: '經濟部'
    }]
  })
}

try {
  dataList.push(ndcGovTwDataList);
} catch(err) {
  dataList.push({
    last_update_time: '',
    isError: true,
    projects: [{
      organizer: '國家發展委員會管制考核處'
    }]
  })
}

readData(dataList);
