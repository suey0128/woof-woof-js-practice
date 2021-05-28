document.addEventListener('DOMContentLoaded', () => {
  getDogs().then(data => data.forEach(putDogBarUp))
  .catch(error => console.error('Error: ', error))
})



//fetch data from server
function getDogs () {
  return fetch('http://localhost:3000/pups')
  .then(res =>res.json())
  
}

function patchDogs(dog) {
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  })
  // .catch((error) => console.error("Error: ", error));
}

//put the dog bar up
function putDogBarUp (dog) {
  // console.log(dog);
  //create element 
  let dogOnBar = document.createElement('span');

  //fill in the content
  dogOnBar.textContent = dog.name

  //append element to the DOM
  document.querySelector('#dog-bar').append(dogOnBar)

  //addEventListener to the names
  dogOnBar.addEventListener('click',() => {dogInfo(dog)})
}

function dogInfo (dog) {
  //empty the div
  document.querySelector('#dog-info').innerHTML = '';

    //create elements
    let image = document.createElement('img');
    let name = document.createElement('h2');
    let goodBadStatus = document.createElement('button');

    //fill in the content
    image.src = dog.image;
    name.textContent = dog.name;
    if (dog.isGoodDog === true) { 
      goodBadStatus.textContent = "GOOD DOG!";
    } else {
      goodBadStatus.textContent = "BAD DOG!";
    }

    //append the element to the DOM
    document.querySelector('#dog-info').append(image,name,goodBadStatus);

    //add is good dog event listener
    goodBadStatus.addEventListener('click',() => {goodBadDog(dog,goodBadStatus)});
}


function goodBadDog (dog,goodBadStatus) {
  if (goodBadStatus.textContent === "GOOD DOG!") {
    goodBadStatus.textContent = "BAD DOG!";
    dog.isGoodDog = false;
    // console.log(dog.isGoodDog);
  } else {
    goodBadStatus.textContent = dog.isGoodDog = "GOOD DOG!"
    dog.isGoodDog = true;
  }
  patchDogs(dog);
}


// grab the element 
const filterBtn = document.querySelector('#good-dog-filter');
//add event listener 
filterBtn.addEventListener('click', (e)=> {
  // empty the HTML everytime the event occur
  document.querySelector('#dog-bar').innerHTML = '';
  if (e.target.textContent === 'Filter good dogs: OFF') {
    e.target.textContent = 'Filter good dogs: ON';
    //filter on, iterate very dog, fliter, 
    getDogs().then(data => data.filter(dog => dog.isGoodDog).forEach(putDogBarUp)) 
  } else {
    e.target.textContent = 'Filter good dogs: OFF';
    getDogs().then(data => data.forEach(putDogBarUp))
  }
})




