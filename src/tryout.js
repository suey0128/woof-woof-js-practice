//fetch data from server 
function getDogs (cbfn) {
    return fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data =>  cbfn(data))
    // .then(data => console.log(data))
    .catch(error => console.error('Error: ',error))
}

//patch data 
function patchDogs (dog) {
    return fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(dog)
    })
    .catch(error => console.error('Error: ',error))
}


//addEvenListenter to change good bad dog
function goodBadDog(e) {
    console.log(e.target);
    if (e.target.textContent === 'Good Dog!') {
        e.target.textContent = 'Bad Dog!';
        dog.isGoodDog = false;
    } else {
        e.target.textContent = 'Good Dog!';
        dog.isGoodDog = true;
    }
    patchDogs(dog);
}


function putDogBarUp (data) {
    data.forEach(dog => {
    //create span for dog names
    let span = document.createElement('span');
    let img =  document.createElement('img');
    let h2 = document.createElement('h3');
    let button = document.createElement('button');   

    //add attrubutes 
    span.className = 'dogBar';
    img.style.display = 'none';
    h2.style.display = 'none';
    button.style.display = 'none';

    //fill in text content
    span.textContent = dog.name;
    img.src = dog.image;
    h2.textContent = dog.name;
        //set button textContent
        function buttonTextContent () {
            if (dog.isGoodDog === true) {
                button.textContent = 'Good Dog!'
            } else {
                button.textContent = 'Bad Dog!'
            }
        }
    buttonTextContent();


    //append the elememt to HTML
    document.querySelector('#dog-bar').appendChild(span);
    document.querySelector('#dog-info').append(img, h2, button);


    // addEvenListenter to show dog info
    let div = document.querySelectorAll('.dogBar');
    for (sublist of div) {
        sublist.addEventListener('click', e => {
            console.log(e.target.textContent);
            if ( e.target.textContent === dog.name) {
                    console.log('firstif'); 
                    img.style.display = '';
                    h2.style.display = '';
                    button.style.display = ''; 
            } else {
                console.log('firstelse')
                img.style.display = 'none';
                h2.style.display = 'none';
                button.style.display = 'none';
            }   
        })
    }


    // span.addEventListener('click', e => showInfo());

    button.addEventListener('click', (e) => goodBadDog(e));


    let dogFilter = document.querySelector('#good-dog-filter');
    dogFilter.addEventListener('click', e => {

            if (dogFilter.textContent === 'Filter good dogs: OFF') {
                dogFilter.textContent = 'Filter good dogs: ON';
                if (dog.isGoodDog === false) {
                    span.style.display = 'none'}
                else {
                    span.style.display = ''
                }
            } else {
                dogFilter.textContent = 'Filter good dogs: OFF';
                span.style.display = '';
            }

}) 
    })
}







// addEvenListenter to show dog info
function showInfo (dog) {

}


// getDogs(showInfo);
getDogs(putDogBarUp);