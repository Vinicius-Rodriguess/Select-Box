# 📜 **Select Box**

O Select Box é um componente JavaScript altamente personalizável, projetado para criar menus suspensos dinâmicos com funcionalidades modernas. Ele permite fácil integração e instância múltipla em qualquer projeto web, fornecendo uma interface elegante e responsiva para seleção de opções.

---

## 🚀 **Funcionalidades**

- **Criação Dinâmica**: Instância múltipla do componente com diferentes configurações.
- **Pesquisa Integrada**: Campo de busca que permite filtrar opções em tempo real.
- **Posicionamento Inteligente**: Ajuste automático da posição do menu baseado na tela.
- **Estilo Personalizado**: Totalmente customizável com classes CSS específicas.
- **Opções Desabilitadas**: Possibilidade de desativar determinadas opções no menu.

---

## 🛠️ **Tecnologias Utilizadas**

- **HTML5**: Estruturação dos elementos do componente.
- **CSS3**: Estilização do menu e comportamento responsivo.
- **JavaScript (ES6+)**: Lógica para controle de eventos, animações e gerenciamento de estado.

---

## 🔧 **Como Executar o Projeto**

<a href="https://vinicius-rodriguess.github.io/Select-Box/" target="_blank">Clique aqui para testar o projeto!</a>

<img src="./src/img/selectBox.png"/>

Ou então:

1. **Clone este Repositório**:

```bash
    git clone https://github.com/Vinicius-Rodriguess/Select-Box.git
    cd box-shadow-generator
   ```

2. **Abra o arquivo** `index.html` **em seu navegador** para visualizar o componente em ação.

---

## 🖥️ **Exemplo de Uso**

1. **Configuração Básica**: Adicione um contêiner `<div>` no HTML e instancie o Select Box em seu arquivo JavaScript.
2. **Configuração Avançada**: Personalize o comportamento e as opções através de um objeto de configuração.

Exemplo de Instância:
```
const config = {
    name: "Escolha uma opção",
    options: ["Opção 1", "Opção 2", "Opção 3", { text: "Opção 4", disable: true }],
    inputSearch: true,
};

const selectBox = new SelectBox(document.querySelector("#seletor"), config);
```
---

## ✅ **Melhorias Futuras**

- Implementar suporte para múltiplas seleções.
- Adicionar animações mais avançadas.
- Permitir carregamento de dados dinâmicos via API.
- Criar temas visuais pré-definidos.

---

## 👨‍💻 **Autor**

**Vinicius Rodrigues**

- GitHub: [Vinicius-Rodriguess](https://github.com/Vinicius-Rodriguess)
- Email: rodrigues.vini.2004@gmail.com
