

const logoutEl = document.getElementById('logout');
const blogContainer = document.getElementById('blog-container');
const titleEls = document.getElementsByClassName('titleEl')
const editEls = document.getElementsByClassName('edit')
const deleteEls = document.getElementsByClassName('delete')
const addButtonEl = document.getElementById('add-button')


const blogs = localStorage.getItem('blogs') ? Object.values(JSON.parse(localStorage.getItem('blogs'))) : [];

blogs.map((blog) => {

    const div = document.createElement('div');
    div.setAttribute('class', "blog-box")

    const node = (`
            <div>
            <p class="titleEl">${blog.title}</p>
            </div>
            <img src="./public/edit icon.svg" alt="edit icon" class="edit">
            <img src="./public/bin.svg" alt="delete icon" class="delete">
        `
    )

    div.innerHTML = node;
    blogContainer.appendChild(div);
})

//  add all eventlisteners

for (let i = 0; i < titleEls.length; i++) {
    
    titleEls[i].addEventListener('click', (e) => {
        localStorage.setItem('current-blog', titleEls[i].textContent);
        window.location.assign('../article.html');
    })

    editEls[i].addEventListener('click', (e) => {
        
        let blogTitle = e.target.parentElement.firstElementChild.innerText;
        localStorage.setItem('current-blog', blogTitle);
        window.location.assign('../add-update.html');
    })

    deleteEls[i].addEventListener('click', (e) => {
        if (confirm("Do you wish to delete this blog?")) {
            const newBlogs = [...blogs];
            delete newBlogs.splice(i,1);
            localStorage.setItem('blogs', JSON.stringify({ ...newBlogs }));
            window.location.reload();
        }
    })
}

addButtonEl.addEventListener('click', (e) => {
    localStorage.removeItem('current-blog');
    window.location.assign('../add-update.html');
})

logoutEl.addEventListener('click', (e) => {

    let user = JSON.parse(localStorage.getItem('user'));
    user.isLoggedIn = false;


    localStorage.setItem('user', JSON.stringify(user));
})
