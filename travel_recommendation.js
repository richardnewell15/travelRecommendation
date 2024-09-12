const myRequest = new Request("./travel_recommendation_api.json");
const destinationsDiv = document.getElementById('destinations_list');
const search_button = document.getElementById('search_button');
const clear_button = document.getElementById('clear_button');

async function getDestinations() {
  let search_term = document.getElementById('search_input').value;
  fetch(myRequest)
  .then((response) => response.json())
  .then((data) => {
    var destinations = [];
    destinationsDiv.innerHTML = '';
    if (search_term.toLowerCase() == 'countries' || search_term.toLowerCase() == 'country') {
      destinations = data['countries'];
    } else if (search_term.toLowerCase() == 'beach' || search_term.toLowerCase() == 'beaches') {
      destinations = data['beaches'];
    } else if (search_term.toLowerCase() == 'temple' || search_term.toLowerCase() == 'temples') {
      destinations = data['temples'];
    }

    if (search_term.toLowerCase() == 'countries' || search_term.toLowerCase() == 'country') {
      destinations.forEach((country) =>  {
        country.cities.forEach((city) => {
          console.log(city);
          var destinationDiv = document.createElement("div");
          destinationDiv.classList.add("py-2","mx-auto");

          var img = document.createElement("img");
          img.style.width = '100%';
          img.src = city.imageUrl;
          destinationDiv.appendChild(img);
          
          var textDiv = document.createElement("div");
          textDiv.classList.add("row","bg-white","mx-auto","px-4","py-2");
          textDiv.innerHTML = `<div class="row col-sm-12 text-start"><strong>${city.name}</strong></div><div class="row px-4 py-2 text-start">${city.description}</div><div class="text-start px-2 py-2"><button class="btn btn-success px-4">Visit</button></div>`;
          destinationDiv.appendChild(textDiv);
          destinationsDiv.appendChild(destinationDiv);
        });
      });
    } else {
      for (var destination of destinations) {
        var destinationDiv = document.createElement("div");
        destinationDiv.classList.add("py-2","mx-auto");

        var img = document.createElement("img");
        img.style.width = '100%';
        img.src = destination.imageUrl;
        destinationDiv.appendChild(img);
        
        var textDiv = document.createElement("div");
        textDiv.classList.add("row","bg-white","mx-auto","px-4","py-2");
        textDiv.innerHTML = `<div class="row col-sm-12 text-start"><strong>${destination.name}</strong></div><div class="row px-4 py-2">${destination.description}</div><div class="text-start px-2 py-2"><button class="btn btn-success px-4">Visit</button></div>`;
        destinationDiv.appendChild(textDiv);
        destinationsDiv.appendChild(destinationDiv);
      }
    }
  })
  .catch(console.error);
}

async function clearDestinations() {
  document.getElementById('search_input').value='';
  destinationsDiv.innerHTML = '';
}

search_button.addEventListener('click', getDestinations);
clear_button.addEventListener('click', clearDestinations);