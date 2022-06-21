const waterBottle = document.querySelector('#water-bottle')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/water`

const waterCallback = ({ data: water }) => displayWater(water)
const errCallback = err => console.log(err.response.data)

const getAllWater = () => axios.get(baseURL).then(waterCallback).catch(errCallback)
// const getAllWater = () => {
//     res.sendFile(path.join(__dirname, '../index.html'))
// }
const createWater = body => axios.post(baseURL, body).then(waterCallback).catch(errCallback)
const deleteWater = id => axios.delete(`${baseURL}/${id}`).then(waterCallback).catch(errCallback)
const updateWater = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(waterCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createWater(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createWaterCard(water) {
    const waterCard = document.createElement('div')
    waterCard.classList.add('water-card')

    waterCard.innerHTML = `<img alt='water cover' src=${water.imageURL} class="water-cover"/>
    <p class="water-title">${water.title}</p>
    <div class="btns-container">
        <button onclick="updateWater(${water.id}, 'minus')">-</button>
        <p class="water-rating">${water.rating} stars</p>
        <button onclick="updateWater(${water.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteWater(${water.id})">delete</button>
    `


    waterBottle.appendChild(waterCard)
}

function displayWater(arr) {
    console.log(arr)
    waterBottle.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createWaterCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllWater()