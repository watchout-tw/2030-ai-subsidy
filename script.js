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

// Function to create a content block
function createContentBlock(title, buttonLabel) {
  const contentBlock = document.createElement('div');
  contentBlock.className = 'content-block';

  const titleElement = document.createElement('h3');
  titleElement.textContent = title;
  contentBlock.appendChild(titleElement);

  const blueButton = document.createElement('div');
  blueButton.className = 'type';
  blueButton.textContent = buttonLabel;
  contentBlock.appendChild(blueButton);

  const expandButton = document.createElement('button');
  expandButton.className = 'expand-button';
  expandButton.addEventListener('click', () => {
      alert('展開功能尚未實作');
  });

  const button = document.createElement('span');
  button.className = 'button';
  button.textContent = '展開';
  expandButton.appendChild(button);

  contentBlock.appendChild(expandButton);

  return contentBlock;
}

function createErrorBlock() {
  const errorBlock = document.createElement('div');
  errorBlock.className = 'error-block';

  const errorCodeElement = document.createElement('p');
  errorCodeElement.className = 'error-code';
  errorCodeElement.textContent = '404';
  errorBlock.appendChild(errorCodeElement);

  const errorMsgElement = document.createElement('p');
  errorMsgElement.className = 'error-message';
  errorMsgElement.textContent = '此內容暫時無法顯示';
  errorBlock.appendChild(errorMsgElement);

  return errorBlock
}

function buildBlock(item) {
  const block = fieldValidate(item) ? createContentBlock(item.name, item.type) : createErrorBlock();
  return block
}

function fieldValidate(data) {
  const fields = ['name', 'organizer', 'description', 'target', 'type', 'contact', 'url', 'logo'];
  return fields.every(field => !!data[field]);
}

// Fetch data from data.json and add content blocks dynamically
fetch('http://localhost:8080/data/economic_affairs/ai_subsidy/projects.json')
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
  })
  .catch(error => console.error('Error fetching data:', error));

fetch('http://localhost:8080/data/ntsc/ai_subsidy/projects.json')
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
  })
  .catch(error => console.error('Error fetching data:', error));
