

const blogsEl1 = document.querySelector('.blogs1');
const blogsEl2 = document.querySelector('.blogs2');
const blogEls = document.getElementsByClassName('blog')



const blogs = localStorage.getItem('blogs') ? Object.values(JSON.parse(localStorage.getItem('blogs'))) : [];

blogs.map((blog) => {

    const div = document.createElement('div');

    const blogEl = `
                <a href="#" class="blog">
                    <img id="image" src="${blog.image}" alt=" third blog">
                    <h4 id="title">${blog.title}</h4>
                </a>
            `

    div.innerHTML = blogEl;
    blogsEl1.appendChild(div);
    blogsEl2.appendChild(div);
})


//  add event listeners

for (let i = 0; i < blogEls.length; i++) {
    
    blogEls[i].addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('current-blog', blogEls[i].children[1].textContent);
        window.location.assign('../article.html');
    })
}