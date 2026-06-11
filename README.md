# 🍽️ Restaurante Sabor & Arte - Sistema de Reservas

Este é um projeto de um site institucional para o restaurante **Sabor & Arte**, focado em alta gastronomia. O sistema conta com uma interface atraente para os clientes explorarem o cardápio e realizarem reservas online, além de um painel administrativo exclusivo para o gerenciamento dessas reservas em tempo real.

O projeto está totalmente integrado a um backend em Node.js hospedado no **Render**.

---

## 🚀 Funcionalidades

### 🌐 Site do Cliente (`index.html`)
* **Design Responsivo & Elegante:** Totalmente adaptado para celulares, tablets e computadores.
* **Animações Fluidas:** Utilização da biblioteca AOS (Animação em Scroll) para uma navegação mais atraente.
* **Pop-up VIP:** Captura de leads (Nome, E-mail e WhatsApp) oferecendo cupom de desconto, com controle por `localStorage` (só aparece uma vez para o usuário).
* **Galeria de Fotos Interativa:** Sistema de Lightbox integrado para expandir as imagens do ambiente e navegar por setas.
* **Abas de Cardápio:** Filtro dinâmico de pratos por categorias (Entradas, Principais, Pizzas, Sobremesas, Bebidas) sem recarregar a página.
* **Formulário de Reserva Online:** Envio direto dos dados da reserva para a API no Render.
* **Botões Flutuantes:** Acesso rápido para pedidos via iFood/Rappi e contato direto via WhatsApp.

### 📋 Painel do Administrador (`admin.html`)
* **Controle de Abas:** Separação entre Reservas Ativas, Histórico de Finalizadas e Bloqueios de Agenda.
* **Métricas em Tempo Real:** Cards com o total de mesas ativas e a soma exata de clientes esperados.
* **Filtros Avançados:** Filtro por períodos rápidos (Hoje, Amanhã, Ver Todas), busca por calendário específico e barra de pesquisa por Nome, E-mail ou Telefone.
* **Gerenciamento de Status:** Botões dinâmicos para **Confirmar** (muda o status para verde) ou **Finalizar** (move a reserva para o histórico) as solicitações.
* **🚫 Bloqueio de Horários:** Ferramenta para fechar datas específicas ou horários parciais, impedindo novas reservas.

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** HTML5, CSS3 (Variáveis, Flexbox, Grid), JavaScript (ES6+, Fetch API).
* **Bibliotecas Externas:** 
  * [Font Awesome](https://fontawesome.com/) (Ícones)
  * [AOS - Animate On Scroll](https://michalsnik.github.io/aos/) (Animações)
* **Backend de Integração:** Node.js / Express (Hospedado no Render).
* **Banco de Dados:** MongoDB (Gerenciado via API).

---

## 🌐 Link do Servidor Backend

O front-end está configurado para consumir os serviços da API hospedada em:
`https://restaurante-pyg7.onrender.com`

---

## 💻 Como Executar o Projeto Localmente

1. Clone este repositório para o seu computador:
```bash
   git clone [https://github.com/FABHY/Restaurante.git](https://github.com/FABHY/Restaurante.git)
