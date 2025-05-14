const boxElement = document.getElementById("box");
const resetElement = document.getElementById("reset");
const controlElement = document.getElementById("control");

let cnt = 0;
let isPause = false;

function saveConfig() {
    localStorage.setItem("cnt", cnt);
}

function loadConfig() {
    const strConfig = localStorage.getItem("cnt");
    if (strConfig) {
        cnt = Number.parseInt(strConfig);
    }
}

loadConfig();
boxElement.innerText = cnt;
controlElement.innerText = isPause ? "开始" : "暂停";
setInterval(() => {
    if(!isPause){
        return;
    }
    boxElement.innerText = cnt;
    cnt++;
    saveConfig();
}, 1000);

resetElement.onclick = () => {
    cnt = 0;
}
controlElement.onclick = () => {
    isPause = !isPause;
    controlElement.innerText = isPause ? "开始" : "暂停";
}