const updatePost = async (event) => {
    event.preventDefault();
  
    var id = window.location.href.toString().split('edit/')[1];
  
    var postname = document.querySelector('#title').innerHTML;
    var postdesc = document.querySelector('#desc').innerHTML;
    var posttext = document.querySelector('#post-text').innerHTML;
  
      const response = await fetch("/post/edit/" + id, {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          name: postname,
          content: posttext,
          description: postdesc,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
  
      //adds to db.json
      if (response.ok) {
        alert('Updated successfully!');
        document.location.replace('/dashboard');
      
      } else {
        alert('Could not update post');
      }
  };
  
  
  document.querySelector('#update').addEventListener('click', updatePost);