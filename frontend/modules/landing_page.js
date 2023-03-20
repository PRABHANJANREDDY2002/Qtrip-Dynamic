import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  try{
    const urlOb= await fetch(`${config.backendEndpoint}/cities`);
    const x=await urlOb.json();
    return x;



  }catch(err){
    return null;
  }
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  const data=document.getElementById('data');
  
 
  const aIddiv=document.createElement('div');
  aIddiv.setAttribute('class',"col-sm-12 col-md-6 col-lg-3 my-3");
  
aIddiv.innerHTML=`

       
          <a href="pages/adventures/?city=${id}" id="${id}" >
          <div class="tile">
            <img src="${image}" alt="${city}img" class="tile-img"/>
            <div class="tile-text text-center">
              <h6>${city}</h6>
              <p>${description}</p>
              </div>
              </div>
          </a>
          
`
data.append(aIddiv);


  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

}

export { init, fetchCities, addCityToDOM };
