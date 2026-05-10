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

let usuarioAtual = null;

let planejamentos = [];

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

  usuarioAtual = usuario;

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

  document.getElementById(
    'sidebarNome'
  ).innerText =
  usuario.nome;

  document.getElementById(
    'sidebarPerfil'
  ).innerText =
  usuario.role;

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

  carregarPerfil();
}

function logout(){

  location.reload();
}

/* ========================= */
/* TELAS */
/* ========================= */

function abrirTela(id){

  const telas =
  document.querySelectorAll(
    '.tela'
  );

  telas.forEach(t=>{

    t.classList.add(
      'hidden'
    );
  });

  document.getElementById(
    id
  ).classList.remove(
    'hidden'
  );
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
    status:'Em análise',

    criadoPor:
    usuarioAtual.nome

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

/* ========================= */
/* PERFIL */
/* ========================= */

function salvarPerfil(){

  const perfil = {

    nome:
    document.getElementById(
      'perfilNome'
    ).value,

    disciplina:
    document.getElementById(
      'perfilDisciplina'
    ).value,

    horario:
    document.getElementById(
      'perfilHorario'
    ).value

  };

  localStorage.setItem(
    'perfil',
    JSON.stringify(perfil)
  );

  alert(
    'Perfil salvo'
  );
}

function carregarPerfil(){

  const perfil =
  localStorage.getItem(
    'perfil'
  );

  if(perfil){

    const dados =
    JSON.parse(perfil);

    document.getElementById(
      'perfilNome'
    ).value =
    dados.nome || '';

    document.getElementById(
      'perfilDisciplina'
    ).value =
    dados.disciplina || '';

    document.getElementById(
      'perfilHorario'
    ).value =
    dados.horario || '';
  }
}