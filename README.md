# Cardápio Online de Restaurante

Este é um projeto de uma aplicação web desenvolvida para um restaurante, permitindo aos clientes visualizar o cardápio online e entrar em contato diretamente pelo WhatsApp.

## Tecnologias Utilizadas
* HTML
* JavaScript
* CSS com Tailwind CSS

## Funcionalidades
* Exibição do cardápio do restaurante.
* Navegação simples e intuitiva.
* Integração com o WhatsApp para facilitar pedidos e reservas.

## Como Utilizar
1. Clone o repositório:
    <div>
        <pre>
            <code id="clone-command">git clone https://github.com/lipex5k/cardapio-online.git</code>
        </pre>
        <button onclick="copyToClipboard('#clone-command')">Copiar código</button>
    </div>

2. Navegue até o diretório do projeto:
    <div>
        <pre>
            <code id="cd-command">cd cardapio-online</code>
        </pre>
        <button onclick="copyToClipboard('#cd-command')">Copiar código</button>
    </div>

3. Abra o arquivo `index.html` no seu navegador para visualizar o cardápio.

## Contribuidores
- [lipex5k](https://github.com/lipex5k)
- [sujeitoProgramador](https://github.com/sujeitoProgramador)

<script>
function copyToClipboard(element) {
  var temp = document.createElement("textarea");
  document.body.appendChild(temp);
  temp.value = document.querySelector(element).textContent;
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Código copiado!");
}
</script>
