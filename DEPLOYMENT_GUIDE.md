# 🚀 Solução: Deploy no Vercel - API Dinâmica

## ❌ O Problema
O erro **"Failed to fetch"** no Vercel ocorria porque o frontend estava com URLs hardcoded para `http://localhost:5000`, que não existe na internet.

## ✅ A Solução Implementada

### 1. Configuração de API Dinâmica
Criamos `src/utils/api.js` que usa variáveis de ambiente para definir a URL da API:

```js
// Usa VITE_API_URL do .env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
```

### 2. Componentes Atualizados
Todos os componentes agora usam a configuração centralizada:
- ✅ `LoginScreen.jsx` - Login/Registro
- ✅ `ProjectContext.jsx` - Projetos e Turmas  
- ✅ `ClassroomDetails.jsx` - Detalhes de Turmas

### 3. Arquivos de Ambiente

**`.env.local`** (Desenvolvimento - já criado)
```bash
VITE_API_URL=http://localhost:5000
```

**`.env.production`** (Produção - já criado)
```bash
# Altere para sua URL de backend
VITE_API_URL=https://seu-backend-url.com
```

---

## 🚀 Como Fazer Deploy no Vercel

### Opção A: Backend em Serviço Externo (Render, Railway, etc.)

1. **Deploy do Backend primeiro:**
   - Vercel → Novo Projeto → Backend
   - OU Render.com, Railway.app, Heroku, etc.
   - Copie a URL do backend (ex: `https://seu-backend.onrender.com`)

2. **Configure Variável de Ambiente no Vercel:**
   - Settings → Environment Variables
   - Nome: `VITE_API_URL`
   - Valor: `https://seu-backend.onrender.com`

3. **Deploy do Frontend:**
   - Git push para GitHub
   - Vercel detecta e faz deploy automático

### Opção B: Backend como Serverless Functions (Mais Fácil)

Se quiser colocar backend no próprio Vercel:

1. Crie `api/` na raiz:
```
/api/
  /auth/
    login.js
    register.js
  /projects/
    index.js
```

2. No Vercel, defina:
```bash
VITE_API_URL=/api
```

---

## 👥 Usuários de Teste

Criamos um script para gerar 2 usuários de teste:

### Executar Script de Seed

```bash
cd backend
npm run seed
```

Ou manualmente:

```bash
node seed.js
```

### Credenciais de Teste

**Professor:**
- 📧 Email: `professor@example.com`
- 🔐 Senha: `senha123`
- 👨‍🏫 Tipo: Professor

**Aluno:**
- 📧 Email: `aluno@example.com`
- 🔐 Senha: `senha123`
- 👨‍🎓 Tipo: Aluno

---

## 📋 Checklist Final

- [ ] Atualizar `.env.production` com URL real do backend
- [ ] Configurar variáveis de ambiente no Vercel
- [ ] Executar `npm run seed` no backend
- [ ] Fazer Git push (dispara deploy automático no Vercel)
- [ ] Testar login com usuários de teste
- [ ] Validar conexão com API

---

## 🔧 Arquivos Criados/Modificados

**Criados:**
- `src/utils/api.js` - Configuração centralizada
- `.env.local` - Desenvolvimento
- `.env.production` - Produção
- `backend/seed.js` - Script para criar usuários

**Modificados:**
- `src/components/LoginScreen.jsx`
- `src/context/ProjectContext.jsx`
- `src/components/ClassroomDetails.jsx`

---

## 🆘 Se Ainda Falhar

1. **Verificar Console do Navegador** (F12 → Console)
   - Qual URL está sendo chamada?
   - Qual erro exato?

2. **Verificar CORS no Backend** (`server.js`):
   ```js
   const io = new Server(httpServer, {
     cors: {
       origin: process.env.CORS_ORIGIN || 'http://localhost:5175',
       methods: ['GET', 'POST', 'PUT', 'DELETE']
     }
   })
   ```
   - Certifique-se que o CORS permite a URL do Vercel

3. **Testar API Diretamente:**
   ```bash
   curl https://seu-backend.com/api/health
   ```

---

## 📚 Próximas Etapas (Opcional)

1. Criar mais usuários de teste
2. Configurar avatares para usuários
3. Criar turmas de exemplo
4. Adicionar projetos pré-carregados
5. Implementar logs de erro melhorados

---

**✅ Pronto! Seu app agora está pronto para produção!** 🎉
