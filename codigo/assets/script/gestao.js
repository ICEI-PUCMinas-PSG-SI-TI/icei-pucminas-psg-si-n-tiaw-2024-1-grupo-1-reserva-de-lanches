
// Estrutura dos pedidos:
// pedidos:  [ 
//   { id: 112232,
//     usuario: 171,
//     produtos: [
//                { id: 1, quantidade: 2, descricao: "xxxx", preco: xxx.xx },
//                { id: 3, quantidade: 1, descricao: "xxxx", preco: xxx.xx },
//                ... ],
//     valorTotal: xxx.xx,
//     data: xxxxxxxxxxxx, // TimeStamp da data do pedido
//     status: xxxx,
//   },
//   { ... },
//   { ... },
//   { ... }
//   ]

// Data atual representada em TimeStamp com horário de 23hr59m59s
let DATA_ATUAL = new Date();
DATA_ATUAL.setHours(23, 59, 59, 0);
DATA_ATUAL = DATA_ATUAL.getTime();

// Intervalo de 01 dia representado em TimeStamp
let UM_DIA = 86400000;

// Histório de pedidos;
let pedidos = [];

pedidos = JSON.parse(localStorage.getItem('pedidos'));

if (!pedidos) {
  pedidos = pedidos_mock;
  localStorage.setItem('dbProdutos', JSON.stringify(pedidos));
}

// Faturamento dos últimos 30 dias, que será calculado com base nos
// pedidos carregados do Local storage
// Índice 0 é a data atual, indice 1 é o dia anterior, ...
let faturamento = [];

// Datas dos últimos 30 dias
let datas = [];

// Array de Produtos mais vendidos
// Estrutura = { descricao, quantidade }
let mais_vendidos_7 = [];
let mais_vendidos_15 = [];
let mais_vendidos_30 = [];

// Gráfico de barras do faturamento
let grafico = {};

// Cores para as barras do gráfico
var barColors = [ "blue", "green", "orange", "red", "brown", "yellow", "gray",
                  "blue", "green", "orange", "red", "brown", "yellow", "gray",
                  "blue", "green", "orange", "red", "brown", "yellow", "gray",
                  "blue", "green", "orange", "red", "brown", "yellow", "gray",
                  "blue", "green" ];

function initPage() {
  CalcularDatasFaturamento();
  CalcularFaturamento();
  
  CalcularMaisVendidos( 7, mais_vendidos_7);
  CalcularMaisVendidos(15, mais_vendidos_15);
  CalcularMaisVendidos(30, mais_vendidos_30);
  
  AtualizarPedidos();
  AtualizarFaturamento(7);
  AtualizarMaisVendidos(mais_vendidos_7);
  
  loadChart(7);
  AdicionarEventos();
}

function CalcularDatasFaturamento() {
  for (let i = 0; i < 30; i++) {
    datas[i] = new Date(DATA_ATUAL - i*UM_DIA);
  }
}

function CalcularFaturamento() {
  // Inicializa as 30 posições do vetor de faturametno com zeros
  for (let i = 0; i < 30; i++) {
    faturamento[i] = 0;
  }

  for (let i = 0; i < pedidos.length; i++) {
    let p = pedidos[i];

    if (DATA_ATUAL >= p.data && p.status != "Cancelado") {
      let indice = Math.trunc((DATA_ATUAL - p.data) / UM_DIA);

      if (indice >= 0 && indice < 30)
      {
        faturamento[indice] += p.valorTotal;
      }
    }
  }
}

function CalcularMaisVendidos(dias, vetor) {
  let aux = [];

  for (let i = 0; i < pedidos.length; i++) {
    let data = pedidos[i].data;

    // Cria um objeto com as propriedades correspondendo à "descricao"
    // dos  produtos mais vendidos dos últimos "dias"
    if (data >= (DATA_ATUAL - dias*UM_DIA) && data <= DATA_ATUAL) {
      let prod = pedidos[i].produtos;

      for (let j = 0; j < prod.length; j++) {
        if (!aux[prod[j].descricao]) {
          aux[prod[j].descricao] = prod[j].quantidade;
        } else {
          aux[prod[j].descricao] += prod[j].quantidade;
        }
      }
    }
  }

  // Converte o objeto aux para um vetor (índices 0,1,2...) de objetos
  // do tipo com a estrutura { descricao: xxx, quantidade: xx }
  for(let p in aux) {
    vetor.push( { descricao: p, quantidade: aux[p] } );
  }
  // console.log(vetor);
  vetor.sort( (a, b) =>  b.quantidade - a.quantidade );
}

function AtualizarPedidos(tipo) {
  let div = document.querySelector('#pedidos');
  let strHTML = '';

  for (let i = 0; i < pedidos.length; i++) {
    let p = pedidos[i];
    let d = new Date(p.data);
    let pendentes = document.getElementById("pedidos-pendentes").checked;
    let andamento = document.getElementById("pedidos-em-andamento").checked
    
    if (p.status == 'Pendente' && pendentes) {
      strHTML += `<span class="text-pendente">` +
                `#${p.id.toString().substring(4)} ` +
                `${d.getDate().toString().padStart(2, '0')}/` +
                `${(d.getMonth()+1).toString().padStart(2, '0')}/` +
                `${d.getFullYear().toString().substring(2)}` + ' ' +
                `${d.getHours().toString().padStart(2, '0')}` + ':' +
                `${d.getMinutes().toString().padStart(2, '0')}` + ':' +
                `${d.getSeconds().toString().padStart(2, '0')}` +
                `</span>`;
    }
    
    if (p.status == 'Em andamento' && andamento) {
      strHTML += `<span class="text-em-andamento">` +
                 `#${p.id.toString().substring(4)} ` +
                 `${d.getDate().toString().padStart(2, '0')}/` +
                 `${(d.getMonth()+1).toString().padStart(2, '0')}/` +
                 `${d.getFullYear().toString().substring(2)}` + ' ' +
                 `${d.getHours().toString().padStart(2, '0')}` + ':' +
                 `${d.getMinutes().toString().padStart(2, '0')}` + ':' +
                 `${d.getSeconds().toString().padStart(2, '0')}` +
                 `</span>`;
    }
  }

  div.innerHTML = strHTML;
}

function AtualizarFaturamento(dias) {
  let div = document.querySelector('#faturamento');
  let strHTML = '';

  for (let i = 0; i < dias; i++) {
    let f = faturamento[i];
    let d = datas[i];

    strHTML += `<span>` +
              `${d.getDate().toString().padStart(2, '0')}/` +
              `${(d.getMonth()+1).toString().padStart(2, '0')}/` +
              `${d.getFullYear().toString().substring(2)}` + ' ' +
              `R$ ${FormatarPreco(faturamento[i])}` +
              `</span>`;
  }

  div.innerHTML = strHTML;
}

function FormatarPreco(preco) {
  let strPreco = preco.toString();

  if(strPreco.indexOf('.') != -1) {
    let centavos = 0;

    strPreco = strPreco.replace('.', ',');
    centavos = parseInt(strPreco.split(',')[1]);
    strPreco = strPreco.split(',')[0] + ',' + centavos.toString().padEnd(2, '0');
   } else {
    strPreco += ',00';
   }

  return strPreco;
}

function AtualizarMaisVendidos(vetor_dias) {
  let div = document.querySelector('#produtos');
  let strHTML = '';

  // Lista os 10 produtos mais vendidos armazenados em vetor_dias
  for (let i = 0; i < vetor_dias.length && i < 10; i++) {
    let descricao = vetor_dias[i].descricao;
    let quantidade = vetor_dias[i].quantidade;

    strHTML += `<span>` +
              `${quantidade.toString().padStart(2, '0')} und. ` +
              `${descricao.toString().padStart(2, '0')}` +
              `</span>`;
  }

  div.innerHTML = strHTML;
}

function loadChart(dias) {
  let xValues = [];
  let yValues = [];

  for (let i = 0; i < dias; i++) {
    yValues.push(faturamento[i]);
    xValues.push("" + datas[i].getDate() + "/" + (datas[i].getMonth() + 1));
  }

  grafico = new Chart("chart1", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors.slice(0, dias),
        data: yValues
      }]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: `Faturamento ${dias} dias`
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
      }
    }
  });
}

function AtualizarGrafico(dias) {
  let xValues = [];
  let yValues = [];
  let datSet = [];

  for (let i = 0; i < dias; i++) {
    yValues.push(faturamento[i]);
    xValues.push("" + datas[i].getDate() + "/" + (datas[i].getMonth() + 1));
  }

  grafico.data.labels = xValues;
  grafico.data.datasets[0].backgroundColor = barColors.slice(0, dias);
  grafico.data.datasets[0].data = yValues;
  grafico.options = {
    legend: { display: false },
    title: {
      display: true,
      text: `Faturamento ${dias} dias`
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    }
  }
  
  grafico.update();
}

function AdicionarEventos() {
  document.querySelector("#pedidos-pendentes").addEventListener('change',
    function() {
      AtualizarPedidos();
    }
  );
  document.querySelector("#pedidos-em-andamento").addEventListener('change',
    function() {
      AtualizarPedidos();
    }
  );

  document.querySelector("#faturamento-7-dias").addEventListener('change',
    function() {
      AtualizarFaturamento(7);
      AtualizarGrafico(7);
    }
  );

  document.querySelector("#faturamento-15-dias").addEventListener('change',
  function() {
    AtualizarFaturamento(15);
    AtualizarGrafico(15);
  }
  );

  document.querySelector("#faturamento-30-dias").addEventListener('change',
    function() {
      AtualizarFaturamento(30);
      AtualizarGrafico(30);
    }
  );

  document.querySelector("#produtos-7-dias").addEventListener('change',
    function() {
      AtualizarMaisVendidos(mais_vendidos_7);
    }
  );

  document.querySelector("#produtos-15-dias").addEventListener('change',
  function() {
    AtualizarMaisVendidos(mais_vendidos_15);
  }
  );

  document.querySelector("#produtos-30-dias").addEventListener('change',
    function() {
      AtualizarMaisVendidos(mais_vendidos_30);
    }
  );
}