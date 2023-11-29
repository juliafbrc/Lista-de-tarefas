//declarando as variáveis
const texto = document.querySelector('input')
const btnInsert = document.querySelector('.divInsert button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')

//variavel global para iterar com o banco
var itensDB = []

//eventos 
btnDeleteAll.onclick = () => {
  itensDB = []
  updateDB()
}

texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    setItemDB()
  }
})

btnInsert.onclick = () => {
  if (texto.value != '') {
    setItemDB()
  }
}

// verificar se tem mais de 20 itens na tela
function setItemDB() {
  if (itensDB.length >= 20) {
    alert('Limite máximo de 20 itens atingido!')
    return
  }

  itensDB.push({ 'item': texto.value, 'status': '' })
  updateDB()
}
//colocar o iten do banco
function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB))
  loadItens()
}
//limpar para não duplicar itens na tela
function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, i)
  })
}

function insertItemTela(text, status, i) {
  const li = document.createElement('li')
  
  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="editItem(${i})" data-i=${i}><i class='bx bx-edit'></i></button>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button> 

    </div>
    `
  ul.appendChild(li)

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
  }

  texto.value = ''
}

function done(chk, i) {

  if (chk.checked) {
    itensDB[i].status = 'checked' 
  } else {
    itensDB[i].status = '' 
  }

  updateDB()
}

function editItem(i) {
    const newText = prompt("Editar tarefa:", itensDB[i].item);
  
    if (newText !== null) {
      itensDB[i].item = newText;
      updateDB();
    }
  }  

function removeItem(i) {
  itensDB.splice(i, 1)
  updateDB()
}

loadItens()