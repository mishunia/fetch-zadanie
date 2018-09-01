const dropdown = document.querySelector('.js-select')
const result = document.querySelector('.js-result')
const bodyEl = document.querySelector('body')

const endPointBreed = 'https://dog.ceo/api/breeds/list'
const dogsArray = []

// clean image
const cleanImg = () => {
  result.innerHTML = ''
}

// removing disable from elem
const enableItem = (elem) => {
  elem.removeAttribute('disabled')
}

// select option from select
const selectItem = (elem) => {
  elem.addEventListener('change', function() {
    
    // clean img
    cleanImg()

    bodyEl.classList.add('loading')

    const breedName = this.value

    if (breedName) {
      const endPointImg = `https://dog.ceo/api/breed/${breedName}/images/random`

      fetch(endPointImg)
        .then(response => response.json())
        .then(response => {
          let breedImg = response.message
          result.innerHTML += `
            <img class="img lol" 
                 src="${response.message}" 
                 alt="${breedName}">
            </img>
          `
        }) 
        .then(setTimeout(function() {
          bodyEl.classList.remove('loading')
        }, 200))
    }
  })
}

fetch(endPointBreed)
  .then(response => response.json())
  .then(response => {
    response.message.forEach(breed => {
      dropdown.innerHTML += `
        <option>
          ${breed}
        </option>
      `
    })
  })
  .then(enableItem(dropdown))
  .then(selectItem(dropdown))
