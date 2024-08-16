# leaflet-challenge
## Overview
Create an Earthquake Visualization using data from the USGS GeoJSON Feed.

I used the json feed of "Signigicant Earthquakes of the past 7 days". As the HTML is already set up, I worked only on the "logic.js" file.

### Setting up the Map
I initialized the map set in the center of the world (split the Pacific Ocean), then added the "OpenStreetMap" tiles to it. I also set the url for the json data that I would be using.

### Fetching the data
I then fetched the data then iterated through them to find and store all the info that I need - magnitude, depth, location coordinates - to later add as circler markers to the map. While doing that, I calculated the color and size of the circle markers according to the depth and magnitude respectively. The color gets darker as the depth increases. After that's all done, we create the circle markers and add them to their respective locations. We then created and binded PopUps with info on the earthquake's location, magnitude, and the time that it happened, etc.

### Adding a Legend
We created a legend and positioned at the bottom right of the page along with lists of depth, color,and magnitude for the legend. To complete the legend, we looped through depth intervals and generated a label with a colored square for each interval. Same goes for magnitude and the size of the circle markers.

## Comments
I really looked around and pulled most of the code from https://leafletjs.com/index.html 

It has everything from setting up the map to customizing the markers. It was very helpful.
