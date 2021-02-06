let pageNo = pageCount = 1;

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
  axios.get(`/data/${weekNumber}.json`).then(
    response => {
      updateSixties(response.data.sixties);
      updateGold(response.data.gold);
      updateProgress(response.data.progress);
      updateProgressDate(response.data.lastUpdate);
      
      document.getElementById('page-number').innerText = `Page: ${weekNumber} of ${pageCount}`;
    }

  )
}

const updateSixties = (list) => {
  const classes = ["w-10", "h-10", "m-1", "rounded", "md:w-16", "md:h-16"];
  const el = document.getElementById('sixties');
  // Remove any existing content before we update
  el.innerHTML = '';

  list.forEach(wowClass => {
    let node = document.createElement('img');
    node.src = `/img/class_${wowClass}.jpg`;
    node.classList.add(...classes);

    el.appendChild(node);
  })
}

const updateGold = (value) => {
  const el = document.getElementById('current-gold');
  el.innerText = value;
}

const updateProgress = (progress) => {
  let max = 0;
  let current = 0;

  
  for (const wowClass in progress) {
    const el = document.getElementById(wowClass);
    const width = progress[wowClass].current / progress[wowClass].max * 100;
    el.style.width = width.toFixed(2) + "%";

    el.style.backgroundColor = progress[wowClass].colour;


    el.innerHTML = width.toFixed(2) + `%<br>${progress[wowClass].current} / ${progress[wowClass].max}`;

    max += progress[wowClass].max;
    current += progress[wowClass].current;
  }

  const el = document.getElementById('totals');
  const width = current / max * 100;
  el.style.width = width.toFixed(2) + "%";

  el.innerHTML = width.toFixed(2) + `%<br>${current} / ${max}`;
}

const updateProgressDate = date => document.getElementById('last-update').innerText = date;

documentReady(navigate('last'));