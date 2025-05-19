const slogans = [
    "牛不哞，马不嘶，小小牛马，收到收到",
    "加班如饮水，摸鱼是刚需",
    "牛马望星辰，明日准点起",
    "千里马常有，加班费难求",
    "草料若管够，夜班也温柔",
    "牛角不顶人，马尾不扫尘",
    "青牛食百草，驽马行千里",
    "工位方寸间，摸鱼得真谛",
    "晨起做牛叫，夜眠学马倒",
    "咖啡续命时，摸鱼保平安",
];
const sloganElement = document.getElementById("slogan");
const configBoxElement = document.querySelector("body > div.box.config");
const salaryElement = document.getElementById("salary");
const startTimeElement = document.getElementById("start-time");
const endTimeElement = document.getElementById("end-time");

let config = {
    salary: 99999,
    startTime: "09:00",
    endTime: "18:00"
};

// 初始化
// 设置第一条随机标语
sloganElement.innerHTML = slogans[Math.floor(Math.random() * slogans.length)];
// 加载配置
loadConfig();
salaryElement.value = config.salary;
startTimeElement.value = config.startTime;
endTimeElement.value = config.endTime;

setInterval(() => {
    sloganElement.innerHTML = slogans[Math.floor(Math.random() * slogans.length)];
}, 3000);
setInterval(onCountdownTimer, 100);


function saveConfig() {
    config.salary = parseFloat(salaryElement.value) || 0;
    config.startTime = startTimeElement.value;
    config.endTime = endTimeElement.value;
    localStorage.setItem("config", JSON.stringify(config));
}

function loadConfig() {
    const strConfig = localStorage.getItem("config");
    if (strConfig) {
        config = JSON.parse(strConfig);
    }
}

function calculateDailySalary(monthlySalary) {
    const workDaysInMonth = getWorkDaysInMonth(new Date());
    return monthlySalary / workDaysInMonth;
}

function getWorkDaysInMonth(date) {
    let count = 0;
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) { // Monday to Friday
            count++;
        }
    }
    return count;
}

function onCountdownTimer() {
    const now = new Date();
    const [startHours, startMinutes] = config.startTime.split(':').map(Number);
    const [endHours, endMinutes] = config.endTime.split(':').map(Number);

    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHours, startMinutes);
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHours, endMinutes);

    let currentIncome = 0;
    let progressValue = 0;

    if (now >= startTime && now <= endTime) {
        const dailySalary = calculateDailySalary(config.salary);
        const workDurationInSeconds = (endTime - startTime) / 1000;
        const incomePerSecond = dailySalary / workDurationInSeconds;

        const elapsedSeconds = (now - startTime) / 1000;
        currentIncome = Math.round(incomePerSecond * elapsedSeconds * 100) / 100;
        progressValue = ((elapsedSeconds / workDurationInSeconds) * 100).toFixed(2);

        document.getElementById('current-income').textContent = currentIncome.toFixed(2);
        document.getElementById('process-value').textContent = `${progressValue}%`;
        document.querySelector('.process-bar').style.width = `${progressValue}%`;

        const timeLeft = Math.max(0, Math.ceil((endTime - now) / 1000));
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        document.getElementById('countdown').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        document.getElementById('current-income').textContent = '0.00';
        document.getElementById('process-value').textContent = '0%';
        document.querySelector('.process-bar').style.width = '0%';
        document.getElementById('countdown').textContent = '00:00:00';
    }

    // Update daily income based on daily salary
    const dailySalary = calculateDailySalary(config.salary);
    document.getElementById('daily-income').textContent = dailySalary.toFixed(2);
}

function onConfig() {
    configBoxElement.style.display = "block";
}

function onUpdateConfig() {
    saveConfig();
    configBoxElement.style.display = "none";
}

document.getElementById("save").onclick = onUpdateConfig;
document.getElementById("config").onclick = onConfig;