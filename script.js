const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "It seems to me"
  },
  {
    image: './img/food.jpg',
    text: "Did you manage the clients expectations well?"
  },
  {
    image: './img/tired.jpg',
    text: "Setting boundaries is important"
  },
  {
    image: './img/hurt.jpg',
    text: "How long will it take to do the work"
  },
  {
    image: './img/happy.jpg',
    text: "And all will become plain"
  },
  {
    image: './img/angry.jpg',
    text: "Who could they be?"
  },
  {
    image: './img/sad.jpg',
    text: "My look was rummaging through the shelves"
  },
  {
    image: './img/scared.jpg',
    text: "Unusual life of a recluse"
  },
  {
    image: './img/outside.jpg',
    text: 'I turned around unwittingly'
  },
  {
    image: './img/home.jpg',
    text: 'I pounced after them'
  },
  {
    image: './img/school.jpg',
    text: 'What is his taste?'
  },
  {
    image: './img/grandma.jpg',
    text: 'I have been told seem to militate against that'
  }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
