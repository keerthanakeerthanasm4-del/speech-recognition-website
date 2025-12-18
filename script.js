let recognition = null;
let running = false;

// Check browser support
if (!("webkitSpeechRecognition" in window)) {
    alert("Speech recognition not supported.\nUse Google Chrome or Microsoft Edge.");
} else {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function (event) {
        let text = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
            text += event.results[i][0].transcript + " ";
        }
        document.getElementById("output").innerText = text;
    };

    recognition.onerror = function (event) {
        document.getElementById("output").innerText =
            "Error: " + event.error + "\nCheck microphone permission.";
    };

    recognition.onend = function () {
        if (running) recognition.start();
    };
}

function start() {
    if (!recognition) return;

    recognition.lang = document.getElementById("language").value;
    recognition.start();
    running = true;

    document.getElementById("output").innerText = "Listening...";
}

function stop() {
    running = false;
    if (recognition) recognition.stop();
}
