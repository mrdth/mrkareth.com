let pageNo = pageCount = 1;

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

const documentReady = (callbackFunction) => {
  if (document.readyState != 'loading')
    callbackFunction(event)
  else
    document.addEventListener("DOMContentLoaded", callbackFunction)
}

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
        cell.classList = 'p-1 border-t border-b border-black'
        if (key !== "") {
          cell.classList = 'text-center p-1 text-xs border border-black'
            contents = contents + '%';
        }
        
        cell.textContent = contents;
        cell.style.backgroundColor = progressColours[Math.floor(values[key] / 10)];


        row.appendChild(cell);
    }

    return row;
}

const getClassImage = (className) => {
    const img = document.createElement('img');
    console.log(className.toLowerCase());
    img.src = `/img/class_${className.toLowerCase()}.jpg`;

    return img;
}

documentReady(navigate('last'));