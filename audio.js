const content = [
  {
    title: "environment",
    durationInSeconds: 600,
    path: "audio/environment.mp3"
  },
  {
    title: "lifestyle",
    durationInSeconds: 300,
    path: "audio/lifestyle.mp3"
  },
  {
    title: "technology",
    durationInSeconds: 330,
    path: "audio/technology.mp3"
  },
  {
    title: "culture",
    durationInSeconds: 341,
    path: "audio/culture.mp3"
  },
  {
    title: "design",
    durationInSeconds: 785,
    path: "audio/design.mp3"
  },
];

function findContentWithSimilarTimeTo(numberOfSeconds) {
  const thresholdSeconds = 60 * 1; // <<<< TODO Can adjust this threshold
  const similar = content.filter(item => {
    return Math.abs(item.durationInSeconds - numberOfSeconds) < thresholdSeconds;
  });

  if (similar.length === 0) {
    return content.slice(0, 1);
  }

  return similar;
}

var CLIENT_TOKEN = "UDSSMAZVL4EXHI53RC6ZUSHYHF2BY32V";
const micElement = document.getElementById("microphone");
var mic = new Wit.Microphone(micElement); // THIS!!!!
var info = function (msg) {
  const infoEl = document.getElementById("info");
  if (infoEl !== null) { infoEl.innerHTML = msg; }
};
var error = function (msg) {
  const errorEl = document.getElementById("error");
  if (errorEl !== null) { errorEl.innerHTML = msg; }
};
mic.onready = function () {
  info("Microphone is ready to record");
};

mic.onaudiostart = function () {
  info("Recording started");
  document.body.style.backgroundColor = "red";
  // TODO MORE SUBTLE FEEDBACK!
};
mic.onaudioend = function () {
  info("Recording stopped, processing started");
  document.body.style.backgroundColor = "green";
  // TODO MORE SUBTLE FEEDBACK!
};

mic.onresult = function (intent, entities) {
  if ("duration" in entities) {
    const numberOfSeconds = entities.duration.value;
    const possibleContent = findContentWithSimilarTimeTo(numberOfSeconds);

    const randomIndex = Math.floor(Math.random() * possibleContent.length);
    const randomContent = possibleContent[randomIndex];

    if (randomContent !== undefined) {
      document.getElementById("audio").src = randomContent.path;
    }
    else {
      console.log(possibleContent)
      console.error("did not get any content");
    }
  }
};
mic.onerror = function (err) {
  error("Error: " + err);
};
mic.onconnecting = function () {
  info("Microphone is connecting");
};
mic.ondisconnected = function () {
  info("Microphone is not connected");
};

mic.connect(CLIENT_TOKEN);
// mic.start();
// mic.stop();

function kv (k, v) {
  if (toString.call(v) !== "[object String]") {
    v = JSON.stringify(v);
  }
  return k + "=" + v + "\n";
}

document.addEventListener("click", () => {
    micElement.click();
}, false);
