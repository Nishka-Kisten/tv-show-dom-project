let body = document.querySelector("body");
const rootElem = document.getElementById("root"); // main div w\\
// let allEpisodes = getAllEpisodes();  //get data from function

let controlsContainer = document.createElement("div");
controlsContainer.id = "controls";
body.insertBefore(controlsContainer, rootElem);

let selectSeries = document.createElement("select"); // create dropdown for series
selectSeries.className = "dropdown";
//body.insertBefore(selectSeries, rootElem);
controlsContainer.appendChild(selectSeries);

let selectHoldSeries = document.createElement("option"); // create options for dropdown series
selectHoldSeries.value = "Series";
selectHoldSeries.innerText = "Select Series";
selectSeries.appendChild(selectHoldSeries);

let select = document.createElement("select"); // create dropdown for episodes
select.className = "dropdown";
//body.insertBefore(select, rootElem);
controlsContainer.appendChild(select);

let selectHolder = document.createElement("option"); // create options for dropdown episodes
selectHolder.value = "episodes";
selectHolder.innerText = "Select Episode";
select.appendChild(selectHolder);

let input = document.createElement("input"); //create input field
input.type = "search";
input.id = "search";
input.placeholder = "Search...";
//body.insertBefore(input, rootElem);
controlsContainer.appendChild(input);
const search = document.getElementById("search");

let displayNum = document.createElement("div"); //how many episodes on the screen
displayNum.id = "displayNum";
//body.insertBefore(displayNum, rootElem);
controlsContainer.appendChild(displayNum);

let dataFrom = document.createElement("p"); // element telling where data is from
dataFrom.innerHTML = `This data is from <a href =${"https://www.tvmaze.com/shows/82/game-of-thrones"} >TVMaze.com</a> `;
body.appendChild(dataFrom);

let allShows = getAllShows();
let length = allShows.length;
let shows = [];
//Creating array of data needed
for (let i = 0; i < length; i++) {
  let g = { name: `${allShows[i].name}`, id: `${allShows[i].id}` }; //becomes obj with name and id keys
  shows.push(g); //push objects to array
}
const arr = shows.sort(function (a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1; //nameA comes first
  }
  if (nameA > nameB) {
    return 1; // nameB comes first
  }
  return 0; // names must be equal
});

selectSeries.addEventListener("click", (e) => {
  //series drop down
  let targetedShow = e.target.value;
  // console.log(targetedShow)
  var filteredArr = arr.filter((show) => {
    return show.id.includes(targetedShow);
  }); //arr of series names
  let SHOW_ID = targetedShow;
  if (filteredArr == "") {
    console.log("working");
  } else {
    select.innerHTML = ""; //   creates ep dropdown
    let url = `https://api.tvmaze.com/shows/${SHOW_ID}/episodes`;
    getEpData(url);
  }
});

function setup() {
  let url = `https://api.tvmaze.com/shows/82/episodes`;
  getEpData(url);
  let dropDownSeries = arr
    .map((ep) => {
      return `<option value=${ep.id}>${ep.name}</option>`;
    })
    .join("");
  selectSeries.innerHTML += dropDownSeries;
}
window.onload = setup;

async function getEpData(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((episodeData) => {
      displayEp(episodeData);
      searchBar(episodeData);
      makeDropDown(episodeData);
    })
    .catch((err) => {
      console.error(err);
    });
}

function displayEp(data) {
  displayNum.innerText = `Displaying ${data.length}/${data.length} episodes.`; //*****
  const results = data
    .map((ep) => {
      seasonNum = ("0" + ep.season).slice(-2);
      episodeNum = ("0" + ep.number).slice(-2);

      // fallbacks for null
      let imgSrc = ep.image?.medium || "placeholder.jpg";
      let summaryText = ep.summary || "<p>No summary available.</p>";

      return `
      <div class="episode" id="${ep.id}">
        <h1>${ep.name} S${seasonNum}E${episodeNum}</h1>
        <img src="${imgSrc}" alt="${ep.name}">
        ${summaryText}
      </div>`;
    })
    .join("");
  rootElem.innerHTML = results;
}

function searchBar(data) {
  search.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase(); //value typed
    const filteredEp = data.filter((ep) => {
      //in the case of null
      const nameText = (ep.name || "").toLowerCase();
      const summaryText = (ep.summary || "").toLowerCase();

      return (
        nameText.includes(searchString) || //val typed included in name
        summaryText.includes(searchString) //val typed included in summary
      );
    });
    displayEp(filteredEp);
  });
}

function makeDropDown(data) {
  let dropDown = data
    .map((ep) => {
      //displays all episode names in dropdown
      prepended_out = ("0" + ep.season).slice(-2);
      prepended_out2 = ("0" + ep.number).slice(-2);
      return `<option value="${ep.id}"> S${prepended_out}E${prepended_out2}- ${ep.name}</option>`;
    })
    .join("");
  select.innerHTML += dropDown;

  select.addEventListener("change", (e) => {
    let selectedOption = e.target.value; // the episode id
    const targetEp = document.getElementById(selectedOption);

    if (targetEp) {
      // scrolls to episode picked
      targetEp.scrollIntoView({ behavior: "smooth", block: "start" });

      // Add a highlight class
      targetEp.classList.add("highlight");

      //Remove highlight after a delay
      setTimeout(() => {
        targetEp.classList.remove("highlight");
      }, 2000);
    }
  });
}
