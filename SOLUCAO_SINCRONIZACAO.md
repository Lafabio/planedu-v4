# Solução para Problema de Senha em Computadores Diferentes

## Problema Identificado
O sistema atualmente usa `localStorage` para armazenar dados dos usuários, incluindo senhas. O `localStorage` é específico do navegador e dispositivo, então os dados salvos em um computador não estão disponíveis em outro.

## Soluções Implementadas

### 1. Exportar/Importar Backup (Já Existente - Funciona Imediatamente)
- **Exportar**: No painel de Manutenção, clique em "📥 Exportar backup" para baixar um arquivo JSON com todos os dados
- **Importar**: Em outro computador, clique em "📤 Importar backup" e selecione o arquivo JSON
- **Vantagem**: Funciona imediatamente, sem configuração
- **Desvantagem**: Requer ação manual do usuário

### 2. Sincronização com Google Drive (Nova Funcionalidade)
Adicionados botões no painel de Manutenção:
- **☁️ Google Drive**: Ativa a sincronização com sua conta Google
- **⬇️ Baixar do Drive**: Importa dados do Google Drive

#### Como Configurar o Google Drive:

1. **Criar Projeto no Google Cloud Console**:
   - Acesse https://console.cloud.google.com/
   - Crie um novo projeto (ex: "PlanEdu Sync")

2. **Ativar Google Drive API**:
   - No menu, vá em "APIs e Serviços" > "Biblioteca"
   - Pesquise por "Google Drive API" e ative

3. **Criar Credenciais OAuth 2.0**:
   - Vá em "APIs e Serviços" > "Credenciais"
   - Clique em "Criar Credenciais" > "ID do cliente OAuth"
   - Tipo de aplicativo: "Aplicação Web"
   - Origens JavaScript autorizadas: `http://localhost`, `http://seusite.com`
   - URIs de redirecionamento autorizados: `http://localhost/callback`, `http://seusite.com/callback`

4. **Atualizar o Código**:
   Substitua estas linhas no código (aproximadamente linha 1379-1380):
   ```javascript
   apiKey: 'AIzaSyDUMMY_KEY_FOR_DEMO',  // Coloque sua API Key
   clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',  // Coloque seu Client ID
   ```

5. **Habilitar Tela de Consentimento OAuth**:
   - Vá em "APIs e Serviços" > "Tela de permissão do OAuth"
   - Preencha as informações necessárias
   - Adicione escopo: `https://www.googleapis.com/auth/drive.file`

#### Como Usar:
1. No primeiro computador: Clique em "☁️ Google Drive", faça login e autorize
2. Os dados serão sincronizados automaticamente
3. No segundo computador: 
   - Abra o site
   - Clique em "⬇️ Baixar do Drive"
   - Faça login na mesma conta Google
   - Os dados serão importados

### 3. Sugestão Futura: Backend com Banco de Dados
Para uma solução definitiva, considere implementar:
- Backend com Node.js/Python/PHP
- Banco de dados (MySQL, PostgreSQL, MongoDB)
- Autenticação real com sessões
- Os dados ficariam centralizados e acessíveis de qualquer dispositivo

## Fluxo Recomendado Atualmente

### Para Usuários Sem Configuração Técnica:
Use a função de **Exportar/Importar Backup**:
1. No computador principal: Exporte o backup regularmente
2. Guarde o arquivo em um local seguro (pendrive, email, cloud pessoal)
3. No novo computador: Importe o backup

### Para Usuários Técnicos:
Configure o **Google Drive Sync** seguindo as instruções acima para sincronização automática.

## Observações Importantes
- ⚠️ A sincronização via Google Drive requer configuração prévia das credenciais
- ⚠️ Sempre faça backup antes de importar dados
- ⚠️ A importação sobrescreve os dados existentes
- ✅ As senhas são mantidas durante a exportação/importação
- ✅ O sistema de primeiro acesso e troca de senha continua funcionando normalmente

## Próximos Passos Sugeridos
1. Teste a funcionalidade de exportar/importar backup
2. Se desejar Google Drive, configure as credenciais no código
3. Considere migrar para um backend real para produção
