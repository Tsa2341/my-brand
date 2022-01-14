// import { spaceValidator } from "./modules/validators";

const backArrow = document.getElementById('back-arrow');
const titleEl = document.getElementById('title');
const descriptionEl = document.getElementById('description');
const imageEl = document.getElementById('image');
const saveCommentEl = document.getElementById('save-comment');
const textareaEl = document.getElementById('textarea');
const commentWrapperEl = document.getElementById('comment-wrapper');
const generalError = document.getElementById('general-error');

saveCommentEl.disabled = false;
document.body.scrollTop = -1;


const blogs = Object.values(JSON.parse(localStorage.getItem('blogs')));
const currentBlog = localStorage.getItem('current-blog');
let currentBlogIndex = null;

for (let i = 0; i < blogs.length; i++){
    if (blogs[i].title === currentBlog) {

        titleEl.textContent = blogs[i].title;
        descriptionEl.innerHTML = blogs[i].description;
        imageEl.setAttribute('src', blogs[i].image);
        currentBlogIndex = i;

        let comments = blogs[i].comments ? Object.values(blogs[i].comments) : [];

        comments.forEach((comment) => {

            let div = document.createElement('div');
            div.setAttribute('class', "comment");

            const commentNode = `
                    <h4>${comment}</h4>
                `

            div.innerHTML = commentNode;
            commentWrapperEl.append(div)
        })
        break;
    }
}


// add event Listeners

backArrow.addEventListener('click', (e) => {
    window.history.back()
})

saveCommentEl.addEventListener('click', (e) => {
    
    e.preventDefault();
    
    if (textareaEl.value !== "") {
        let newBlogs = [...blogs];
    
        let comments = newBlogs[currentBlogIndex].comments ? Object.values(newBlogs[currentBlogIndex].comments) : [];
        comments = [...comments, textareaEl.value];
        newBlogs[currentBlogIndex].comments = { ...comments };
    
        localStorage.setItem("blogs", JSON.stringify({
            ...newBlogs
        }));
        
        saveCommentEl.disabled = true;
        window.location.reload();
    } else {
        generalError.textContent = "Please enter your comment";
        generalError.classList.add('error');
    }
})




//  remove all event listeners
backArrow.removeEventListener('click', (e) => {
    window.history.back()
})
