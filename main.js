import './style.css';

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
    respuesta: ["London", "Berlin", "Paris", "Madrid"],
    correcta: 2 // Índice de la respuesta correcta (Paris)
  },
  {
    pregunta: "What is the longest river in the world?",
    respuesta: ["Amazonas", "Nilo", "Yangtse", "Miño"],
    correcta: 1 // Índice de la respuesta correcta (Nilo)
  },
  {
    pregunta: "Who wrote Romeo and Juliet?",
    respuesta: ["Jane Austen", "Cervantes", "Charles Dickens", "William Shakespeare"],
    correcta: 3 // Índice de la respuesta correcta (William Shakespeare)
  },
  {
    pregunta: "How many planets are there in our solar system?",
    respuesta: ["7", "8", "9", "10"],
    correcta: 1 // Índice de la respuesta correcta (8)
  }
];

// Inicializar el índice de la pregunta actual
let currentQuestionIndex = 0;

// Array para almacenar las respuestas seleccionadas (inicialmente sin selección)
let selectedAnswers = new Array(objeto.length).fill(null);

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
  objeto[currentQuestionIndex].respuesta.forEach((answer, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer;

    // Si la respuesta fue seleccionada previamente, se marca en verde
    if (selectedAnswers[currentQuestionIndex] === index) {
      button.style.backgroundColor = "#3CB371"; // Mantener en verde la respuesta seleccionada previamente
    }

    // Añadir evento click para marcar solo una respuesta y guardarla
    button.addEventListener("click", function () {
      // Desmarcar todas las respuestas
      const allButtons = ul.querySelectorAll("button");
      allButtons.forEach(btn => {
        btn.style.backgroundColor = ""; // Restablecer color de fondo
      });

      // Marcar el botón clicado en verde
      button.style.backgroundColor = "#3CB371"; // Cambiar el color a verde

      // Guardar la respuesta seleccionada para la pregunta actual
      selectedAnswers[currentQuestionIndex] = index;

      // Comprobar si todas las preguntas han sido respondidas para habilitar el botón "Check"
      if (selectedAnswers.every(answer => answer !== null)) {
        checkButton.disabled = false; // Habilitar el botón "Check"
      }
    });

    li.appendChild(button);
    ul.appendChild(li);
  });

  // Habilitar/deshabilitar botones según el índice de la pregunta
  button1.disabled = currentQuestionIndex === 0; // Deshabilitar "Previous" en la primera pregunta
  button2.disabled = currentQuestionIndex === objeto.length - 1; // Deshabilitar "Next" en la última pregunta
}

// Crear botones "Previous", "Next" y "Check"
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

// Botón "Check"
const checkButton = document.createElement("button");
checkButton.textContent = "Check";
checkButton.disabled = true; // Deshabilitar el botón "Check" inicialmente
checkButton.classList.add("footer-btn");

// Añadir eventos a los botones
button1.addEventListener("click", function () {
  // Retroceder a la pregunta anterior
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    updateQuestion();
  }
});

button2.addEventListener("click", function () {
  // Avanzar a la siguiente pregunta
  if (currentQuestionIndex < objeto.length - 1) {
    currentQuestionIndex++;
    updateQuestion();
  }

  // Habilitar el botón Previous cuando avanzamos
  button1.disabled = false;
});

// Función para mostrar el modal
function showModal(correctAnswers, totalQuestions) {
  // Crear los elementos del modal
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeButton = document.createElement("span");
  closeButton.classList.add("modal-close");
  closeButton.innerHTML = "&times;"; // Carácter "×" para el botón de cerrar

  let resultMessage = document.createElement("div"); // Usa un div en lugar de p para contener todo el HTML
  resultMessage.innerHTML = `<h1>Result</h1><hr><p>You got ${correctAnswers} correct answers out of ${totalQuestions}!</p>`;
  

  // Añadir elementos al modal
  modalContent.appendChild(closeButton);
  modalContent.appendChild(resultMessage);
  modal.appendChild(modalContent);

  // Insertar el modal en el body
  body.appendChild(modal);

  // Mostrar el modal (cambiar visibilidad)
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
  }, 10);

  // Evento para cerrar el modal al hacer clic en la "X"
  closeButton.addEventListener("click", () => {
    closeModal(modal);
  });

  // Evento para cerrar el modal si se hace clic fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
}

// Función para cerrar el modal
function closeModal(modal) {
  modal.style.opacity = '0';
  modal.style.visibility = 'hidden';
  setTimeout(() => {
    modal.remove(); // Eliminar el modal del DOM después de la transición
  }, 300);
}

// Evento para el botón "Check" para mostrar los resultados en el modal
checkButton.addEventListener("click", function () {
  let correctAnswers = 0;

  // Comprobar cuántas respuestas son correctas
  selectedAnswers.forEach((selectedAnswer, questionIndex) => {
    if (selectedAnswer === objeto[questionIndex].correcta) {
      correctAnswers++; // Incrementar si la respuesta es correcta
    }
  });

  // Mostrar el modal con los resultados
  showModal(correctAnswers, objeto.length);
});

// Agregar los botones a la interfaz
div2.appendChild(button1);
div2.appendChild(button2);
div2.appendChild(checkButton);
div.appendChild(div2);

// Insertar el contenedor en el body
body.appendChild(div);

// Inicializar la primera pregunta
updateQuestion();
