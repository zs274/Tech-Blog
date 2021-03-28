const createPost = async (event) => {
    event.preventDefault();

    var postname = document.querySelector('#post-title').innerHTML;
    var posttext = document.querySelector('#post-text').innerHTML;
    var postdesc = document.querySelector('#post-desc').innerHTML;

    var html = `${posttext}`

    const response = await fetch("/post/new", {
        method: 'POST',
        body: JSON.stringify({
            name: postname,
            text: html,
            description: postdesc
        }),
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        alert('Created new post!');
        document.location.replace('/dashbaord');
    } else {
        alert('Could not create post');
    }
};

document.querySelector('#create').addEventListener('click', createPost);