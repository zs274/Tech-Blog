const addComment = async (event) => {
    event.preventDefault();
  
    var comment = document.querySelector('#comment').innerHTML;
    var id = window.location.href.toString().split('post/')[1];
  
  
      const response = await fetch("/post/" + id, {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          text: comment
        }),
        headers: { 'Content-Type': 'application/json' },
      })
  
      if (response.ok) {
        alert('Comment posted!');
        location.reload();
        return false;
      
      } else {
        alert('Can not post comment');
      }
  };
  
  
  document.querySelector('#submit-comment').addEventListener('click', addComment);