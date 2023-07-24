//global variables
const titleValue = document.querySelector("#name")
const des = document.querySelector("#textarea")
const post = document.querySelector("#card")
const addP = document.querySelector(".add-post")
const button = document.querySelector(".btn")
//fonction du rendu
function render(a) {
  for (let i = 0; i < a.length; i++) {
    post.innerHTML += ` <div class="card my-5 mx-auto w-100 bg-transparent text-white border border-warning" style="width: 18rem;">
          <div class="card-body" data-id=${a[i].id}>
            <h5 class="card-title text-warning text-uppercase">${a[i].title}</h5>
            <p class="card-text">${a[i].body}</p>
            <a href="#" class="card-link text-decoration-none text-success" id="edit">edit</a>
            <a href="#" class="card-link text-decoration-none text-danger" id="delete">delete</a>
          </div>
        </div>`
  }
}
const url = 'http://localhost:3000/Produits'
//method : GET
fetch(url)
  .then(res => res.json())
  .then(data => render(data));
//
//Event for edit and delete
post.addEventListener('click', () => {
  let edit = event.target.id == "edit"
  let delet = event.target.id == "delete"

  let id = event.target.parentElement.dataset.id

  //method : DELETE
  if (delet) {
    fetch(`${url}/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => location.reload())
  }

  //

  //method : UPDATE
  if (edit) {
    let parent = event.target.parentElement;
    let titlel = parent.querySelector('.card-title').innerText
    let bodyl = parent.querySelector('.card-text').innerText
    titleValue.value = titlel
    des.value = bodyl

  }

  button.addEventListener("click", (e) => {
    e.preventDefault()
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        title: titleValue.value,
        body: des.value,

      })
    })
      .then(res => res.json())
      .then(() => location.reload())
  })
})
//
//POST

addP.addEventListener('submit', (e) => {

  e.preventDefault()

  console.log("fqvf")

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      title: titleValue.value,
      body: des.value,

    })

  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const postArr = [];
      postArr.push(data)
      console.log(postArr)
      console.log(data)
      render(postArr)
    }).catch(err => console.log("erreur: " + err))


})
  //
