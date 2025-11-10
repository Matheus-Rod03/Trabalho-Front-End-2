# 💻 Desafio — Desenvolvimento Front-end II

Este projeto implementa um pequeno fluxo de formulário com confirmação e armazenamento local simulado via download de arquivo JSON.

---

## 📂 Estrutura de Arquivos

```
├── index.html
├── form.html
├── confirmation.html
├── style.css
├── script.js
└── data.json (exemplo de saída)
```

---

## 🚀 Fluxo de Funcionamento

1. **Início:**  
   Abra o arquivo **`form.html`** no navegador.

2. **Preenchimento:**  
   Complete os campos obrigatórios do formulário e clique em **Enviar**.

3. **Confirmação:**  
   Você será redirecionado para **`confirmation.html`**, onde poderá revisar os dados.

4. **Finalização:**  
   Ao confirmar, o sistema:
   - Gera e faz o **download automático** de um arquivo `data.json` contendo as informações inseridas.
   - Em seguida, **redireciona** o usuário de volta para **`index.html`**.

---

## 🧠 Tecnologias Utilizadas

- **HTML5** — estrutura das páginas  
- **CSS3** — estilização responsiva  
- **JavaScript (ES6+)** — validação, manipulação de DOM e fluxo de navegação  
- **JSON** — formato de exportação dos dados

---
