'use strict'

window.onload = function() {
    main();
}

function main() {
    var game = new Game(500, 500);

    console.log("Game was created!");
    console.log("Context: ", game.getContext());

    game.setRenderFunc(render);
    game.setFrameRate(50);
    game.setClearColor(COLOR_RED);
    
    // MAIN CYCLE
    game.run().then( (exitStatus) => {
        console.log(`Process terminated. Status: ${exitStatus}`);
    }).catch( (error) => {
        console.error(`Error: ${error}`);
    });
}

function render() {
    this.clearScreen();
}