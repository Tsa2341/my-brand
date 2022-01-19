
window.onload = () => {

    const postEl = document.getElementById('post');
    const titleEl = document.getElementById('title');
    const imageEl = document.getElementById('image');
    const imageError = document.getElementById('image-error')
    const descriptionError = document.getElementById('description-error')
    const titleError = document.getElementById('title-error')
    const successEl = document.getElementById('general-success')
    const fileButton = document.getElementById('file');
    const imagePreview = document.getElementById('image-preview');
    const descriptionEl = document.getElementById('textarea');
    const backArrowEl = document.getElementById('back-arrow');

    

    //    if it is updating blog pass the previous data into their fields
    

    const blogs = localStorage.getItem('blogs') ? Object.values(JSON.parse(localStorage.getItem('blogs'))) : [];
    let customButtonFile = null;  /// checkes if their is an incoming image
    var currentBlogIndex = undefined;  /// store the index of the current blog we are updating if any
    const currentBlog = localStorage.getItem('current-blog');




    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].title === currentBlog) {
            titleEl.value = blogs[i].title;
            descriptionEl.value = blogs[i].description;
            imagePreview.setAttribute('src', blogs[i].image);
            customButtonFile = blogs[i].image;
            currentBlogIndex = i;
        }
        // else {
        //     newBlogs.push(blogs[i]);
        // }
    }



    // some helper functions


    const isImageValid = (img) => {

        if (img && img.name) {
            let fileExt = img.name.split('.');
            let fileFormat = fileExt[fileExt.length - 1].toLowerCase();
    
            if ((fileFormat === 'jpg') || (fileFormat === 'gif') || (fileFormat === 'png') || (fileFormat === 'jpeg')) {
                return true;
            } else {
                return `${fileFormat} is not an image`;
            }
        } else {
            if (customButtonFile) {
                return true
            } else {
                return ` image required`;
            }
        }
    }


    const getImageUrl = () => {

        return new Promise((resolve, reject) => {
            let reader = new FileReader();
        
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
        
            reader.readAsDataURL(fileButton.files[0]);
        })
    }

    const postValidator = () => {
        (imagePreview.src === window.location.href) ?
            (
                imageError.classList.add('error'),
                imageError.textContent = "Image is required",
                postEl.style.border = "1px solid red"
            ) :
            (isImageValid(fileButton.files[0]) === true) ?
                (
                    imageError.classList.remove('error'),
                    imageError.textContent = "",
                    postEl.style.border = "none"
                ) :
                (
                    imageError.classList.add('error'),
                    imageError.textContent = isImageValid(fileButton.files[0]),
                    postEl.style.border = "1px solid red"
                )
            ;
                
        (descriptionEl.value === '') ?
            (
                descriptionError.classList.add('error'),
                descriptionError.textContent = "Description is required",
                postEl.style.border = "1px solid red"
            ) :
            (
                descriptionError.classList.remove('error'),
                descriptionError.textContent = "",
                postEl.style.border = "none"
            );
                    
        (titleEl.value === '') ?
            (
                titleError.classList.add('error'),
                titleError.textContent = "Title is required",
                postEl.style.border = "1px solid red"
            ) :
            (
                titleError.classList.remove('error'),
                titleError.textContent = "",
                postEl.style.border = "none"
            );
    }


    const postBlog = () => {

        const prevBlogs = localStorage.getItem('blogs') ? Object.values(JSON.parse(localStorage.getItem('blogs'))) : [];



        //  check if the tittle specified already exists
        for (let i = 0; i < prevBlogs.length; i++) {
            if (prevBlogs[i].title !== currentBlog && prevBlogs[i].title === titleEl.value.trim()) {
                titleError.classList.add('error'),
                    titleError.textContent = ` Blog title exist, \n Please Enter another title`
                postEl.style.border = "1px solid red"
                return;
            }
        }

        if (currentBlog) {
            const updatedBlog = prevBlogs[currentBlogIndex];

            updatedBlog.title = titleEl.value;
            updatedBlog.description = descriptionEl.value;
            updatedBlog.image = imagePreview.src;

            localStorage.setItem('blogs', JSON.stringify({ ...prevBlogs }))
            // localStorage.setItem('blogs', JSON.stringify({
            //         ...[
            //             ...newBlogs,
            //             { title : titleEl.value , description : descriptionEl.value, image : imagePreview.src }
            //         ]
            //     }))
        } else {
            localStorage.setItem('blogs', JSON.stringify({
                ...[
                    ...prevBlogs,
                    { title: titleEl.value, description: descriptionEl.value, image: imagePreview.src }
                ]
            }))
        }

        

        successEl.textContent = 'Saved blog successfully';
        successEl.classList.add('success');
        postEl.disabled = true;
        postEl.style.border = "none"

        setTimeout(() => {
            successEl.textContent = '';
            successEl.classList.remove('success');
            postEl.disabled = false;
            if (confirm("Do you wish to be redirected to dashboard")) {
                history.back();
            }

        }, 1000);
    }


    //  add event listeners


    fileButton.addEventListener('change', () => {
        getImageUrl()
            .then((data) => {
            imagePreview.setAttribute('src', data);
            postValidator();
        }).catch((data) => {
            console.log(error);
            postValidator();
        });
    })

    postEl.addEventListener('click', (e) => {
        postValidator()
        if (titleError.textContent === '' && descriptionError.textContent === "" && imageError.textContent === "") {
            postBlog();
        }
    })

    backArrowEl.addEventListener('click', (e) => {
        window.history.back();
    })

}


