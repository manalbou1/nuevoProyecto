import './style.css'

const body = document.querySelector("body");
const div = document.createElement("div");
div.classList.add("container");

const h2 = document.createElement("h2");
h2.textContent = "Quiz Question?";
div.appendChild(h2);

const p = document.createElement("p");
div.appendChild(p);

// Array de preguntas y respuestas
const objeto = [
  {
    pregunta: "What is the capital of France?",
    respuesta: ["London", "Berlin", "Paris", "Madrid"]
  },
  {
    pregunta: "What is the longest river in the world?",
    respuesta: ["Amazonas", "Nilo", "Yangtse", "Miño"]
  },
  {
    pregunta: "Who wrote Romeo and Juliet?",
    respuesta: ["Jane Austen", "Cervantes", "Charles Dickens", "William Shakespeare"]
  },
  {
    pregunta: "How many planets are there in our solar system?",
    respuesta: ["7", "8", "9", "10"]
  }
];

// Inicializar el índice de la pregunta actual
let currentQuestionIndex = 0;

// Crear la lista de respuestas inicialmente
const ul = document.createElement("ul");
ul.classList.add("container-answers");
div.appendChild(ul);

// Función para actualizar las preguntas y respuestas
function updateQuestion() {
  // Actualizar el texto de la pregunta
  p.textContent = objeto[currentQuestionIndex].pregunta;

  // Actualizar las opciones de respuesta
  ul.innerHTML = ""; // Limpiar las respuestas anteriores
  objeto[currentQuestionIndex].respuesta.forEach(answer => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer;
    li.appendChild(button);
    ul.appendChild(li);
  });

  // Habilitar/deshabilitar botones según el índice de la pregunta
  button1.disabled = currentQuestionIndex === 0; // Deshabilitar "Previous" en la primera pregunta
  button2.disabled = currentQuestionIndex === objeto.length - 1; // Deshabilitar "Next" en la última pregunta
}

// Crear botones "Previous" y "Next"
const div2 = document.createElement("div");
div2.classList.add("container-footer");

const button1 = document.createElement("button");
button1.textContent = "Previous";
button1.disabled = true; // Deshabilitar "Previous" en la primera pregunta
button1.classList.add("footer-btn");

// Botón "Next"
const button2 = document.createElement("button");
button2.classList.add("footer-btn");
button2.textContent = "Next";

// Añadir eventos a los botones
button1.addEventListener("click", function () {
  // Retroceder a la pregunta anterior
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    updateQuestion();
  }
});

button2.addEventListener("click", function () {
  // Guardar en localStorage que el usuario ya ha visitado la app
  localStorage.setItem("firstVisit", "true");

  // Avanzar a la siguiente pregunta
  if (currentQuestionIndex < objeto.length - 1) {
    currentQuestionIndex++;
    updateQuestion();
  }

  // Habilitar el botón Previous cuando avanzamos
  button1.disabled = false;
});

// Agregar los botones a la interfaz
div2.appendChild(button1);
div2.appendChild(button2);
div.appendChild(div2);

// Insertar el contenedor en el body
body.appendChild(div);

// Inicializar la primera pregunta
updateQuestion();
