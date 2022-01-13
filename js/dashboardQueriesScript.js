

const logoutEl = document.getElementById('logout');
const bodyEl = document.querySelector('.body');

// get questions and append them to the DOM

let users = localStorage.getItem('queries') ? JSON.parse(localStorage.getItem('queries')) : null;


if (users !== null) {

    Object.values(users).map((user) => {
        
        console.log(user);

        let queryContainerEl = document.createElement('div');
        let queryNameEl = document.createElement('h1');
        let queryEmailEl = document.createElement('h2');
        let queryDescriptionEl = document.createElement('div');

        queryContainerEl.setAttribute('class', 'query-container');
        queryNameEl.setAttribute('class', 'query-name');
        queryEmailEl.setAttribute('class', 'query-email');
        queryDescriptionEl.setAttribute('class', 'query-description');

        queryNameEl.textContent = user.name;
        queryEmailEl.textContent = user.email;
        queryDescriptionEl.textContent = user.description;

        queryContainerEl.appendChild(queryNameEl);
        queryContainerEl.appendChild(queryEmailEl);
        queryContainerEl.appendChild(queryDescriptionEl);

        bodyEl.appendChild(queryContainerEl)
    })
}

// add event listeners

logoutEl.addEventListener('click', (e) => {

    let user = JSON.parse(localStorage.getItem('user'));
    user.isLoggedIn = false;

    console.log(user);

    localStorage.setItem('user', JSON.stringify(user));
})

//  removes all eventlistener

window.onbeforeunload = () => {
    logoutEl.removeEventListener('click', (e) => {

        let user = JSON.parse(localStorage.getItem('user'));
        user.isLoggedIn = false;
    
        console.log(user);
    
        localStorage.setItem('user', JSON.stringify(user));
    })
}

