const boxElement = document.getElementById("box");
const resetElement = document.getElementById("reset");
const controlElement = document.getElementById("control");

let config = {
    cnt: 0,
    isPause: true
};

function saveConfig() {
    localStorage.setItem("config", JSON.stringify(config));
}

function loadConfig() {
    const strConfig = localStorage.getItem("config");
    if (strConfig) {
        config = JSON.parse(strConfig);
    }
}

loadConfig();
boxElement.innerText = config.cnt;
controlElement.innerText = config.isPause ? "开始" : "暂停";
console.log(config);

setInterval(() => {
    if(!config.isPause){
        return;
    }
    boxElement.innerText = config.cnt;
    config.cnt++;
    saveConfig();
}, 1000);

resetElement.onclick = () => {
    config.cnt = 0;
}
controlElement.onclick = () => {
    config.isPause = !config.isPause;
    controlElement.innerText = config.isPause ? "开始" : "暂停";
}