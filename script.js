let body = document.querySelector('body');
const rootElem = document.getElementById("root"); // main div with all episodes
  let allEpisodes = getAllEpisodes(); 
  let numOfEp = allEpisodes.length;
  let select = document.createElement('select');
  select.id= "dropdwn";
  body.insertBefore(select, rootElem);
  let selectHolder = document.createElement('option');
  selectHolder.value ="";
  selectHolder.innerText ="Select Episode";
  select.appendChild(selectHolder);
let input = document.createElement("input");
   input.type="search";
   input.id="search";
   input.placeholder="Search...";
   body.insertBefore(input, rootElem);
let display = document.createElement('div');
display.id = "display";
   body.insertBefore(display, rootElem);
let dataFrom = document.createElement('p');
dataFrom.innerHTML = `This data is from <a href =${"https://www.tvmaze.com/shows/82/game-of-thrones"} >TVMaze.com</a> `;
body.appendChild(dataFrom);
display.innerText = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes.`;
const search = document.getElementById('search');

let arr =[];
  //Creating array of data needed
 for(let i=0; i<numOfEp; i++){
  // Zero pads to two digits.
 let prepended_out = (
  "0" + allEpisodes[i].season ).slice(-2);
  let prepended_out2 = (
  "0" + allEpisodes[i].number ).slice(-2);
let g = {
            name:`${allEpisodes[i].name}`,
           season: `${prepended_out}`,
           number: `${prepended_out2}`,
           image: `${allEpisodes[i].image.medium}`,
           summary: `${allEpisodes[i].summary}`,
           id: `${allEpisodes[i].id}`
          }; arr.push(g);
}
let y = arr.map((ep)=> {
  prepended_out = (
    "0" + ep.season ).slice(-2);
   prepended_out2 = (
    "0" + ep.number ).slice(-2);
  return  `
         <div class="episode" id="${ep.id}">
             <h1>${ep.name} S${prepended_out}E${prepended_out2}</h1>
               <img src="${ep.image}" title ="ep"></img>
               ${ep.summary}
            </div>`;
  }) .join('');
 

  rootElem.innerHTML = rootElem.innerHTML + y; 

  let episode = document.querySelector('#episode');
  search.addEventListener('keyup', (e) => {
      const searchString = e.target.value.toLowerCase();
      const filteredEp = arr.filter((ep) => {
          return (  
            ep.name.toLowerCase().includes(searchString) ||
           ep.summary.toLowerCase().includes(searchString)
          );
  
      }); 
      //console.log(filteredEp)
      
        if(filteredEp.length > 0){

          display.innerText = `Displaying ${filteredEp.length}/${allEpisodes.length} episodes.`
          rootElem.innerHTML =
            filteredEp.map((ep) => { 
           prepended_out = (
                 "0" + ep.season ).slice(-2);
                prepended_out2 = (
                 "0" + ep.number ).slice(-2);
         return  `
                   <div class="episode" id="${ep.id}">
                       <h1>${ep.name} S${prepended_out}E${prepended_out2}</h1>
                       <img src="${ep.image}" title ="ep"></img>
                        ${ep.summary} </div> ` 
                        
         })  
       } else {
        display.innerText = `Displaying ${filteredEp.length}/${allEpisodes.length} episodes.`
       return rootElem.innerHTML = 'no match found'
       
       }
      
    });

 let d = arr.map(x => {
  prepended_out = (
    "0" + x.season ).slice(-2);
   prepended_out2 = (
    "0" + x.number ).slice(-2);
  return `<option value="${x.id}"> S${prepended_out}E${prepended_out2}- ${x.name}</option>`
 }).join('');
 select.innerHTML =  select.innerHTML + d;
  
select.addEventListener('click', (e) => {
 let selectedOpt = e.target.value;
 const opt = arr.filter((ep) => {
  return  ep.id === selectedOpt
});  
 if(opt == ""){
  display.innerText = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes.`
  return   rootElem.innerHTML =
  arr.map((ep)=> {
    prepended_out = (
      "0" + ep.season ).slice(-2);
     prepended_out2 = (
      "0" + ep.number ).slice(-2);
    return  `
           <div class="episode" id="${ep.id}">
               <h1>${ep.name} S${prepended_out}E${prepended_out2}</h1>
                 <img src="${ep.image}" title ="ep"></img>
                 ${ep.summary}
              </div>`;
    }) .join(''); ;
 } else {
  display.innerText = `Displaying ${opt.length}/${allEpisodes.length} episodes.`
  return rootElem.innerHTML = 
  opt.map((ep)=> {
    prepended_out = (
      "0" + ep.season ).slice(-2);
     prepended_out2 = (
      "0" + ep.number ).slice(-2);
    return  `
    <div class="episode" id="${ep.id}">
        <h1>${ep.name} S${prepended_out}E${prepended_out2}</h1>
        <img src="${ep.image}" title ="ep"></img>
         ${ep.summary} </div> ` 
  })
 }
})
