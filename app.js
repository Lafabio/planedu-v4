setTimeout(()=>{

  document.getElementById(
    'loadingScreen'
  ).style.display = 'none';

},1200);

/* ========================= */
/* TOAST */
/* ========================= */

function showToast(texto){

  const toast =
  document.getElementById(
    'toast'
  );

  toast.innerText = texto;

  toast.classList.add(
    'show'
  );

  setTimeout(()=>{

    toast.classList.remove(
      'show'
    );

  },3000);
}

/* ========================= */
/* STORAGE */
/* ========================= */

let usuarios = JSON.parse(
  localStorage.getItem('usuarios')
) || [

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

let planejamentos = JSON.parse(
  localStorage.getItem(
    'planejamentos'
  )
) || [];

let usuarioAtual = null;

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

    showToast(
      'Usuário inválido'
    );

    return;
  }

  usuarioAtual = usuario;

  iniciarDashboard();
}

function iniciarDashboard(){

  document.getElementById(
    'loginBox'
  ).style.display = 'none';

  document.getElementById(
    'dashboard'
  ).style.display = 'block';

  document.getElementById(
    'titulo'
  ).innerText =
  'Olá, ' + usuarioAtual.nome;

  document.getElementById(
    'subtitulo'
  ).innerText =
  'Perfil: ' + usuarioAtual.role;

  document.getElementById(
    'sidebarNome'
  ).innerText =
  usuarioAtual.nome;

  document.getElementById(
    'sidebarPerfil'
  ).innerText =
  usuarioAtual.role;

  if(usuarioAtual.role !== 'coordenador'){

    document.getElementById(
      'coordBtn'
    ).style.display = 'none';
  }

  if(usuarioAtual.role !== 'manutencao'){

    document.getElementById(
      'adminBtn'
    ).style.display = 'none';
  }

  carregarPerfil();

  renderizarPlanejamentos();

  renderizarUsuarios();

  atualizarDashboard();

  renderizarCoordenacao();

  atualizarRelatorios();

  carregarDarkMode();

  showToast(
    'Login realizado'
  );
}

function logout(){

  location.reload();
}

/* ========================= */
/* DARK MODE */
/* ========================= */

function toggleDarkMode(){

  document.body.classList.toggle(
    'dark'
  );

  localStorage.setItem(

    'darkMode',

    document.body.classList.contains(
      'dark'
    )

  );

  showToast(
    'Tema alterado'
  );
}

function carregarDarkMode(){

  const dark =
  localStorage.getItem(
    'darkMode'
  );

  if(dark === 'true'){

    document.body.classList.add(
      'dark'
    );
  }
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
/* MODAIS */
/* ========================= */

function abrirModal(){

  document.getElementById(
    'modal'
  ).classList.remove(
    'modal-hidden'
  );
}

function fecharModal(){

  document.getElementById(
    'modal'
  ).classList.add(
    'modal-hidden'
  );
}

function abrirUsuarioModal(){

  document.getElementById(
    'usuarioModal'
  ).classList.remove(
    'modal-hidden'
  );
}

function fecharUsuarioModal(){

  document.getElementById(
    'usuarioModal'
  ).classList.add(
    'modal-hidden'
  );
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

    showToast(
      'Preencha todos os campos'
    );

    return;
  }

  planejamentos.push({

    disciplina,
    turma,
    semana,
    conteudo,

    professor:
    usuarioAtual.nome,

    status:'Pendente'

  });

  salvarStorage();

  renderizarPlanejamentos();

  atualizarDashboard();

  renderizarCoordenacao();

  limparCampos();

  fecharModal();

  showToast(
    'Planejamento criado'
  );
}

function renderizarPlanejamentos(){

  const lista =
  document.getElementById(
    'listaPlanejamentos'
  );

  lista.innerHTML = '';

  planejamentos.forEach((p,index)=>{

    let badgeClass =
    'badge-warning';

    if(p.status === 'Aprovado'){

      badgeClass =
      'badge-success';
    }

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

          <span class="
            badge
            ${badgeClass}
          ">

            ${p.status}

          </span>

        </td>

        <td>
          ${p.professor}
        </td>

        <td>

          <button
          class="
            action-btn
            delete-btn
          "
          onclick="
            removerPlanejamento(${index})
          ">

            Excluir

          </button>

        </td>

      </tr>

    `;
  });
}

function removerPlanejamento(index){

  planejamentos.splice(index,1);

  salvarStorage();

  renderizarPlanejamentos();

  atualizarDashboard();

  renderizarCoordenacao();

  showToast(
    'Planejamento removido'
  );
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
/* DASHBOARD */
/* ========================= */

function atualizarDashboard(){

  const total =
  planejamentos.length;

  const aprovados =
  planejamentos.filter(p=>

    p.status === 'Aprovado'

  ).length;

  const pendentes =
  planejamentos.filter(p=>

    p.status === 'Pendente'

  ).length;

  document.getElementById(
    'totalPlanejamentos'
  ).innerText =
  total;

  document.getElementById(
    'totalAprovados'
  ).innerText =
  aprovados;

  document.getElementById(
    'totalPendentes'
  ).innerText =
  pendentes;

  let porcentagem = 0;

  if(total > 0){

    porcentagem =
    (aprovados / total) * 100;
  }

  document.getElementById(
    'progressFill'
  ).style.width =
  porcentagem + '%';
}

/* ========================= */
/* RELATÓRIOS */
/* ========================= */

function atualizarRelatorios(){

  const professores =
  usuarios.filter(u=>

    u.role === 'professor'

  ).length;

  const coords =
  usuarios.filter(u=>

    u.role === 'coordenador'

  ).length;

  document.getElementById(
    'relatorioProfessores'
  ).innerText =
  professores;

  document.getElementById(
    'relatorioCoords'
  ).innerText =
  coords;
}

/* ========================= */
/* COORDENAÇÃO */
/* ========================= */

function renderizarCoordenacao(){

  const lista =
  document.getElementById(
    'listaCoordenacao'
  );

  lista.innerHTML = '';

  planejamentos.forEach((p,index)=>{

    lista.innerHTML += `

      <div class="comentario">

        <strong>

          ${p.professor}

        </strong>

        <p style="
          margin-top:10px;
        ">

          ${p.disciplina}
          •
          ${p.turma}

        </p>

        <p style="
          margin-top:10px;
          color:#64748B;
        ">

          ${p.conteudo}

        </p>

        <button
        class="
          action-btn
          approve-btn
        "
        style="
          margin-top:16px;
        "
        onclick="
          aprovarPlanejamento(${index})
        ">

          Aprovar

        </button>

      </div>

    `;
  });
}

function aprovarPlanejamento(index){

  planejamentos[index].status =
  'Aprovado';

  salvarStorage();

  renderizarPlanejamentos();

  atualizarDashboard();

  renderizarCoordenacao();

  showToast(
    'Planejamento aprovado'
  );
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
    JSON.stringify(
      perfil
    )
  );

  const foto =
  document.getElementById(
    'perfilFoto'
  ).files[0];

  if(foto){

    const reader =
    new FileReader();

    reader.onload = e=>{

      localStorage.setItem(
        'perfilFoto',
        e.target.result
      );

      atualizarAvatar(
        e.target.result
      );
    };

    reader.readAsDataURL(
      foto
    );
  }

  showToast(
    'Perfil atualizado'
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

  const foto =
  localStorage.getItem(
    'perfilFoto'
  );

  if(foto){

    atualizarAvatar(foto);
  }
}

function atualizarAvatar(foto){

  document.getElementById(
    'avatarPreview'
  ).innerHTML = `

    <img src="${foto}">
  `;
}

/* ========================= */
/* USUÁRIOS */
/* ========================= */

function criarUsuario(){

  const nome =
  document.getElementById(
    'novoNome'
  ).value;

  const email =
  document.getElementById(
    'novoEmail'
  ).value;

  const role =
  document.getElementById(
    'novoPerfil'
  ).value;

  if(
    !nome ||
    !email
  ){

    showToast(
      'Preencha os campos'
    );

    return;
  }

  usuarios.push({

    nome,
    email,
    role,
    senha:'123456'

  });

  salvarStorage();

  renderizarUsuarios();

  atualizarRelatorios();

  fecharUsuarioModal();

  showToast(
    'Usuário criado'
  );
}

function renderizarUsuarios(){

  const lista =
  document.getElementById(
    'usuariosLista'
  );

  lista.innerHTML = '';

  usuarios.forEach((u,index)=>{

    lista.innerHTML += `

      <div class="usuario-card">

        <strong>
          ${u.nome}
        </strong>

        <p style="
          margin-top:10px;
        ">

          ${u.email}

        </p>

        <p style="
          margin-top:6px;
          color:#64748B;
        ">

          ${u.role}

        </p>

        <button
        class="
          action-btn
          delete-btn
        "
        style="
          margin-top:16px;
        "
        onclick="
          removerUsuario(${index})
        ">

          Remover

        </button>

      </div>

    `;
  });
}

function removerUsuario(index){

  usuarios.splice(index,1);

  salvarStorage();

  renderizarUsuarios();

  atualizarRelatorios();

  showToast(
    'Usuário removido'
  );
}

/* ========================= */
/* STORAGE */
/* ========================= */

function salvarStorage(){

  localStorage.setItem(
    'usuarios',
    JSON.stringify(
      usuarios
    )
  );

  localStorage.setItem(
    'planejamentos',
    JSON.stringify(
      planejamentos
    )
  );
}