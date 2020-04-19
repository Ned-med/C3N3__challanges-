//ADD new To do 
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const popup = document.querySelector('.popup');
const gPop = document.querySelector('.popup-wrapper');
const btn = document.querySelector('.btn');
const todoInput = document.querySelector('#todoInput');
const search = document.querySelector('.search input');
let Mytodos = [];
let isClosed = false;
gPop.style.display = "none";


/***************reusable function********************/

/* Function pour l'alert et le popup qui va etre afficher (time control)*/
function start(duree) {
   let o = document.getElementById("sp");
   // gPop.addEventListener('click', e => {
   //    if (e.target.id = 'closing') {
   //             gPop.style.display = "none";

   //    }
   // });
   // onetime(gPop, 'click', handler)
   if (isClosed) {
      isClosed = false;
      return;
   }
   if (duree > 0) {
      o.innerHTML = duree;
      gPop.style.display = "block";
      popup.style.visibility = "visible";
      setTimeout("start(" + duree + " -1)", 1000);
   }
   else {
      // alert("enter a valid to do");
      // o.innerHTML ="Au revoir";
      gPop.style.display = "none";
      popup.style.visibility = "hidden";

   }
};



/* Function Creation dynamique du POPUP */

function create() {
   const div = document.createElement('div');
   div.classList.add('popup-close');
   div.setAttribute('id', 'closing');
   const text = document.createTextNode('X');
   div.appendChild(text);
   popup.append(div);
   const div2 = document.createElement('div');
   div2.classList.add('popup-content');
   const html = `
      <span id="sp">1</span>
      <h2>Fill the Input</h2>
      <p>Don't forget</p>
      <a id='rtrn'>Return</a>`;
   div2.innerHTML = html;
   popup.append(div2);

}

/* Function generation dynamique des TODOS */

const generateTemp = todo => {
   const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="fas fa-trash delete"></i>
      </li>
      `;
   Mytodos.push(todo);
   localStorage.setItem('Todos', JSON.stringify(Mytodos));
   list.innerHTML += html;
};


const storedTodos = () => {
   let todos = JSON.parse(localStorage.getItem('Todos'));

   if(todos !== null) {
      todos.forEach(element => {
      Mytodos.push(element);
      list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${element}</span>
      <i class="fas fa-trash delete"></i>
      </li>
      `;
   }); 
      }
}
storedTodos();


/* function pour controller l'evenement et pour ne pas etre repeté à chaque clique */
function onetime(node, type, callback) {

   node.addEventListener(type, function (e) {

      e.target.removeEventListener(e.type, arguments.callee);

      return callback(e);
   });
}

onetime(gPop, 'click', handler);



function handler(e) {

   if (e.target.id = 'closing') {
      gPop.style.display = "none";
      isClosed = true;
   }
}

/***************Fin reusable function********************/



/************* Adding TO DO**************/

//Eventlistner Add TODOS
let AddTodo = function (e) {
   let todo = e.target.parentNode.querySelector("input");
   // todo === "" ? (() =>{create(); start(5)})() : generateTemp(todo);
   if (todo.value === "") {
      // create();
      start(5);
   } else {
      generateTemp(todo.value);
      todo.value = "";
   }
}
btn.addEventListener('click', AddTodo);

todoInput.addEventListener('keypress', function (event) {
   if (event.keyCode === 13 || event.which === 13) { AddTodo(event); }
});
/************* Fin Adding TO DO**************/



/*************Deleting  TO DO**************/
list.addEventListener('click', e => {
   list.removeChild(e.target.parentNode);
   const index = Mytodos.indexOf(e.target.parentNode.querySelector('span').innerText);
   if (index > -1) {
      Mytodos.splice(index, 1);
      localStorage.setItem('Todos', JSON.stringify(Mytodos));
   }

});

/************* Fin Deleting  TO DO**************/




/************************************* SEARCH ITEM********************************************/
//filtering Todos :

//we will apply a class to the Todos that dont match and the that class will

// have keyup event 



const retrieve = (term) => {
   const result = Mytodos.filter(word => word.includes(term));
   list.innerHTML = "";
   result.forEach(element => {
      list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${element}</span>
      <i class="fas fa-trash delete"></i>
      </li>
      `;
   });
};


//evenement de recherche des mots clés 
search.addEventListener('keyup', (e) => {
retrieve(e.target.value);

})

/*************************************Fin SEARCH ITEM********************************************/




