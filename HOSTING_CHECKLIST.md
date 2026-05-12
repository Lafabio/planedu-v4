# Verificação de hospedagem (PlanEdu + Firebase)

## Diagnóstico rápido
O app está hospedado como página estática (`lafabio.github.io`) e usa Firebase Auth + Realtime Database diretamente no frontend.

Pelo código, a configuração base está correta (SDK carregado por HTTPS e `FIREBASE_CONFIG` preenchido).

## Ponto crítico provável
Se no celular aparece "Modo offline — dados locais" mesmo com internet, o problema tende a ser **configuração do projeto Firebase/Google Cloud**, não o HTML em si:

1. **Realtime Database Rules** podem estar bloqueando leitura/escrita para usuário anônimo.
2. **Authentication > Sign-in method > Anonymous** pode não estar habilitado no projeto.
3. **API key restrictions (HTTP referrer)** podem estar bloqueando requisições vindas do domínio de produção.
4. **Authorized domains** podem não incluir todos os domínios usados na produção.

## Checklist recomendado (produção)
1. Firebase Console → Authentication → Sign-in method → **Anonymous: Enabled**.
2. Firebase Console → Realtime Database → Rules: confirmar permissão coerente com `auth != null`.
3. Google Cloud Console → API Keys: verificar se a key do app permite o domínio:
   - `https://lafabio.github.io/*`
4. Firebase Authentication → Settings → Authorized domains:
   - `lafabio.github.io`
   - `localhost` (apenas dev)
5. Testar no celular em aba anônima para descartar cache antigo/service worker.

## Evidência no código
- `FIREBASE_CONFIG` está definido e o app usa RTDB + Auth anônimo.
- O fluxo depende de `signInAnonymously()` antes de leitura/escrita.
