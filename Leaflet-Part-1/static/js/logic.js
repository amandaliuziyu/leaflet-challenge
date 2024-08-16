// Initialize the map and set its view to a default location (centered on the world)
const map = L.map('map').setView([20, 0], 2); 

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// URL for the Earthquake GeoJSON data (past 7 days)
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Fetch the data and plot it on the map
fetch(url)
    .then(response => response.json())
    .then(data => {
        const earthquakes = data.features;

        earthquakes.forEach(quake => {
            const magnitude = quake.properties.mag;
            const depth = quake.geometry.coordinates[2];
            const lat = quake.geometry.coordinates[1];
            const lon = quake.geometry.coordinates[0];
            const place = quake.properties.place;
            const time = new Date(quake.properties.time).toLocaleString();

            const radius = magnitude * 3;
            const color = depth > 300 ? "#800026" :
                          depth > 200 ? "#BD0026" :
                          depth > 100 ? "#E31A1C" :
                          depth > 50  ? "#FC4E2A" :
                          depth > 20  ? "#FD8D3C" :
                                        "#FEB24C";

            const marker = L.circleMarker([lat, lon], {
                radius: radius,
                fillColor: color,
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });

            const popupContent = `
                <strong>Location:</strong> ${place}<br>
                <strong>Magnitude:</strong> ${magnitude}<br>
                <strong>Depth:</strong> ${depth} km<br>
                <strong>Time:</strong> ${time}<br>
                <a href="${quake.properties.url}" target="_blank">More Info</a>
            `;

            marker.bindPopup(popupContent).addTo(map);
        });
    })
    .catch(error => console.error('Error fetching earthquake data:', error));

// Add a legend to the map
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    const depthGrades = [0, 20, 50, 100, 200, 300];
    const colors = ["#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"];
    const magnitudes = [1, 3, 5, 7];

    // Loop through depth intervals and generate a label with a colored square for each interval
    div.innerHTML += "<strong>Depth (km)</strong><br>";
    for (let i = 0; i < depthGrades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            depthGrades[i] + (depthGrades[i + 1] ? '&ndash;' + depthGrades[i + 1] + '<br>' : '+');
    }

    div.innerHTML += '<br><strong>Magnitude</strong><br>';

    // Loop through magnitudes and generate circles for the legend
    for (let i = 0; i < magnitudes.length; i++) {
        div.innerHTML +=
            '<i style="background: #000; width: ' + magnitudes[i] * 6 + 'px; height: ' + magnitudes[i] * 6 + 'px; border-radius: 50%; display: inline-block;"></i> ' +
            magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
    }

    return div;
};

// Add the legend to the map
legend.addTo(map);
