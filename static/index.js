'use strict';

const quote_url = 'https://type.fit/api/quotes';
const quote_btn = document.getElementById('quote_btn');

let url;

var category = 'inspirational';
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {

    acc[i].addEventListener("click", function() {

      this.classList.toggle("active-accordion");

      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
  });
};

function displayMsg() {
  const confirmMsg = document.getElementById("confirmationMsg");
  const name = document.getElementById("name").value;
  const number = document.getElementById("number").value;
  const msg = document.getElementById("message").value;

  if (name === "" || number === "" || msg === "") {
    confirmMsg.textContent = "Please fill out all fields before submitting.";
  } else {
    confirmMsg.textContent = "Thanks for your message! We will get back to you as soon as possible. Have a great day!";
  }
}

quote_btn.addEventListener('click', getQuote);

async function getQuote() {
  console.log('Getting quote...');
  try {
    const response = await fetch(quote_url);
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);

    if (!response.ok) {
      throw Error('Error: ' + response.url + response.statusText);
    }

    console.log(data);
    const quotes = data.map(entry => entry.text);
    const authors = data.map(entry => entry.author.substring(0, entry.author.length - 10));

    if (authors[randomIndex] === "") {
      authors[randomIndex] = 'Unknown';
    }

    document.getElementById('quote').innerHTML = quotes[randomIndex];
    document.getElementById('quote_author').innerHTML = "- " + authors[randomIndex];
  } catch (error) {
    console.log(error);
    showError(error.message);
  }
  
}

function showError(message) {
  const errorContainer = document.querySelector('.error');
  errorContainer.textContent = 'Error: ' + message;
  if (errorContainer.classList.contains('hidden')) {
    errorContainer.classList.remove('hidden');
  }
}
