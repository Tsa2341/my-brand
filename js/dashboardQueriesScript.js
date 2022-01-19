

const logoutEl = document.getElementById('logout');
const bodyEl = document.querySelector('.body');

// get questions and append them to the DOM

let users = localStorage.getItem('queries') ? JSON.parse(localStorage.getItem('queries')) : null;


if (users !== null) {

    Object.values(users).map((user) => {
        
        let queryContainerEl = document.createElement('div');
        let queryNameEl = document.createElement('h1');
        let queryEmailEl = document.createElement('h2');
        let queryDescriptionEl = document.createElement('div');
        let queryDate = document.createElement('p');
        let queryLocation = document.createElement('p');

        queryContainerEl.setAttribute('class', 'query-container');
        queryDate.setAttribute('class', 'query-date');
        queryNameEl.setAttribute('class', 'query-name');
        queryEmailEl.setAttribute('class', 'query-email');
        queryDescriptionEl.setAttribute('class', 'query-description');
        queryLocation.setAttribute('class', 'query-location');


        queryNameEl.textContent = user.name;
        queryEmailEl.textContent = user.email;
        queryDescriptionEl.textContent = user.description;
        queryDate.textContent = user.date;
        queryLocation.textContent = user.location;

        queryContainerEl.appendChild(queryDate);
        queryContainerEl.appendChild(queryNameEl);
        queryContainerEl.appendChild(queryEmailEl);
        queryContainerEl.appendChild(queryDescriptionEl);
        queryContainerEl.appendChild(queryLocation);

        bodyEl.appendChild(queryContainerEl)
    })
}

// add event listeners

logoutEl.addEventListener('click', (e) => {

    let user = JSON.parse(localStorage.getItem('user'));
    user.isLoggedIn = false;

    localStorage.setItem('user', JSON.stringify(user));
})

