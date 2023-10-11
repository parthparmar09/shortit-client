const BASE_URL = "https://shortit-pp.onrender.com";

let submitBtn = document.getElementById("submitBtn");
let msgDisplay = document.getElementById("msg-display");
let urlField = document.querySelector("#url");

const urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/ ;

function startShortening() {
  msgDisplay.innerHTML = "";
  msgDisplay.classList.remove("error", "success");
  const url = urlField.value;
  if (!urlRegex.test(url)) {
    urlField.value = "";
    msgDisplay.classList.add("error");
    msgDisplay.innerText = "Please enter a valid URL";
    return;
  }
  msgDisplay.innerText = "loading...";
  shortenUrl(url);
}

function shortenUrl(url) {
  fetch(`${BASE_URL}/shorten/`, {
    method: "POST",
    body: JSON.stringify({
      url
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })  .then((response) => response.json())
  .then((json) => processData(json))
  .catch(err=>{
    console.error(err)
    msgDisplay.classList.add("error");
    msgDisplay.innerText = err.message + ". Please try again";
  });;
}

function processData(data){
    urlField.value = "";
    if(!data.success){
        msgDisplay.classList.add("error");
        msgDisplay.innerText =  data.msg;
        return;
    }

    msgDisplay.classList.add("success");
    msgDisplay.innerHTML = `Your shortened link is
    <a href="${data.url}" target="_blank">${data.url}</a>
    <br />
    Note: the link is valid for 24 hours only`

    return;
}
