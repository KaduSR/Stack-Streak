# Como Contribuir para o Study Streak

Ficamos muito felizes com seu interesse em contribuir para o **Study Streak**! Toda ajuda é bem-vinda. Para garantir que o processo seja claro e eficiente para todos, por favor, siga estas diretrizes.

## 📜 Código de Conduta

Para garantir um ambiente aberto e acolhedor, esperamos que todos os contribuidores sigam um código de conduta. Por favor, seja respeitoso e construtivo em todas as suas interações.

## 🚀 Processo de Contribuição

1.  **Faça um Fork** do repositório para sua conta no GitHub.
2.  **Crie uma Branch** a partir da `main` para suas modificações (`git checkout -b feature/sua-feature-incrivel`).
3.  **Desenvolva** suas alterações na sua branch.
4.  **Verifique o Código**: Antes de commitar, certifique-se de que o código segue os padrões do projeto executando o linter:
    ```bash
    npm lint
    ```
5.  **Faça o Commit** das suas alterações seguindo as nossas convenções de commit (veja abaixo).
6.  **Envie (Push)** suas alterações para o seu fork (`git push origin feature/sua-feature-incrivel`).
7.  **Abra um Pull Request** para o repositório original. Descreva claramente as mudanças que você fez e por quê.

## 📝 Convenção de Commits

Este projeto utiliza a especificação Conventional Commits. Isso nos ajuda a manter um histórico de commits legível e a automatizar a geração de changelogs.

Seu commit deve seguir o formato:

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit

-   **feat**: Uma nova funcionalidade (feature).
-   **fix**: Uma correção de bug.
-   **docs**: Alterações apenas na documentação.
-   **style**: Alterações que não afetam o significado do código (espaços em branco, formatação, ponto e vírgula, etc).
-   **refactor**: Uma alteração de código que não corrige um bug nem adiciona uma funcionalidade.
-   **perf**: Uma alteração de código que melhora o desempenho.
-   **test**: Adicionando testes ou corrigindo testes existentes.
-   **chore**: Alterações no processo de build ou em ferramentas auxiliares e bibliotecas, como geração de documentação.

### Exemplos

```bash
# Exemplo de nova funcionalidade
git commit -m "feat: Adiciona login com Google"

# Exemplo de correção de bug com escopo
git commit -m "fix(auth): Corrige redirecionamento após logout"

# Exemplo com corpo explicando a alteração
git commit -m "refactor: Simplifica lógica do componente de calendário

O estado do componente foi refatorado para usar o hook useReducer,
melhorando a previsibilidade e facilitando a manutenção."
```