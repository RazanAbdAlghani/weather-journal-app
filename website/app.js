// Personal API Key for OpenWeatherMap API
const apiKey = 'e947b639124ec872732af1332830f2bd&units=imperial';
const url = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', newEvent);

/* Function called by event listener */
function newEvent() {
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    const date = new Date().toLocaleDateString();

    getWeatherData(zipCode)
        .then(data => {
            postData('/add', {
                temperature: data.main.temp,
                date: date,
                userResponse: userResponse
            });
        })
        .then(() => {
            retrieveData();
        });
}

/* Function to GET Web API Data */
const getWeatherData = async (zipCode) => {
    const response = await fetch(`${url}${zipCode}&appid=${apiKey}`);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error:', error);
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('Error:', error);
    }
};

/* Function to GET Project Data */
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        const data = await request.json();
        document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}°C`;
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('content').innerHTML = `You said: ${data.userResponse}`;
    } catch (error) {
        console.log('Error:', error);
    }
};