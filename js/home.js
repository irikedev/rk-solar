$(document).ready(function () {
    var totalWatts = 0; // Armazena o total de watts dos itens selecionados

    // Mapeamento dos valores de potência para cada tipo de eletrodoméstico
    var watts = {
        "geladeira": ["100W", "400W"],
        "microondas": ["600W", "1200W"],
        "lava e seca": ["300W", "1500W"],
        "televisao": ["50W", "400W"],
        "arcondicionado": ["800W", "3000W"],
        "ventilador": ["30W", "100W"],
        "liquidificador": ["300W", "1500W"],
        "cafeteira": ["400W", "1500W"],
        "batedeira": ["150W", "1000W"],
        "secador": ["1000W", "2500W"],
    };

    // Para cada card, identifica o eletrodoméstico e altera os botões
    $(".card").each(function () {
        var tipo = $(this).find("h4").text().trim().toLowerCase();

        if (watts[tipo]) {
            var buttons = watts[tipo];
            $(this).find(".buttons button:nth-child(1)").text(buttons[0]);
            $(this).find(".buttons button:nth-child(2)").text(buttons[1]);
        }
    });

    // Quando um botão de watts for clicado
    $(".buttons button").click(function () {
        let wattsValue = parseInt($(this).text().replace('W', '').trim());
        totalWatts += wattsValue;
        $("#wats").text(totalWatts);
    });

    // Quando o botão "adicionar item" for clicado
    $(".additem button").click(function () {
        let inputValue = $(this).prev('input').val();
        if ($.isNumeric(inputValue) && inputValue > 0) {
            let selectedWatts = $(this).parent().prev().find("button").first().text();
            let wattsValue = parseInt(selectedWatts.replace('W', '').trim());
            totalWatts += wattsValue * parseInt(inputValue);
            $("#wats").text(totalWatts);
        } else {
            alert("Por favor, insira um número válido de itens.");
        }
    });

    // Cálculo de consumo total (em kWh) baseado nas horas de uso
    $("#calcularHoras").click(function () {
        let horas = $("#horasInput").val();
        if ($.isNumeric(horas) && horas > 0) {
            let consumoKwh = (totalWatts / 1000) * horas;
            $("#consumoTotal").text(consumoKwh.toFixed(2));
            console.log(`Consumo total em kWh: ${consumoKwh.toFixed(2)}`);
        } else {
            alert("Por favor, insira um número válido de horas.");
        }
    });

    // Para debug: Exibe o consumo no console
    console.log("Consumo total em kWh: ", totalWatts);

    // Lógica para selecionar dias no calendário
    let diasSelecionados = new Set();

    $(".calendario button").click(function () {
        let id = $(this).attr("id");

        if (diasSelecionados.has(id)) {
            diasSelecionados.delete(id);
            $(this).removeClass("bg-transparente");
        } else {
            diasSelecionados.add(id);
            $(this).addClass("bg-transparente");
        }

        calcularHoras();
    });

    $("#horasUso").on("input", function () {
        calcularHoras();
    });

    function calcularHoras() {
        let horas = parseInt($("#horasUso").val()) || 0;
        let dias = diasSelecionados.size;
        let totalHoras = horas * dias;
        let consumoFinal = (totalWatts / 1000) * totalHoras; // Cálculo final do consumo total

        console.log(`Total de horas: ${totalHoras}`);
        console.log(`Consumo final (kWh) considerando os dias selecionados: ${consumoFinal.toFixed(2)}`);
    }

    // Animações de carregamento e transição
    $('.time').hide();
    $('.loader').hide();
    $('.cardsSolar').hide();
    $('.carrinho').hide();
    
    let etapa = 0; // Controla a etapa atual
    
    $('#continuar').click(() => {
        $('.loader').show(); // Exibe o loader antes da transição
    
        setTimeout(() => {
            $('.loader').hide(); // Esconde o loader rapidamente após um curto tempo
    
            if (etapa === 0) {
                $('.cards').hide();
                $('.header h3').hide();
                $('.potenciometro').hide();
                $('.time').show();
                etapa++;
            } else if (etapa === 1) {
                $('.time').hide();
                $('.cardsSolar').show();
                $('#continuar').text("Finalizar");
                $('.carrinho').show()
                etapa++;
            }
        }, 500); // Tempo de exibição do loader (0.3s)
    });
    const divProdutos = $(".carrinho .produtos");
    let produtosSelecionados = [];

    $(".cardsSolar .card button").on("click", function () {
        let card = $(this).closest(".card");
        let nome = card.find("p").text().trim();
        let imagemSrc = card.find("img").attr("src");
        let valorTexto = card.find("h4#preco").text().trim().replace("R$ ", "").replace(",", "");
        let valor = parseFloat(valorTexto) || 0;

        let produtoExistente = produtosSelecionados.find(p => p.nome === nome);

        if (produtoExistente) {
            produtoExistente.quantidade += 1;
            produtoExistente.total = produtoExistente.valor * produtoExistente.quantidade;
        } else {
            produtosSelecionados.push({
                nome: nome,
                imagem: imagemSrc,
                valor: valor,
                quantidade: 1,
                total: valor
            });
        }

        atualizarCarrinho();
    });

    function atualizarCarrinho() {
        divProdutos.empty();
        produtosSelecionados.forEach(produto => {
            let div = $("<div class='produtoItem'>");
            div.html(`
                <img src="${produto.imagem}" alt="${produto.nome}" width="50">
                <p>${produto.nome}</p>
                <p>qnt: ${produto.quantidade}</p>
                <p>Total: R$ ${produto.total.toFixed(2)}</p>
                
            `);
            divProdutos.append(div);
        });
    }
    $('#logoBtn').click(() => {
        $('.carrinho .produtos').toggleClass('flex');
    })
});
