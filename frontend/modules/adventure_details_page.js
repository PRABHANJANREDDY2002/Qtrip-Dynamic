import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search);
  const myArray = search.split("=");
  // Place holder for functionality to work in the Stubs
   return myArray[1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
 
  try {
    const jsoncity = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    const returnadv = await jsoncity.json();
    //console.log(returnadv);
    return returnadv;
  } catch (err) {
    return null;
  }
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  // Place holder for functionality to work in the Stubs
  //return myJson;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  const detaildom=document.createAttribute('div');
  const name=document.getElementById("adventure-name");
  name.innerHTML=`${adventure.name}`;
  const subtitle=document.getElementById("adventure-subtitle");
  subtitle.innerHTML=`${adventure.subtitle}`;
  let div3=document.getElementById("photo-gallery");
  for(let i=0;i<adventure.images.length;++i) {
    let imgOb=document.createElement("img");
    imgOb.setAttribute("class","activity-card-image");
    imgOb.src=adventure.images[i];
    div3.append(imgOb);
  }
  const content=document.getElementById("adventure-content");
  content.innerHTML=`${adventure.content}`
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photo=document.getElementById('photo-gallery');
  photo.innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  `;
  let indicators=document.getElementById("carouselExampleIndicators");
  let inner=document.createElement("div");
  inner.setAttribute('class','carousel-inner');
  for(let i=0;i<images.length;++i){
    if(i==0){
      let active=document.createElement('div');
      active.setAttribute('class','carousel-item active')
      active.innerHTML=`
        <img src="${images[i]}" class="activity-card-image" >   
      ` 
      inner.append(active);
    }else{
      let active1=document.createElement('div');
      active1.setAttribute('class','carousel-item')
      active1.innerHTML=`
        <img src="${images[i]}" class="activity-card-image" >   
      ` 
      inner.append(active1);
    }
    indicators.append(inner);
  }

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure);
   if(adventure.available){
    let soldout=document.getElementById("reservation-panel-sold-out");
    soldout.style.display="none"
    let form=document.getElementById("reservation-panel-available");
    form.style.display="block"
    let cost=document.getElementById("reservation-person-cost");
    cost.innerHTML=adventure.costPerHead;

   }else{
    let soldout=document.getElementById("reservation-panel-sold-out");
    soldout.style.display="block"
    let form=document.getElementById("reservation-panel-available");
    form.style.display="none"

   }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  console.log(persons);
  console.log(adventure);
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
//console.log(adventure.costPerHead*persons);
let total=document.getElementById('reservation-cost');
total.innerHTML=adventure.costPerHead*persons
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS  // 1. Capture the query details and make a POST API call using fetch() to make the reservation  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".  console.log(adventure);
  console.log(config.backendEndpoint);
  document.getElementById("myForm").addEventListener("submit",FormData);
  function FormData(event) {
    event.preventDefault();
    let n=document.getElementById("myForm").elements["name"].value;
    let d=document.getElementById("myForm").elements["date"].value;
    let p=document.getElementById("myForm").elements["person"].value;
    const data = {
      name: n,
      date: d,
      person: p,
      adventure:adventure.id    };
    const calll = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(`${config.backendEndpoint}/reservations/new`,calll)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
        }
        alert("Success!");
        }).catch(e => {
        alert("Failure");
        });
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if(adventure.reserved){
  document.getElementById('reserved-banner').style.display='block';
}else{
  document.getElementById('reserved-banner').style.display='none';
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
