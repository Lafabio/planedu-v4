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

let usuarioAtual = null;

let planejamentos = JSON.parse(
  localStorage.getItem(
    'planejamentos'
  )
) || [];

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

  carregarPerfil();

  renderizarPlanejamentos();

  renderizarUsuarios();

  atualizarDashboard();

  renderizarCoordenacao();
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

    professor:
    usuarioAtual.nome,

    status:'Pendente'

  });

  salvarPlanejamentos();

  renderizarPlanejamentos();

  atualizarDashboard();

  renderizarCoordenacao();

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

  salvarPlanejamentos();

  renderizarPlanejamentos();

  atualizarDashboard();

  renderizarCoordenacao();
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

function salvarPlanejamentos(){

  localStorage.setItem(
    'planejamentos',
    JSON.stringify(
      planejamentos
    )
  );
}

/* ========================= */
/* DASHBOARD */
/* ========================= */

function atualizarDashboard(){

  document.getElementById(
    'totalPlanejamentos'
  ).innerText =
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
    'totalAprovados'
  ).innerText =
  aprovados;

  document.getElementById(
    'totalPendentes'
  ).innerText =
  pendentes;
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

  salvarPlanejamentos();

  renderizarPlanejamentos();

  atualizarDashboard();

  renderizarCoordenacao();
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

    alert(
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

  salvarUsuarios();

  renderizarUsuarios();

  fecharUsuarioModal();
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

  salvarUsuarios();

  renderizarUsuarios();
}

function salvarUsuarios(){

  localStorage.setItem(
    'usuarios',
    JSON.stringify(
      usuarios
    )
  );
}