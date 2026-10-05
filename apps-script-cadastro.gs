/**
 * Recebe o cadastro de formadores e grava uma linha na planilha.
 *
 * Como publicar:
 *   1. Abra a planilha que vai receber os cadastros.
 *   2. Extensões → Apps Script. Apague o que estiver lá e cole este arquivo.
 *   3. Implantar → Nova implantação → tipo "App da Web".
 *        Executar como: Eu
 *        Quem pode acessar: Qualquer pessoa
 *   4. Autorize quando o Google pedir e copie a URL que termina em /exec.
 *
 * A URL é pública de propósito: é ela que o formulário chama. Ela só aceita
 * escrita — não devolve nada do que está na planilha.
 */

/* Ordem das colunas. Mexer aqui muda a planilha; os nomes precisam bater
   com o atributo name de cada campo do formulário. */
var COLUNAS = [
  ['data',     'Data'],
  ['nome',     'Nome'],
  ['email',    'E-mail'],
  ['whatsapp', 'WhatsApp'],
  ['local',    'Cidade e país'],
  ['clube',    'Clube ou instituição'],
  ['funcao',   'Função'],
  ['area',     'Área de atuação'],
  ['link',     'Link'],
  ['proposta', 'O que propõe'],
  ['origem',   'Página de origem']
];

function doPost(e) {
  try {
    var aba = planilha_();
    var campos = (e && e.parameter) ? e.parameter : {};

    var linha = COLUNAS.map(function (c) {
      if (c[0] === 'data') return new Date();
      return String(campos[c[0]] || '').slice(0, 2000);
    });

    aba.appendRow(linha);
    return resposta_({ ok: true });

  } catch (erro) {
    // registra no log de execuções do Apps Script para dar o que investigar
    console.error(erro);
    return resposta_({ ok: false, erro: String(erro) });
  }
}

/* Abrir a URL no navegador cai aqui: serve para conferir que a implantação
   está no ar sem precisar enviar o formulário. */
function doGet() {
  return resposta_({ ok: true, aviso: 'Endpoint ativo. Use POST para enviar.' });
}

function planilha_() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var aba = doc.getSheetByName('Cadastros');

  if (!aba) {
    aba = doc.insertSheet('Cadastros');
    aba.appendRow(COLUNAS.map(function (c) { return c[1]; }));
    aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold');
    aba.setFrozenRows(1);
  }
  return aba;
}

function resposta_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
