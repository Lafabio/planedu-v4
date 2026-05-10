const usuarios = [

  {
    email:'professor@sesi.sc.edu.br',
    senha:'123456',
    nome:'Professor',
    role:'professor'
  },

  {
    email:'coordenador@sesi.sc.edu.br',
    senha:'123456',
    nome:'Coordenador',
    role:'coordenador'
  },

  {
    email:'admin@sesi.sc.edu.br',
    senha:'123456',
    nome:'Administrador',
    role:'manutencao'
  }

];

/* ========================= */
/* LOGIN */
/* ========================= */

function login(){

  const email =
  document.getElementById(
    'email'
  ).value;

  const senha =
  document.getElementById(
    'senha'
  ).value;

  const usuario =
  usuarios.find(u=>

    u.email === email &&
    u.senha === senha

  );

  if(!usuario){

    alert(
      'Usuário inválido'
    );

    return;
  }

  iniciarDashboard(usuario);
}

function iniciarDashboard(usuario){

  document.getElementById(
    'loginBox'
  ).style.display = 'none';

  document.getElementById(
    'dashboard'
  ).style.display = 'block';

  document.getElementById(
    'titulo'
  ).innerText =
  'Olá, ' + usuario.nome;

  document.getElementById(
    'subtitulo'
  ).innerText =
  'Perfil: ' + usuario.role;

  if(usuario.role !== 'coordenador'){

    document.getElementById(
      'coordBtn'
    ).style.display = 'none';
  }

  if(usuario.role !== 'manutencao'){

    document.getElementById(
      'adminBtn'
    ).style.display = 'none';
  }

  carregarPlanejamentos();
}

function logout(){

  location.reload();
}

/* ========================= */
/* MODAL */
/* ========================= */

function abrirModal(){

  document.getElementById(
    'modal'
  ).style.display = 'flex';
}

function fecharModal(){

  document.getElementById(
    'modal'
  ).style.display = 'none';
}

/* ========================= */
/* PLANEJAMENTOS */
/* ========================= */

let planejamentos = [];

function salvarPlanejamento(){

  const disciplina =
  document.getElementById(
    'disciplina'
  ).value;

  const turma =
  document.getElementById(
    'turma'
  ).value;

  const semana =
  document.getElementById(
    'semana'
  ).value;

  const conteudo =
  document.getElementById(
    'conteudo'
  ).value;

  if(
    !disciplina ||
    !turma ||
    !semana ||
    !conteudo
  ){

    alert(
      'Preencha todos os campos'
    );

    return;
  }

  planejamentos.push({

    disciplina,
    turma,
    semana,
    conteudo,
    status:'Em análise'

  });

  salvarLocalStorage();

  renderizarPlanejamentos();

  limparCampos();

  fecharModal();
}

function renderizarPlanejamentos(){

  const lista =
  document.getElementById(
    'listaPlanejamentos'
  );

  lista.innerHTML = '';

  planejamentos.forEach((p,index)=>{

    lista.innerHTML += `

      <tr>

        <td>
          ${p.disciplina}
        </td>

        <td>
          ${p.turma}
        </td>

        <td>
          ${p.semana}
        </td>

        <td>

          <span class="badge">

            ${p.status}

          </span>

        </td>

        <td>

          <button
          class="action-btn delete-btn"
          onclick="removerPlanejamento(${index})">

            Excluir

          </button>

        </td>

      </tr>

    `;
  });

  document.getElementById(
    'totalPlanejamentos'
  ).innerText =
  planejamentos.length;
}

function removerPlanejamento(index){

  planejamentos.splice(index,1);

  salvarLocalStorage();

  renderizarPlanejamentos();
}

function limparCampos(){

  document.getElementById(
    'disciplina'
  ).value = '';

  document.getElementById(
    'turma'
  ).value = '';

  document.getElementById(
    'semana'
  ).value = '';

  document.getElementById(
    'conteudo'
  ).value = '';
}

/* ========================= */
/* STORAGE */
/* ========================= */

function salvarLocalStorage(){

  localStorage.setItem(
    'planejamentos',
    JSON.stringify(
      planejamentos
    )
  );
}

function carregarPlanejamentos(){

  const dados =
  localStorage.getItem(
    'planejamentos'
  );

  if(dados){

    planejamentos =
    JSON.parse(dados);

    renderizarPlanejamentos();
  }
}