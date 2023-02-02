// Data e Hora no Javascript


// Função para formatar datas no formato dd/mm/yyyy hh:mm:ss
function FormatarDataHora(date) {
    return (
        date.getDate().toString().padStart(2, '0') +
        '/' +
        (date.getMonth()+1).toString().padStart(2, '0') +
        '/' +
        date.getFullYear() +
        ' ' +
        date.getHours().toString().padStart(2, '0') +
        ':' +
        date.getMinutes().toString().padStart(2, '0') +
        ':' +
        date.getSeconds().toString().padStart(2, '0')
    )
}

// string de data 
var createdAt = "2022-08-03 03:47:44.922";
FormatarDataHora(new Date(createdAt)); // 03/08/2022 03:47:44

// data e hora atual
FormatarDataHora(new Date()); // 01/02/2023 23:25:04

// date e hora especifica
// jan = 0
// dez = 11
FormatarDataHora(new Date(2023, 01, 01, 23, 25, 04)); // 01/02/2023 23:25:04


// Função para converter segundos em tempo hh:mm:ss
function ConverterSegundosParaHHMMSS(time) {
    let hh = Math.floor(time / 3600);
    let mm = Math.floor((time % 3600) / 60);
    let ss = Math.floor((time % 3600) % 60);
    hh = hh.toString().padStart(2, '0');
    mm = mm.toString().padStart(2, '0');
    ss = ss.toString().padStart(2, '0');
    return hh+':'+mm+':'+ss;
}

ConverterSegundosParaHHMMSS(0); // 00:00:00
ConverterSegundosParaHHMMSS(61); // 00:01:01
ConverterSegundosParaHHMMSS(3601); // 01:00:01
ConverterSegundosParaHHMMSS(100000); // 27:46:40
