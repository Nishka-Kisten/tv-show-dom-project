let body = document.querySelector('body');
const rootElem = document.getElementById("root"); // main div with all episodes
  let allEpisodes = getAllEpisodes();  //get data from function
  let numOfEp = allEpisodes.length;

  let select = document.createElement('select'); // create dropdown 
  select.id= "dropdwn";
  body.insertBefore(select, rootElem);

  let selectHolder = document.createElement('option'); // create options for dropdown
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
   displayNum.innerText = `displaying ${allEpisodes.length}/${allEpisodes.length} episodes.`;

let dataFrom = document.createElement('p'); // element telling where data is from
dataFrom.innerHTML = `This data is from <a href =${"https://www.tvmaze.com/shows/82/game-of-thrones"} >TVMaze.com</a> `;
body.appendChild(dataFrom);


let arr =[];   //Creating array of data needed

 for(let i=0; i<numOfEp; i++){
  // Zero pads to two digits for season and episode.
     prepended_out = ("0" + allEpisodes[i].season ).slice(-2);
   prepended_out2 = ("0" + allEpisodes[i].number ).slice(-2);
let epData = {
            name:`${allEpisodes[i].name}`,
           season: `${prepended_out}`,
           number: `${prepended_out2}`,
           image: `${allEpisodes[i].image.medium}`,
           summary: `${allEpisodes[i].summary}`,
           id: `${allEpisodes[i].id}`
          }; 
   arr.push(epData);
}


//episode data to be displayed on screen
function display(){
  let data = arr.map((ep)=> {
    prepended_out = ("0" + ep.season ).slice(-2);
     prepended_out2 = ("0" + ep.number ).slice(-2);
    return   `
           <div class="episode" id="${ep.id}">
               <h1>${ep.name} S${prepended_out}E${prepended_out2}</h1>
                 <img src="${ep.image}" title ="ep"></img>
                 ${ep.summary}
              </div>`;
    }) .join('');
   return data;
  }

 rootElem.innerHTML = rootElem.innerHTML + display(); 

  let episode = document.querySelector('#episode');
//Search for episodes
  search.addEventListener('keyup', (e) => {
      const searchString = e.target.value.toLowerCase(); //value typed
      const filteredEp = arr.filter((ep) => {
          return (  
            ep.name.toLowerCase().includes(searchString) || 
           ep.summary.toLowerCase().includes(searchString)
          );
     
      });  
      
        if(filteredEp.length > 0){
          displayNum.innerText = `Displaying ${filteredEp.length}/${allEpisodes.length} episodes.`
          //changes inner text depending on how many episodes displayed

          rootElem.innerHTML =     //changes episodes displayed depending on input
            filteredEp.map((ep) => { 
                prepended_out = ("0" + ep.season ).slice(-2);
                prepended_out2 = ( "0" + ep.number ).slice(-2);
         return   `
         <div class="episode" id="${ep.id}">
             <h1>${ep.name} S${prepended_out}E${prepended_out2}</h1>
             <img src="${ep.image}" title ="ep"></img>
              ${ep.summary} </div> ` ;
                        
         }).join('');
       } else {
        displayNum.innerHTML = `Displaying ${filteredEp.length}/${allEpisodes.length} episodes.`
       return rootElem.innerHTML =  `<p>No match found</p>`;
       }
      
    });

 let dropDown = arr.map(x => { //displays all episode names in dropdown
  prepended_out = ( "0" + x.season ).slice(-2);
  prepended_out2 = ( "0" + x.number ).slice(-2);
    return `<option value="${x.id}"> S${prepended_out}E${prepended_out2}- ${x.name}</option>`
 }).join('');

 select.innerHTML =  select.innerHTML + dropDown;
  
select.addEventListener('click', (e) => {
 let selectedOpt = e.target.value;
 const opt = arr.filter((ep) => {
  return  ep.id === selectedOpt;
})  //displays episode depending on what option is picked
 if(opt == ""){ 
  displayNum.innerText = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes.`
  return   rootElem.innerHTML = display();
  } else {
  displayNum.innerText = `Displaying ${opt.length}/${allEpisodes.length} episodes.`
  return rootElem.innerHTML = 
  opt.map((ep)=> {
     prepended_out = ("0" + ep.season ).slice(-2);
     prepended_out2 = ("0" + ep.number ).slice(-2);
    return  `
    <div class="episode" id="${ep.id}">
        <h1>${ep.name} S${prepended_out}E${prepended_out2}</h1>
        <img src="${ep.image}" title ="ep"></img>
         ${ep.summary} </div> ` 
  }).join('')
 }
})
