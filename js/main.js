// https://github.com/nasa/apod-api
// https://api.nasa.gov/

document.querySelector("button").addEventListener("click", viewImages)

// see if we have stored the user's NASA api key in local storage, if not, prompt them to enter it
if (!localStorage.getItem("apiKey")) {
    const userAPIKey = prompt("enter your NASA API key", "get from api.nasa.gov")
    localStorage.setItem("apiKey", userAPIKey)
}

// get the current date so we can see how many years to get images for
const today = new Date()
console.log(`current date before editing : ${today}`)
const todayYYYY = today.getFullYear()
const todayMM = String(today.getMonth() + 1).padStart(2, '0')
const todayDD = String(today.getDate()).padStart(2, '0')
const todayPretty = `${todayYYYY}-${todayMM}-${todayDD}`
console.log(`current date : ${todayPretty}`)


function viewImages(){
    const inputDate = document.querySelector('input').value

    //console.log(`date entered : ${inputDate} and api key : ${localStorage.getItem("apiKey")}`)
    const birthdayYear = parseInt(inputDate.substring(0,4))
    const birthdayMonth = parseInt(inputDate.substring(5,7))
    const birthdayDay = parseInt(inputDate.substring(8,10))
    console.log(`input birthday ${inputDate} : ${birthdayYear}-${birthdayMonth}-${birthdayDay}`)

    // need to get the image for every year from their birthday to today

    /// first, get the api url for each year in an array

    // // TODO : check to see if birthday has happened yet this year, if not, skip it
    // // TODO : started June 16, 1995 so anything before that will be undefined
    let urls = []
    for ( i = 0; i+birthdayYear <= todayYYYY; i++) {
        //console.log(`loop : ${i}  and current loop year : ${i+birthdayYear}`)
        urls[i] = `https://api.nasa.gov/planetary/apod?api_key=${localStorage.getItem('apiKey')}&date=${i+birthdayYear}-${birthdayMonth}-${birthdayDay}`
    }

    /// now, store the data received from each url into an array
    let yearlyData = []

    urls.forEach((url, i) => {
        let li = document.createElement('li')
        li.id = url
        
        
        document.querySelector('ul').appendChild(li)
        

            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                yearlyData[i] = data

                //const li = document.createElement('li')
                li.textContent = `${data.date} : ${data.title}`

                let img = document.createElement('img')
                img.src = data.url
                img.width = 256
                img.height = 256
                document.getElementById(url).appendChild(img)
                
                //document.querySelector('ul').appendChild(li)

        })

    })

    // check to see if their birthday has happened this year, if not say something like
    // " who know what NASA might on your next birthday in <numberOfDaysUntilNextBirthday> days" 
    
}

