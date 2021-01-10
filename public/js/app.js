const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault();
    const location = search.value;

    messageOne.textContent = '';
    messageTwo.textContent = '';
    messageThree.textContent = '';

    const url = '/weather?address=' + encodeURI(location);

    
    fetch(url).then((response) => {
    
            response.json().then((data) => {
                if (data.error) {
                    messageTwo.textContent = data.error;
                } else {
                    messageOne.textContent = data.report;
                    messageThree.textContent = data.location.country + ': ' + data.location.region + ': ' + data.location.name;
                }
        });
    });
});

