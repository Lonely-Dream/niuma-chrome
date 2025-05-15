console.log("init:",new Date());

setInterval(()=>{
    console.log("tick:",new Date());
},3000);


chrome.action.onClicked.addListener(()=>{
    console.log("clicked");
});