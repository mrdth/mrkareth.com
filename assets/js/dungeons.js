let pageNo = pageCount = 13;

const progressColours = [
    '#ED1C34',
    '#EC301D',
    '#EB591E',
    '#EA821F',
    '#E9AA20',
    '#E8D121',
    '#D7E721',
    '#AFE622',
    '#88E523',
    '#61E424',
    '#3BE424'
];

const expansions = [ 
  'Classic', 
  'Burning Crusade', 
  'Wrath of the Lich King', 
  'Cataclysm', 
  'Mists of Pandaria', 
  'Warlords of Draenor',
  'Legion',
  'Battle for Azeroth',
  'Shadowlands'
];

const documentReady = (callbackFunction) => {
  if (document.readyState != 'loading')
    callbackFunction(event)
  else
    document.addEventListener("DOMContentLoaded", callbackFunction)
}

document.addEventListener("keyup", ev => {
  switch (ev.key) {
    case 'ArrowLeft':
      if (pageNo > 1) pageNo--;
      break;
    case 'ArrowRight':
      if (pageNo < pageCount) pageNo++;
      break;
    default:
  }
  update(pageNo);
});

const navigate = (page) => {
  switch (page) {
    case 'first':
      pageNo = 1;
      break;
    case 'prev':
      if (pageNo > 1) pageNo--;
      break;
    case 'next':
      if (pageNo < pageCount) pageNo++;
      break;
    case 'last':
      pageNo = pageCount;
      break;
  }
  update(pageNo);
}

const update = (weekNumber) => {
    Papa.parse(`/data/dungeons/${weekNumber}.csv`, {
        download: true,
        header: true,
        complete: function(results) {
            let tableHead = document.getElementById('table-head');
            tableHead.innerHTML = '';
            tableHead.appendChild(createHeader(results.meta.fields));

            let tableBody = document.getElementById('table-body');
            tableBody.innerHTML = '';
            for (let row in results.data) {
                tableBody.appendChild(createRow(results.data[row]));
            }
        }
    });

    document.getElementById('page-number').innerText = `Page: ${weekNumber} of ${pageCount}`;
}

const createHeader = (values) => {
    let row = document.createElement('tr');

    values.forEach(element => {
        let cell = document.createElement('th');
        cell.classList = 'text-center';
        
        if (element !== '') {
            cell.appendChild(getClassImage(element));
        }
        else {
            cell.textContent = element;
        }

        row.appendChild(cell);
    });

    return row;
}

const createRow = (values) => {
    let row = document.createElement('tr');

    for(let key in values)  {
        let cell = document.createElement('td');
        
        contents = values[key];
        let classList = 'p-1 border-b border-black bg-indigo-300'
        if (key !== "") {
          classList = 'text-center p-1 border border-black'
            contents = contents + '%';
        }
        
        if ( expansions.indexOf(values[key]) !== -1) {
          classList += ' font-black text-white bg-indigo-900';
        }

        cell.textContent = contents;
        cell.style.backgroundColor = progressColours[Math.floor(values[key] / 10)];
        cell.classList = classList;

        row.appendChild(cell);
    }

    return row;
}

const getClassImage = (className) => {
    const img = document.createElement('img');
    img.src = `/assets/img/class_${className.toLowerCase()}.jpg`;

    return img;
}

documentReady(navigate('last'));