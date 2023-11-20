// Server-side script (Node.js)

const mp = require('rage-mp'); // Import the RageMP module

// Define the object's position and range for interaction
const objectPosition = new mp.Vector3(x, y, z);
const interactionRange = 2.0; // Adjust this value based on your needs

// Event handler for player interaction
mp.events.add('playerEnterColshape', (player, shape) => {
    if (shape === interactionColshape) {
        // Triggered when a player enters the interaction colshape
        player.notify('Press E to open the menu'); // Display a notification to the player
    }
});

// Event handler for player key press
mp.events.add('playerKeyPress', (player, key) => {
    if (key === 69) { // 'E' key
        // Check if the player is close to the object
        if (player.position.dist(objectPosition) < interactionRange) {
            // Open the menu for the player (you'll need to implement your menu system)
            // Example: Trigger a custom client-side event to open the menu
            player.call('openMenu');
        }
    }
});