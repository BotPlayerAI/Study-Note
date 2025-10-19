const chatForm = document.getElementById('chat-form');
const chatWindow = document.getElementById('chat-window');
const chatMessage = document.getElementById('chat-message');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

const knowledgeBase = [
  {
    keywords: ['math', 'algebra', 'equation', 'geometry'],
    reply:
      "Let's break that down visually. Start by identifying what the question is asking, then note the given information. I can craft a guided example or generate a quick quiz if you like."
  },
  {
    keywords: ['history', 'war', 'revolution', 'ancient'],
    reply:
      'To study history effectively, organize the timeline first. I can summarize causes, key figures, and impact using a note card layout for you.'
  },
  {
    keywords: ['science', 'biology', 'physics', 'chemistry'],
    reply:
      'Science clicks when we connect principles to experiments. Want a simulation idea, a concept map, or a set of flashcards?' 
  },
  {
    keywords: ['language', 'essay', 'write', 'writing'],
    reply:
      'Let me suggest a structure: thesis, supporting insights, and reflective conclusion. I can also quiz you on vocabulary or grammar using spaced repetition.'
  }
];

function createMessageElement(text, author) {
  const wrapper = document.createElement('div');
  wrapper.className = `message ${author}`;

  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = author === 'assistant' ? 'Study Note' : 'You';

  const content = document.createElement('p');
  content.textContent = text;

  wrapper.appendChild(label);
  wrapper.appendChild(content);

  return wrapper;
}

function findResponse(message) {
  const lower = message.toLowerCase();

  for (const entry of knowledgeBase) {
    if (entry.keywords.some((word) => lower.includes(word))) {
      return entry.reply;
    }
  }

  return "I hear you! Let's outline what you know, note what feels tricky, and build a micro-study plan together.";
}

function appendMessage(text, author) {
  const messageElement = createMessageElement(text, author);
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
}

if (chatForm) {
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatMessage.value.trim();

    if (!message) return;

    appendMessage(message, 'user');
    chatMessage.value = '';

    setTimeout(() => {
      const reply = findResponse(message);
      appendMessage(reply, 'assistant');
    }, 450);
  });
}
