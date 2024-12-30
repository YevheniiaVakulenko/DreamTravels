let travelData = null;

function fetchData() {
    return fetch('/DreamTravels/travel_rec.json')
        .then(response => response.json())
        .then(data => {
            travelData = data;
            console.log('Data successfully fetched:', travelData);
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
}

function performSearch() {
    const searchBox = document.getElementById('searchBox');
    const recommendations = document.getElementById('recommendations');
    const query = searchBox.value.toLowerCase();

    recommendations.innerHTML = '';

    if (!query) {
        recommendations.style.display = 'none';
        return;
    }

    let results = [];
    recommendations.style.display = 'block';

    if (query.includes('beach')) {
        results = travelData.beaches || [];
    } else if (query.includes('temple')) {
        results = travelData.temples || [];
    } else {
        travelData?.beaches?.forEach(item => {
            if (item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)) {
                results.push(item);
            }
        });

        travelData?.temples?.forEach(item => {
            if (item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)) {
                results.push(item);
            }
        });

        travelData?.countries?.forEach(country => {
            country.cities?.forEach(city => {
                if (city.name.toLowerCase().includes(query) || city.description.toLowerCase().includes(query)) {
                    results.push(city);
                }
            });
        });
    }

    displayResults(results);
}

function showAll() {
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = '';
    recommendations.style.display = 'block';

    let results = [
        ...(travelData.beaches || []),
        ...(travelData.temples || []),
        ...(travelData.countries?.flatMap(country => country.cities) || [])
    ];
    displayResults(results);
}

function displayResults(results) {
    const recommendations = document.getElementById('recommendations');

    if (results.length) {
        results.forEach(item => {
            const card = document.createElement('div');
            card.style.marginBottom = '10px';
            card.innerHTML = `
                <h2>${item.name}</h2>
                <img src="${item.imageUrl}" alt="${item.name}" style="width: 85%; height: 85%; border-radius: 4px;" />
                <p style="font-size: 18px;">${item.description}</p>
                <p id="time-${item.name.replace(/[\s,]/g, '-')}" style="font-weight: bold;"></p>
            `;
            recommendations.appendChild(card);
        });
    } else {
        recommendations.innerHTML = '<p>No results found. Try searching for another term.</p>';
    }
}

function clearSearch() {
    const searchBox = document.getElementById('searchBox');
    const recommendations = document.getElementById('recommendations');

    if (searchBox && recommendations) {
        searchBox.value = '';
        recommendations.innerHTML = '';
        recommendations.style.display = 'none';
    }
}

function setupEventListeners() {
    const searchButton = document.getElementById('searchButton');
    const showAllButton = document.getElementById('showAllButton');
    const clearBtn = document.getElementById('clearButton');
    searchButton.addEventListener('click', performSearch);
    clearBtn.addEventListener('click', clearSearch);
    showAllButton.addEventListener('click', showAll);
}

document.addEventListener('DOMContentLoaded', function () {
    fetchData().then(setupEventListeners);
});