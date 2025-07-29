# ArqPronto

<div align="center">
  <img src="./public/logo.png" alt="ArqPronto Logo" width="200"/>
  <p><em>Projeto de arquitetura e design de interiores</em></p>
</div>

## 📋 Descrição

Este é um sistema web para catálogo de projetos arquitetônicos, permitindo visualização, filtros e contato direto via WhatsApp.

## 🖼️ Screenshots

<!-- Para adicionar screenshots do projeto, coloque as imagens na pasta public/screenshots/ e referencie assim: -->
<!-- ![Tela Principal](./public/screenshots/home.png) -->
<!-- ![Catálogo](./public/screenshots/catalogo.png) -->
<!-- ![Detalhes do Projeto](./public/screenshots/detalhes.png) -->

## 🚀 Tecnologias Utilizadas

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Backend:** Supabase
- **Runtime:** Node.js

## 📁 Estrutura do Projeto

```
ArqPronto/
├── src/                 # Código fonte da aplicação frontend
├── api/                 # API backend
├── admin/               # Painel administrativo
├── database/            # Scripts e esquemas do banco de dados
├── docs/                # Documentação do projeto
├── public/              # Arquivos estáticos (imagens, ícones)
│   ├── logo.png         # Logo do projeto
│   ├── logo.svg         # Logo em formato vetorial
│   └── screenshots/     # Screenshots da aplicação (criar esta pasta)
└── README.md            # Este arquivo
```

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/Marcos934/ArqPronto.git

# Entre no diretório
cd ArqPronto

# Instale as dependências
npm install

# Execute o projeto em modo de desenvolvimento
npm run dev
```

## 🌐 Deploy

O projeto está configurado para deploy automático no Netlify.

## 📸 Como Adicionar Imagens ao README

Para adicionar imagens que apareçam corretamente no GitHub:

### 1. **Imagens Locais (Recomendado)**
```markdown
![Descrição da Imagem](./public/screenshots/nome-da-imagem.png)
```

### 2. **Imagens com Dimensões Específicas**
```html
<img src="./public/screenshots/nome-da-imagem.png" alt="Descrição" width="600"/>
```

### 3. **Galeria de Imagens**
```html
<div align="center">
  <img src="./public/screenshots/img1.png" width="45%"/>
  <img src="./public/screenshots/img2.png" width="45%"/>
</div>
```

### 📝 Dicas Importantes:
- Coloque as imagens na pasta `public/screenshots/`
- Use formatos `.png`, `.jpg` ou `.gif`
- Mantenha tamanhos de arquivo pequenos (< 1MB)
- Use nomes descritivos para as imagens
- Sempre adicione texto alternativo (`alt`)

---

<div align="center">
  <p>Desenvolvido com ❤️ por <a href="https://github.com/Marcos934">Marcos Vinicius Mulinari</a></p>
</div>