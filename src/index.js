//fetch data from server
function getDogs(cbfn) {
    fetch("http://localhost:3000/pups")
    .then((res) => res.json())
    .then((data) => data.forEach(cbfn))
    // .then(data => console.log(data))
    .catch((error) => console.error("Error: ", error));
}

//patch data
function patchDogs(dog) {
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  }).catch((error) => console.error("Error: ", error));
}

function putDogBarUp(dog) {
  //create span for dog names
  let span = document.createElement("span");
  let img = document.createElement("img");
  let h2 = document.createElement("h3");
  let button = document.createElement("button");

  //add attrubutes
  span.className = "dogBar";
  img.style.display = "none";
  h2.style.display = "none";
  button.style.display = "none";

  //fill in text content
  span.textContent = dog.name;
  img.src = dog.image;
  h2.textContent = dog.name;
  //set button textContent
  function buttonTextContent() {
    if (dog.isGoodDog === true) {
      button.textContent = "Good Dog!";
    } else {
      button.textContent = "Bad Dog!";
    }
  }
  buttonTextContent();

  //append the elememt to HTML
  document.querySelector("#dog-bar").appendChild(span);
  document.querySelector("#dog-info").append(img, h2, button);

  // addEvenListenter to show dog info
  let div = document.querySelectorAll(".dogBar");
  for (sublist of div) {
    sublist.addEventListener("click", (e) => {
      console.log(e.target.textContent);
      if (e.target.textContent === dog.name) {
        console.log("firstif");
        img.style.display = "";
        h2.style.display = "";
        button.style.display = "";
      } else {
        console.log("firstelse");
        img.style.display = "none";
        h2.style.display = "none";
        button.style.display = "none";
      }
    });
  }




  // span.addEventListener('click', e => {
  //     let div = document.querySelectorAll('.dogBar');
  //     for (sublist of div) {
  //         if (dog.name === e.target.textContent) {
  //             console.log('if')
  //             img.style.display = '';
  //             h2.style.display = '';
  //             button.style.display = '';
  //         } else {
  //             console.log('else')
  //             img.style.display = 'none';
  //             h2.style.display = 'none';
  //             button.style.display = 'none';
  //         }
  //     }
  // })

  //addEvenListenter to change good bad dog
  button.addEventListener("click", (e) => {
    if (button.textContent === "Good Dog!") {
      button.textContent = "Bad Dog!";
      dog.isGoodDog = false;
    } else {
      button.textContent = "Good Dog!";
      dog.isGoodDog = true;
    }
    patchDogs(dog);
  });

  let dogFilter = document.querySelector("#good-dog-filter");
  dogFilter.addEventListener("click", (e) => {
    if (dogFilter.textContent === "Filter good dogs: OFF") {
      dogFilter.textContent = "Filter good dogs: ON";
      if (dog.isGoodDog === false) {
        span.style.display = "none";
      } else {
        span.style.display = "";
      }
    } else {
      dogFilter.textContent = "Filter good dogs: OFF";
      span.style.display = "";
    }
  });
}

//   // addEvenListenter to show dog info
//   function showInfo () {
//   let div = document.querySelectorAll('.dogBar');
//   for (sublist of div) {
//       sublist.addEventListener('click', e => {
//           console.log(e.target.textContent);
//           if ( e.target.textContent === dog.name) {
//                   console.log('firstif');
//                   img.style.display = '';
//                   h2.style.display = '';
//                   button.style.display = '';
//           } else {
//               console.log('firstelse')
//               img.style.display = 'none';
//               h2.style.display = 'none';
//               button.style.display = 'none';
//           }
//       })
//   }
// }
// getDogs(showInfo);

getDogs(putDogBarUp);
