let hallWin = 0;
let hallLose = 0;
let hallSwitchWin = 0;
let hallSwitchLose = 0;
let fallWin = 0;
let fallLose = 0;
let fallAbort = 0;

hall = () => {
    console.log("Testing Monty Hall - No Switch");
    hallWin = 0;
    hallLose = 0;
    document.getElementById('hallExplain').innerHTML = "This is the result when the player does not switch their guess."
    let i = 0;
    while (i < 10001) {
        door = Math.floor(Math.random() * 3);
        guess = Math.floor(Math.random() * 3);
        opened = Math.floor(Math.random() * 3);
        while (opened == guess || opened == door) {
            opened = Math.floor(Math.random() * 3);
        };
        console.log(door, guess, opened);
        if (guess == door) {
            hallWin ++;
            console.log("Win");
        } else {
            hallLose ++;
            console.log("Lose");
        }
        i ++;
        document.getElementById('hallOutput').innerHTML = `Won: ${hallWin}. Lost: ${hallLose}`;
    }
    console.log("Test complete.");
}

hallSwitch = () => {
    console.log("Testing Monty Hall - Yes Switch");
    hallSwitchWin = 0;
    hallSwitchLose = 0;
    document.getElementById('hallSwitchExplain').innerHTML = "This is the result when the player switches their guess."
    let i = 0;
    while (i < 10001) {
        door = Math.floor(Math.random() * 3);
        guess = Math.floor(Math.random() * 3);
        opened = Math.floor(Math.random() * 3);
        while (opened == guess || opened == door) {
            opened = Math.floor(Math.random() * 3);
        };
        let guessNew = 0;
        while (guessNew == guess || guessNew == opened) {
            guessNew = Math.floor(Math.random() * 3);
        };
        console.log(door, guess, opened, guessNew);
        if (guessNew == door) {
            hallSwitchWin ++;
            console.log("Win");
        } else {
            hallSwitchLose ++;
            console.log("Lose");
        };
        i ++;
        document.getElementById('hallSwitchOutput').innerHTML = `Won: ${hallSwitchWin}. Lost: ${hallSwitchLose}`;
    }
    console.log("Test complete.");
}

fall = () => {
    console.log("Testing Monty Fall");
    fallWin = 0;
    fallLose = 0;
    document.getElementById('fallExplain').innerHTML = "This is the result when the game host opens a random door that is not the door you guessed"
    let i = 0;
    while (i < 20001) {
        door = Math.floor(Math.random() * 3);
        guess = Math.floor(Math.random() * 3);
        opened = Math.floor(Math.random() * 3);
        while (opened == guess) {
            opened = Math.floor(Math.random() * 3);
        };
        console.log(door, guess, opened);
        if (opened == door) {
            fallAbort ++;
            console.log("Wrong door was opened.");
        } else {
            if (guess == door) {
                fallWin ++;
            } else {
                fallLose ++;
            }
        }
        i ++;
        console.log(fallWin, fallLose, fallAbort);
        document.getElementById('fallOutput').innerHTML = `Won: ${fallWin}. Lost: ${fallLose}`;
}
}