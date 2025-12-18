let recognition;
let running = false;

if (!("webkitSpeechRecognition" in window)) {
    alert("Use Google Chrome or Microsoft Edge");
}

recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

function start() {
    recognition.lang = document.getElementById("language").value;
    recognition.start();
    running = true;
    document.getElementById("output").innerText = "Listening...";
}

function stop() {
    recognition.stop();
    running = false;
}

recognition.onresult = (event) => {
    let text = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript + " ";
    }
    document.getElementById("output").innerText = text;
};

// Auto restart
recognition.onend = () => {
    if (running) recognition.start();
};
