let body = document.querySelector('body');
const rootElem = document.getElementById("root"); // main div wiShows
  let allEpisodes = getAllEpisodes();  //get data from function

  let selectSeries = document.createElement('select'); // create dropdown for series
  selectSeries.id= "dropdwnSeries";
  body.insertBefore(selectSeries, rootElem);

  let selectHoldSeries = document.createElement('option'); // create options for dropdown series
  selectHoldSeries.value ="Series";
  selectHoldSeries.innerText ="Select Series";
  selectSeries.appendChild(selectHoldSeries);

  let select = document.createElement('select'); // create dropdown for episodes
  select.id= "dropdwn";
  body.insertBefore(select, rootElem);

  let selectHolder = document.createElement('option'); // create options for dropdown episodes
  selectHolder.value = "episodes";
  selectHolder.innerText = "Select Episode";
  select.appendChild(selectHolder);

let input = document.createElement("input"); //create input field
   input.type="search";
   input.id="search";
   input.placeholder="Search...";
   body.insertBefore(input, rootElem);
   const search = document.getElementById('search');

let displayNum = document.createElement('div');  //how many episodes on the screen
displayNum.id = "displayNum";
   body.insertBefore(displayNum, rootElem);

let dataFrom = document.createElement('p'); // element telling where data is from
dataFrom.innerHTML = `This data is from <a href =${"https://www.tvmaze.com/shows/82/game-of-thrones"} >TVMaze.com</a> `;
body.appendChild(dataFrom);


let allShows = getAllShows();
let length = allShows.length;
let shows =[];
  //Creating array of data needed
 for(let i=0; i<length; i++){
let g = { name:`${allShows[i].name}`, id: `${allShows[i].id}` }; 
shows.push(g);
}
const arr = shows.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); 
  if (nameA < nameB) {
    return -1; //nameA comes first
  }
  if (nameA > nameB) {
    return 1; // nameB comes first
  }
  return 0;  // names must be equal
});

selectSeries.addEventListener('click', (e) => {
    let targetedShow = e.target.value;
      var filteredArr = arr.filter((show) => { return show.id.includes(targetedShow)});   
      let SHOW_ID =  targetedShow;
      if(filteredArr == ""){ 
      console.log("working");
     } else {
      select.innerHTML = "";
    let url = `https://api.tvmaze.com/shows/${SHOW_ID}/episodes`;
    getEpData(url);
    }
     })

function setup() {
  let url =`https://api.tvmaze.com/shows/82/episodes`;
  getEpData(url);
  let dropDownSeries = arr.map(ep =>{
    return `<option value=${ep.id}>${ep.name}</option>`}).join('');
 selectSeries.innerHTML += dropDownSeries

}
window.onload = setup;

 async function getEpData(url){
  fetch(url)
   .then(response => {
    return response.json()})
    .then((episodeData) => {
    displayEp(episodeData);
    searchBar(episodeData);
    makeDropDown(episodeData);
    })
 .catch (err =>{
    console.error(err)}
   )}
 
     function displayEp(data){
    displayNum.innerText = `displaying ${data.length}/${data.length} episodes.`;
    const results = data.map(ep => { 
      prepended_out = ("0" + ep.season ).slice(-2);
      prepended_out2 = ("0" + ep.number ).slice(-2);
      if(ep.image == null){
        return `
        <div class="episode" id="${ep.id}">
        <h1>${ep.name} S${prepended_out}E${prepended_out2}</h1>
          ${ep.summary}
         </div> `
        } else {
        return `
        <div class="episode" id="${ep.id}">
        <h1>${ep.name} S${prepended_out}E${prepended_out2}</h1>
        <img src="${ep.image.medium}"></img>
          ${ep.summary}
         </div> `}}).join('');
    rootElem.innerHTML = results;
  }

function searchBar(data){
  search.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase(); //value typed
    const filteredEp = data.filter((ep) => {
        return (  
          ep.name.toLowerCase().includes(searchString) || 
         ep.summary.toLowerCase().includes(searchString)
        )}); 
       displayEp(filteredEp);
      })
}

  async function makeDropDown(data){
  let dropDown = data.map(ep => {//displays all episode names in dropdown
  prepended_out = ( "0" + ep.season ).slice(-2);
  prepended_out2 = ( "0" + ep.number ).slice(-2);
    return `<option value="${ep.id}"> S${prepended_out}E${prepended_out2}- ${ep.name}</option>`
 }).join('');
 select.innerHTML += dropDown;
        
select.addEventListener('click', (e) => {
 let selectedOption = e.target.value; //displays episode depending on what option is picked
  opt = data.filter((ep) => {
    return  ep.id == selectedOption }); 
 if(opt == ""){ 
  displayEp(data);
  } else {
 displayEp(opt);
 }
})}