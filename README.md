# Bnei Noach Portal

Um portal moderno dedicado à comunidade Bnei Noach, com informações sobre as Sete Leis de Noé e recursos para estudos.

## 📋 Sobre o Projeto

Este projeto é um landing page responsiva criada com:
- **React** + **Vite**
- **CSS3** moderno com variáveis e Flexbox/Grid
- Deploy automático via **Cloudflare Pages** conectado ao repositório GitHub

## 🚀 Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/klausterra/bneinoach-portal.git
   ```

2. Acesse o diretório:
   ```bash
   cd bneinoach-portal
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Abra http://localhost:5173 no seu navegador

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos gerados ficarão no diretório `dist/`.

## ☁️ Deploy no Cloudflare Pages

1. Faça login no [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vá em **Workers & Pages** → **Create application** → **Pages**
3. Conecte seu repositório GitHub
4. Selecione o repositório `bneinoach-portal`
5. Configure as opções de build:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Salve e Cloudflare fará o deploy automático a cada push no branch principal

## 📝 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Créditos

- Ícones e ilustrações criados especialmente para este projeto
- Baseado nas tradições das Sete Leis de Noé