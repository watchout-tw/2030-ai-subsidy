const subsidySources = [
  'https://beta.blablabla.watchout.tw/data/economic_affairs/ai_subsidy/projects.json',
  'https://beta.blablabla.watchout.tw/data/ntsc/ai_subsidy/projects.json'
]
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

function createSectionHeader(title, logo, count, updateTime) {
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'section-header';

  const imgElement = document.createElement('img');
  imgElement.src = logo;
  imgElement.className = 'section-logo';
  sectionHeader.appendChild(imgElement);

  const sectionInfo = document.createElement('div');
  sectionInfo.className = 'section-info';

  const titleElement = document.createElement('h2');
  titleElement.textContent = title;
  titleElement.className = 'title';
  sectionInfo.appendChild(titleElement);

  const summaryElement = document.createElement('p');
  summaryElement.textContent = `共 ${count} 筆補助資料`;
  summaryElement.className = 'summary';
  sectionInfo.appendChild(summaryElement);

  const updateTimeElement = document.createElement('p');
  updateTimeElement.textContent = `更新時間：${updateTime}`;
  updateTimeElement.className = 'update-time';
  sectionInfo.appendChild(updateTimeElement);

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
  contact.className = 'detail-content-textcontact';
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
  const errorBlock = document.createElement('div');
  errorBlock.className = 'error-block';

  const errorIconImg = document.createElement('img');
  errorIconImg.src = 'https://www.flaticon.com/download/icon/11743736?icon_id=11743736&author=668&team=668&keyword=Error&pack=11743657&style=1&style_id=1369&format=png&color=%23000000&colored=1&size=512&selection=1&type=standard&search=404';
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

  return errorBlock
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
      const detailContent = this.parentNode.nextElementSibling;

      if (detailContent.style.display === 'none' || detailContent.style.display === '') {
          detailContent.style.display = 'block';
          this.textContent = '收起';
      } else {
          detailContent.style.display = 'none';
          this.textContent = '展開';
      }
    });
  });
}

// Fetch data from data.json and add content blocks dynamically
fetch('https://beta.blablabla.watchout.tw/data/economic_affairs/ai_subsidy/projects.json')
  .then(response => response.json())
  .then(data => {
    const mainContent = document.querySelector('.main-content');
    const section = createSection();
    const sectionHeader = createSectionHeader(data.projects[0].organizer, data.projects[0].logo, data.projects.length, data.last_update_time);
    section.appendChild(sectionHeader);
    data.projects.forEach(item => {
      section.appendChild(buildBlock(item));
    });
    mainContent.appendChild(section);
    return fetch('https://beta.blablabla.watchout.tw/data/ntsc/ai_subsidy/projects.json')
  })
  .then(response => response.json())
  .then(data => {
    const mainContent = document.querySelector('.main-content');
    const section = createSection();
    const sectionHeader = createSectionHeader(data.projects[0].organizer, data.projects[0].logo, data.projects.length, data.last_update_time);
    section.appendChild(sectionHeader);
    data.projects.forEach(item => {
      section.appendChild(buildBlock(item));
    });
    mainContent.appendChild(section);
    setButtonEvent();
  })
  .catch(error => console.error('Error fetching data:', error));
