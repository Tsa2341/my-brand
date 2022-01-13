

const logoutEl = document.getElementById('logout');

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