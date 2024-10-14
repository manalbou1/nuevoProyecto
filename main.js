import './style.css'

const body = document.querySelector("body");
const div = document.createElement("div");
div.classList.add("container");

const h2 = document.createElement("h2");
h2.textContent = "Quiz Question?";
div.appendChild(h2);

const p = document.createElement("p");
p.textContent = "What is the capital of France?";
div.appendChild(p);

const respuesta = [
  ["London", "Berlin", "Paris", "Madrid"],
  ["Nile", "Amazon", "Yangtze", "Mississippi"],
  ["Shakespeare", "Hemingway", "Dante", "Tolstoy"],
  ["7", "8", "9", "10"]
];

// Array de preguntas
const questions = [
  "What is the capital of France?",
  "What is the longest river in the world?",
  "Who wrote Romeo and Juliet?",
  "How many planets are there in our solar system?"
];

// Inicializar el índice de la pregunta actual
let currentQuestionIndex = 0;

// Función para actualizar las preguntas y respuestas
function updateQuestion() {
  // Actualizar el texto de la pregunta
  p.textContent = questions[currentQuestionIndex];

  // Actualizar las opciones de respuesta
  const ul = document.querySelector("ul");
  ul.innerHTML = ""; // Limpiar las respuestas anteriores
  for (let i = 0; i < respuesta[currentQuestionIndex].length; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = respuesta[currentQuestionIndex][i];
    li.appendChild(button);
    ul.appendChild(li);
  }

  // Habilitar/deshabilitar botones según el índice de la pregunta
  button1.disabled = currentQuestionIndex === 0; // Deshabilitar "Previous" en la primera pregunta
  button2.disabled = currentQuestionIndex === questions.length - 1; // Deshabilitar "Next" en la última pregunta
}

// Crear la lista de respuestas inicialmente
const ul = document.createElement("ul");
ul.classList.add("container-answers");
for (let i = 0; i < respuesta[currentQuestionIndex].length; i++) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.classList.add("answer-btn");
  button.textContent = respuesta[currentQuestionIndex][i];
  li.appendChild(button);
  ul.appendChild(li);
}
div.appendChild(ul);

const div2 = document.createElement("div");
div2.classList.add("container-footer");

const button1 = document.createElement("button");
button1.textContent = "Previous";
button1.disabled = true; // Deshabilitar "Previous" en la primera pregunta
button1.classList.add("footer-btn");

// Si es la primera vez que se entra, deshabilitar "Next"
if (!localStorage.getItem("firstVisit")) {
  button2.disabled = true;
}

button1.addEventListener("click", function () {
  // Retroceder a la pregunta anterior
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    updateQuestion();
  }
});

const button2 = document.createElement("button");
button2.classList.add("footer-btn");
button2.textContent = "Next";
button2.addEventListener("click", function () {
  // Guardamos en el localStorage que el usuario ya ha visitado la app
  localStorage.setItem("firstVisit", "true");

  // Avanzar a la siguiente pregunta
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    updateQuestion();
  }

  // Habilitamos el botón Previous cuando avanzamos
  button1.disabled = false;
});

div2.appendChild(button1);
div2.appendChild(button2);
div.appendChild(div2);

body.appendChild(div);
