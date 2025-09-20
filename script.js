// Initialize the map (center on India)
var map = L.map('map').setView([22.9734, 78.6569], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Locations data
var locations = [
  {
    name: "Ajanta Caves",
    coords: [20.5519, 75.7033],
    info: "<b>Ajanta Caves</b><br>2nd BCE–6th CE<br>Buddhist mural paintings"
  },
  {
    name: "Ellora Caves",
    coords: [20.0268, 75.1793],
    info: "<b>Ellora Caves</b><br>6th–10th CE<br>Rock-cut architecture and sculpture"
  },
  {
    name: "Sanchi Stupa",
    coords: [23.4793, 77.7398],
    info: "<b>Sanchi Stupa</b><br>3rd BCE<br>Buddhist architecture"
  },
  {
    name: "Khajuraho Temples",
    coords: [24.8318, 79.9199],
    info: "<b>Khajuraho Temples</b><br>10th CE<br>Intricate temple carvings and sculptures"
  },
  {
    name: "Tanjore (Thanjavur)",
    coords: [10.7870, 79.1378],
    info: "<b>Tanjore</b><br>Famous for Tanjore paintings with gold leaf work"
  },
  {
    name: "Shantiniketan",
    coords: [23.6815, 87.6850],
    info: "<b>Shantiniketan</b><br>Founded by Rabindranath Tagore<br>Center of Bengal School of Art"
  }
];

// Add markers
locations.forEach(loc => {
  L.marker(loc.coords).addTo(map)
    .bindPopup(loc.info);
});
