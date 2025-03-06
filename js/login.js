
$(document).ready(function() {
    $('#cadastroLink').click(function() {
      setTimeout(() => {
        $('#titulo').text('Se cadastre');
      },1000)
    });

    $('#btn').click(() => {
        window.location.href = 'index.html';
    });

    if (localStorage.getItem('darkMode') === 'true') {
        $('body').addClass('darkmode');
        $('form').addClass('darkmode');
        $('label').addClass('darkmode');
        $('input').addClass('darkmode'); 
        $('button').addClass('darkmode');
        $('i').addClass('darkmode'); 
        $('h1').addClass('darkmode'); 
        $('span').addClass('darkmode'); 


        $('#darkmode').text('Modo Claro');
      }
    
      // Alternar entre modo escuro e claro
      $('#darkmode').click(function() {
        $('body').toggleClass('darkmode'); // Alterna a classe dark-mode
        $('form').toggleClass('darkmode'); // Alterna a classe dark-mode
        $('label').toggleClass('darkmode'); // Alterna a classe dark-mode
        $('input').toggleClass('darkmode'); // Alterna a classe dark-mode    
        $('button').toggleClass('darkmode'); // Alterna a classe dark-mode
        $('i').toggleClass('darkmode'); // Alterna a classe dark-mode
        $('h1').toggleClass('darkmode'); // Alterna a classe dark-mode
        $('span').toggleClass('darkmode'); // Alterna a classe dark-mode

    
        // Atualiza o texto do botão
        if ($('body').hasClass('darkmode')) {
          $('#darkmode').text('Modo Claro');
          
          localStorage.setItem('darkMode', 'true'); // Salva o estado do modo escuro
        } else {
          $('#darkmode').text('Modo Escuro');
          localStorage.setItem('darkMode', 'false'); // Salva o estado do modo claro
        }
      });
});