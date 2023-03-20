import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  return search.slice(6, search.length);
  //console.log(search.slice(6, search.length));

  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try {
    const jsoncity = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    const returnadv = await jsoncity.json();
    //console.log(returnadv);
    return returnadv;
  } catch (err) {
    return null;
  }

  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
// function addAdventureToDOM(adventures) {
//   const dataOb = document.getElementById("data");

//   adventures.forEach((x) => {
//     const divob = document.createElement("div");
//     divob.setAttribute("class", "col-sm-6 col-md-6 col-lg-3 mb-3");
//     divob.innerHTML = `
//     <a href="detail/?adventure=${x.id}" id=${x.id}>
//       <div class="card activity-card">
//          <div class="category-banner">${x.category}</div>

//            <img src=${x.image} alt=${x.name} >
//                <div class="d-flex justify-content-between w-100 p-3 pb-0">
    
//                       <p class="card-title">${x.name}</p>
//                        <p class="card-text">₹${x.costPerHead}</div>
//                 </div> 
//                 <div class="d-flex justify-content-between w-100 p-3 pt-2">
    
//                      <p class="card-title">Duration</p>
//                       <p class="card-text">${x.duration}</div>
//                  </div> 
    

           
    
//   </div>
//   </a>
    
//     `;
//     dataOb.append(divob);
//   });

//   // TODO: MODULE_ADVENTURES
//   // 1. Populate the Adventure Cards and insert those details into the DOM
// }
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let divM=document.getElementById("data");
  for(let i=0;i<adventures.length;++i)
  {
    let c=adventures[i]
    let divOb=document.createElement("div");
    divOb.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-3");
    divOb.innerHTML=`
      <a href="detail/?adventure=${c.id}" id=${c.id}>    
          <div class="card activity-card">     
               <div class="category-banner">${c.category}</div> 
                        <img src=${c.image} alt=${c.name}>  
                                <div class="d-flex justify-content-between w-100 p-3 pb-0"> 
                                           <p class="card-title">${c.name}</p>
                                           <p class="card-text">₹${c.costPerHead}</p> 
                                        </div>
                                      <div class="d-flex justify-content-between w-100 p-3 pt-2">
                                                  <p class="card-title">Duration</p> 
                                                  <p class="card-text">${c.duration} Hours</p>
                                      </div>   
                      </div> 
                         </a> 
                              `;
    divM.append(divOb);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  const rearrayd=[];
  for(let i=0;i<list.length;++i){
    if(list[i].duration<=high && list[i].duration>=low ){
      rearrayd.push(list[i]);
    }

  }
  return rearrayd;
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  const rearray=[];
  for(let i=0;i<list.length;++i){
    for(let j=0;j<categoryList.length;++j){
      if(categoryList[j]==list[i].category){
        rearray.push(list[i]);
      }
  }
}
return rearray;

  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.duration!=""){
    const myArray = filters.duration.split("-");
    list = filterByDuration(list,myArray[0],myArray[1]);
  }
  if(filters.category.length>0){
    
    list= filterByCategory(list,filters.category);
 
  }
  return list;

  // for(let i=0;i<list.length;++i){
  //   if(list[i].duration)

  // }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let loc=JSON.parse(window.localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return loc;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  const categorylist=document.getElementById('category-list');
  console.log(categorylist);
  console.log(filters);
  for(let i=0;i<filters.category.length;++i){
  let categoryfilter=document.createElement('div');
  categoryfilter.setAttribute('class','category-filter');
  categoryfilter.innerHTML=`
  <p>${filters.category[i]}</p>
  
  `
  console.log(categorylist);
  categorylist.append(categoryfilter);
  }
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
