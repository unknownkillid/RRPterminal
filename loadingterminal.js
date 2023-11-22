document.addEventListener("DOMContentLoaded", function () {
    const bootText = [
        "Booting up...",
        "Loading modules...",
        "Initializing system...",
        "Welcome to the Terminal!",
    ];

    const loadingSound = new Audio()
    loadingSound.src = './assets/sounds/loading.wav'

    const outputElement = document.getElementById("terminaloutput");

    function simulateBoot(textArray, index) {
        if (index < textArray.length) {
            outputElement.innerHTML += textArray[index] + '\n';
            
            index++;
            setTimeout(function () {
                simulateBoot(textArray, index);
                loadingSound.play()
                loadingSound.volume = 0.5
            }, 3000);
        }

        setTimeout(() => {
            if (index == 4) {
                document.getElementById('terminalLoadingNone').classList.add('display')
                setTimeout(() => {
                    document.getElementById('terminalLoadingNone').classList.add('none')
                }, 700);
            }
        }, 1500);
    }
    simulateBoot(bootText, 0);
});