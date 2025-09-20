// Initialize the map
var map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

// Set up the tile layer (map background)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Locations with historical and cultural relevance to Indian art
var locations = [
    {
        name: 'Mumbai',
        lat: 19.0760,
        lon: 72.8777,
        description: 'Mumbai is home to contemporary Indian art movements, galleries, and museums, such as the Chhatrapati Shivaji Maharaj Vastu Sangrahalaya.',
        img: 'path-to-image.jpg'
    },
    {
        name: 'Kolkata',
        lat: 22.5726,
        lon: 88.3639,
        description: 'Kolkata is known for its rich history in the Bengal School of Art, with artists like Abanindranath Tagore making a significant impact.',
        img: 'path-to-image.jpg'
    },
    {
        name: 'Chennai',
        lat: 13.0827,
        lon: 80.2707,
        description: 'Chennai is a center for traditional South Indian art, including classical dance, sculpture, and Tamil literature.',
        img: 'path-to-image.jpg'
    },
    {
        name: 'Jaipur',
        lat: 26.9124,
        lon: 75.7873,
        description: 'Jaipur is famous for its miniature painting style and the distinct Rajasthani art forms that have influenced Indian art history.',
        img: 'path-to-image.jpg'
    },
    {
        name: 'Bhopal',
        lat: 23.2599,
        lon: 77.4126,
        description: 'Bhopal is known for its traditional Madhya Pradesh art forms, including Gond paintings and crafts.',
        img: 'path-to-image.jpg'
    }
];

// Add markers for each location with popup content
locations.forEach(function(location) {
    var marker = L.marker([location.lat, location.lon]).addTo(map);
    var popupContent = `
        <div class="popup-content">
            <h3>${location.name}</h3>
            <img src="${location.img}" alt="${location.name}" style="width: 100%; height: auto;">
            <p>${location.description}</p>
        </div>
    `;
    marker.bindPopup(popupContent);
});



