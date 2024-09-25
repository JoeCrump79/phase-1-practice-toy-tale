let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const formElement = document.getElementsByClassName('add-toy-form')[0]
  formElement.addEventListener('submit', function (data) {
    data.preventDefault()

    const form = new FormData(formElement)
    const name = form.get('name')
    const img = form.get('image')

    const toy = {
      name: name,
      image: img,
      likes: 0

    }
    const configurationObject = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify(toy),
    };
    fetch('http://localhost:3000/toys', configurationObject)
      .then(function (response) {
        return response.json();
      })
      .then(function (toy) {
        const toyCards = document.getElementById('toy-collection')
        const toyDiv = document.createElement('div')
        toyDiv.className = 'card'
        toyCards.append(toyDiv)

        const toyName = document.createElement('h2')
        toyName.textContent = toy.name
        toyDiv.append(toyName)

        const img = document.createElement('img')
        img.src = toy.image
        img.className = 'toy-avatar'
        toyDiv.append(img)

        const toyLikes = document.createElement('p')
        toyLikes.textContent = `${toy.likes} Likes`
        toyDiv.append(toyLikes)

        const likeButton = document.createElement('button')
        likeButton.className = 'like-btn'
        likeButton.id = toy.id
        likeButton.textContent = 'Like ❤️'
        toyDiv.append(likeButton)
      })
  });

  fetch('http://localhost:3000/toys')
    .then(function (response) {
      console.log(response);

      return response.json();
    })

    .then(function (data) {
      const toyCards = document.getElementById('toy-collection')

      data.forEach(function (toy) {
        const toyDiv = document.createElement('div')
        toyDiv.className = 'card'
        toyCards.append(toyDiv)

        const toyName = document.createElement('h2')
        toyName.textContent = toy.name
        toyDiv.append(toyName)

        const img = document.createElement('img')
        img.src = toy.image
        img.className = 'toy-avatar'
        toyDiv.append(img)

        const toyLikes = document.createElement('p')
        toyLikes.textContent = `${toy.likes} Likes`
        toyDiv.append(toyLikes)

        const likeButton = document.createElement('button')
        likeButton.className = 'like-btn'
        likeButton.id = toy.id
        likeButton.textContent = 'Like ❤️'
        toyDiv.append(likeButton)
      })

    })
})