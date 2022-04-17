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
    // clear anything that might already be present
    document.querySelector('ul').innerHTML=''

    const inputDate = document.querySelector('input').value
    const birthdayYear = parseInt(inputDate.substring(0,4))
    const birthdayMonth = parseInt(inputDate.substring(5,7))
    const birthdayDay = parseInt(inputDate.substring(8,10))

    // need to get the image for every year from their birthday to today

    /// first, get the api url for each year in an array
    let urls = []
    for ( i = 0; i+birthdayYear <= todayYYYY; i++) {
        let shouldAddRequest = true

        if ( new Date(i+birthdayYear,birthdayMonth-1,birthdayDay).getTime() < new Date(1995,05,16).getTime()) {
            console.log("the target date is before June 16,1995, before when NASA started uploading images")
            shouldAddRequest = false
        }else if ( new Date(i+birthdayYear,birthdayMonth-1,birthdayDay).getTime() > new Date(todayPretty).getTime()) {
            console.log("the input date is after today's date")
            shouldAddRequest = false
        }
    
        if ( shouldAddRequest ) {
            urls[i] = `https://api.nasa.gov/planetary/apod?api_key=${localStorage.getItem('apiKey')}&date=${i+birthdayYear}-${birthdayMonth}-${birthdayDay}`
        }
        
    }

    /// make each api call and append data to the DOM
    urls.forEach((url, i) => {
        let li = document.createElement('li')
        li.id = url
        
        document.querySelector('ul').appendChild(li)

            fetch(url)
            .then(response => response.json())
            .then(data => {
                li.textContent = `${data.date} : ${data.title}`

                let img = document.createElement('img')
                // TODO : set image size in css
                img.src = data.url
                img.width = 256
                img.height = 256
                document.getElementById(url).appendChild(img)
        })

    })

}

