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
}

function logout(){

  location.reload();
}