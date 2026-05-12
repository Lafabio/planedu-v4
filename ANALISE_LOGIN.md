# Análise de login (professor/coordenador)

## Erros críticos encontrados

1. **Busca de perfil na restauração de sessão usa chave não sanitizada**
   - No `DOMContentLoaded`, a leitura é feita em `usuarios/'+sessao.usuario`.
   - Em todo o restante da app, usuários com caracteres especiais (`@`, `.` etc.) são gravados com `_sanitizeKey(...)`.
   - Resultado: sessão pode quebrar/invalidar para usuários cujo `usuario` veio de e-mail, gerando comportamento de “não loga / cai para tela inicial”.

2. **Autenticação anônima falha de forma silenciosa**
   - `ensureAuth()` captura erro de `signInAnonymously()` e apenas faz `console.warn`, sem interromper o fluxo.
   - Depois disso, `fazerLogin()` continua lendo RTDB (`usuarios/`, `senhas/`). Se as regras do Firebase exigirem usuário autenticado, as leituras falham e o login quebra para professor/coordenador.

3. **Inconsistência de chave de usuário entre gravação e leitura em pontos do app**
   - Há trechos que usam `_sanitizeKey(usuario)` para escrever (`seed` e senha), e outros que leem sem sanitizar.
   - Essa mistura causa “usuário não encontrado”/“senha incorreta” quando o `usuario` possui caracteres não permitidos em chave RTDB.

## Pontos de código onde isso aparece

- Sanitização central: `_sanitizeKey`.
- Login principal: `fazerLogin()`.
- Inicialização/sessão: `DOMContentLoaded` (leitura de `usuarios/'+sessao.usuario`).
- Seed coordenador: grava em `usuarios/'+_sanitizeKey(COORDENADOR_SEED.usuario)`.

## Impacto observado

- Coordenador/professor podem falhar no login dependendo do formato do `usuario` e do estado da autenticação anônima.
- Erros ficam mascarados na UI (ex.: mensagem genérica), dificultando diagnóstico.
