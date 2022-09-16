let body = document.querySelector('body');
const rootElem = document.getElementById("root"); // main div wiShows
  let allEpisodes = getAllEpisodes();  //get data from function

  let selectSeries = document.createElement('select'); // create dropdown for series
  selectSeries.id= "dropdwnSeries";
  body.insertBefore(selectSeries, rootElem);

  let selectHoldSeries = document.createElement('option'); // create options for dropdown series
  selectHoldSeries.value ="";
  selectHoldSeries.innerText ="Select Series";
  selectSeries.appendChild(selectHoldSeries);

  let select = document.createElement('select'); // create dropdown for episodes
  select.id= "dropdwn";
  body.insertBefore(select, rootElem);

  let selectHolder = document.createElement('option'); // create options for dropdown episodes
  selectHolder.value ="";
  selectHolder.innerText ="Select Episode";
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
let arr =[];
  //Creating array of data needed
 for(let i=0; i<length; i++){
let g = {
          name:`${allShows[i].name}`,
           id: `${allShows[i].id}`
          }; 
arr.push(g);

}
// let go = arr.(x => getEpData(x.id);

async function getEpData(SHOW_ID){
   let url = `https://api.tvmaze.com/shows/82/episodes`;
  // let url2 = `https://api.tvmaze.com/shows/${SHOW_ID}/episodes`;
  try {
    const response = await fetch(url);
    episodeData = await response.json();
    displayEp(episodeData)
    makeDropDown(episodeData);
   //displayImg(episodeData);
} catch (err) {
    console.error(err);
}
  }

  function displayEp(data){
    displayNum.innerText = `displaying ${data.length}/${episodeData.length} episodes.`;
    const results = data.map(ep => { 
      prepended_out = ("0" + ep.season ).slice(-2);
      prepended_out2 = ("0" + ep.number ).slice(-2);
        return `
        <div class="episode" id="${ep.id}">
        <h1>${ep.name} S${prepended_out}E${prepended_out2}</h1>
        <img src="${ep.image.medium}"></img>
          ${ep.summary}
         </div>  
    `;
    }) .join('');
    rootElem.innerHTML = results;
  }
  
//Search for episodes
  search.addEventListener('keyup', (e) => {
      const searchString = e.target.value.toLowerCase(); //value typed
      const filteredEp = episodeData.filter((ep) => {
          return (  
            ep.name.toLowerCase().includes(searchString) || 
           ep.summary.toLowerCase().includes(searchString)
          )}); 
         displayEp(filteredEp);
        })


  async function makeDropDown(data){
 let dropDown = data.map(ep => { //displays all episode names in dropdown
  prepended_out = ( "0" + ep.season ).slice(-2);
  prepended_out2 = ( "0" + ep.number ).slice(-2);
    return `<option value="${ep.id}"> S${prepended_out}E${prepended_out2}- ${ep.name}</option>`
 }).join('');

 select.innerHTML +=dropDown;

 let dropDownSeries = arr.map(ep =>{ //displays series names in dropdown
  return `<option value=${ep.id}">${ep.name}</option>`
 }).join('');

 selectSeries.innerHTML += dropDownSeries;
         }
        


select.addEventListener('click', (e) => {
 let selectedOption = e.target.value;
 
 const opt = episodeData.filter((ep) => {
  return  ep.id == selectedOption;
}); //displays episode depending on what option is picked
 if(opt == ""){ 
  displayEp(episodeData);
  } else {
 displayEp(opt);
 }
})


// selectSeries.addEventListener('click', (e) => {
// let seriesSelected =  e.target.value;



// })

getEpData();
