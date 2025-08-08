
<h1 align="center">🚀 Study Streak</h1>

<p align="center">
  Aplicativo pessoal para explorar do desenvolvimento front-end, utilizando <strong>React Native</strong> e <strong>Expo</strong>.
</p>

<p align="center">
  <img alt="Status do Projeto" src="https://img.shields.io/badge/status-em%20construção-yellow" />
  <img alt="React Native" src="https://img.shields.io/badge/React%20Native-0.79.5-blue" />
  <img alt="Expo" src="https://img.shields.io/badge/Expo-~53.0.20-brightgreen" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-~5.8.3-blueviolet" />
</p>

---

## 📚 Sobre o Projeto

O **Stack Streak** é um projeto pessoal que nasceu da curiosidade em explorar como agentes de IA podem auxiliar e otimizar o desenvolvimento de aplicações. A ideia é criar uma plataforma de estudos funcional, construída com tecnologias modernas, enquanto testo os limites da automação e da assistência por IA no ciclo de desenvolvimento.

Desenvolvido com **React Native + Expo**, o projeto visa entregar uma experiência de alta performance e multiplataforma, funcionando de forma nativa em **iOS**, **Android** e também na **Web**.

---

## 🚀 Primeiros Passos

1. **Configure as Variáveis de Ambiente**

   Este projeto utiliza o Supabase como backend e precisa de chaves de API para se conectar.

   - Crie um arquivo chamado `.env` na raiz do projeto.
   - Adicione as seguintes variáveis, substituindo pelos valores do seu projeto no Supabase:

     ```env
     EXPO_PUBLIC_SUPABASE_URL="https://your-project-url.supabase.co"
     EXPO_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
     ```

   > [!IMPORTANT]
   > O prefixo `EXPO_PUBLIC_` é necessário para que as variáveis fiquem acessíveis no lado do cliente com o Expo.

2. **Instale as dependências**

   > [!NOTE]
   > Este projeto utiliza `npm` como gerenciador de pacotes.

   ```bash
   npm install
   ```

3. **Execute o projeto**

   Após criar ou modificar o arquivo `.env`, é crucial reiniciar o servidor limpando o cache para que as novas variáveis sejam carregadas.

   ```bash
   npm start -- -c  # Inicia o servidor Expo e limpa o cache
   ```

4. **Outros Comandos**

   ```bash
   npm run reset-project # Limpa o cache e reinstala os módulos
   npm run lint
   ```

---

## 📁 Estrutura de Pastas

A estrutura de pastas do projeto foi organizada para manter o código modular e de fácil manutenção.

```
.
├── app/              # 📂 Rotas e telas gerenciadas pelo Expo Router
├── assets/           # 🖼️ Imagens, fontes e outros arquivos estáticos
├── components/       # 🧩 Componentes reutilizáveis da aplicação
├── constants/        # 🎨 Cores, estilos e outras constantes globais
├── hooks/            # 🎣 Hooks customizados do React
├── lib/              # 🛠️ Funções utilitárias e clientes de API (ex: Supabase)
└── scripts/          # 📜 Scripts de automação para o projeto
```

---

## 🧩 Principais Dependências

- **React Native**: `0.79.5`
- **React**: `19.0.0`
- **Expo**: `~53.0.20`
- **Expo Router**: `~5.1.4`
- **Supabase**: `^2.50.0`

📦 **Outras bibliotecas importantes:**

- `@expo/vector-icons`
- `react-native-paper`
- `react-native-calendars`
- `lottie-react-native`
- `react-native-webview`

> Para a lista completa, consulte o arquivo `package.json`.

---

## 🛠️ Ferramentas de Desenvolvimento

- **TypeScript**: `~5.8.3`
- **ESLint**: `^9.25.0`
- **Babel**: `@babel/core ^7.25.2`

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo:

> [!TIP]
> Para diretrizes mais detalhadas, incluindo nossas convenções de commit, consulte o nosso [**Guia de Contribuição**](CONTRIBUTING.md).

1. Fork este repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Faça o commit das suas alterações (`git commit -m 'feat: Adiciona nova funcionalidade'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## 📄 Licença

Este projeto é privado (`"private": true`). Para colaborações ou uso do código, por favor, entre em contato.

---

## 📬 Contato

Conecte-se comigo:

🔗 [Linktree – Kadu Ribeiro](https://linktr.ee/KaduSR)

---

<p align="center">
  Desenvolvido com 💡 e ☕ por <strong>Kadu Ribeiro</strong>
</p>
