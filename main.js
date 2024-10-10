import './style.css'

const body=document.querySelector("body");
const div = document.createElement("div");  
div.classList.add("container");
const h2 = document.createElement("h2");      
h2.textContent = "Quiz Question?";         
div.appendChild(h2); 
const p = document.createElement("p");
p.textContent = "What is the capital of France?";
div.appendChild(p);      
  
const respuesta = ["London", "Berlín", "Paris", "Madrid"];  
const ul=document.createElement("ul");
ul.classList.add("container-answers");
for (let i = 0; i < respuesta.length; i++) {   
  const li = document.createElement("li");          
  const button = document.createElement("button");
  button.classList.add("answer-btn");
  ul.classList.add("container-answers"); 
  button.textContent = respuesta[i];                
  li.appendChild(button);                           
  ul.appendChild(li);                               
}
div.appendChild(ul);
const div2=document.createElement("div");
div2.classList.add("container-footer");

const button1=document.createElement("button");
button1.textContent="Previous";
button1.classList.add("footer-btn");
const button2=document.createElement("button");
button2.classList.add("footer-btn");
button2.textContent="Next";

div2.appendChild(button1);

div2.appendChild(button2);
div.appendChild(div2);

     
body.appendChild(div);