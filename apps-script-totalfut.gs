/**
 * Recebe os formulários do site e grava cada um numa aba da planilha.
 *
 * Um único script atende os dois formulários: o campo "form" diz qual é.
 * Assim existe uma implantação só, uma URL só, e a planilha concentra tudo.
 *
 *   form=formadores  -> aba "Formadores"
 *   form=summit      -> aba "Summit — palestrantes" (+ foto no Drive)
 *
 * Como publicar:
 *   1. Abra a planilha que vai receber as respostas.
 *   2. Extensões → Apps Script. Apague o que estiver lá e cole este arquivo.
 *   3. Implantar → Nova implantação → tipo "App da Web".
 *        Executar como: Eu
 *        Quem pode acessar: Qualquer pessoa
 *   4. Autorize quando o Google pedir — ele vai pedir acesso ao Drive também,
 *      porque as fotos dos palestrantes são salvas lá.
 *   5. Copie a URL que termina em /exec e me mande.
 *
 * A URL é pública de propósito: é ela que os formulários chamam. Ela só
 * escreve — não devolve nada do que está na planilha nem do Drive.
 *
 * Ao editar este arquivo depois, lembre de implantar de novo (Implantar →
 * Gerenciar implantações → editar → Nova versão). Salvar não basta.
 */

var PASTA_FOTOS = 'TotalFut Summit — fotos dos palestrantes';

var FORMULARIOS = {
  formadores: {
    aba: 'Formadores',
    colunas: [
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
    ]
  },
  summit: {
    aba: 'Summit — palestrantes',
    colunas: [
      ['data',       'Data'],
      ['nome',       'Nome completo'],
      ['anuncio',    'Como anunciar'],
      ['funcao',     'Função'],
      ['clube',      'Clube ou instituição'],
      ['pais',       'País'],
      ['email',      'E-mail'],
      ['whatsapp',   'WhatsApp'],
      ['instagram',  'Instagram'],
      ['linkedin',   'LinkedIn'],
      ['tema',       'Tema da palestra'],
      ['resumo',     'Resumo do tema'],
      ['dia',        'Dia de preferência'],
      ['bio',        'Mini-bio'],
      ['obs',        'Observações'],
      ['fotoUrl',    'Foto'],
      ['origem',     'Página de origem']
    ]
  }
};

function doPost(e) {
  try {
    var campos = (e && e.parameter) ? e.parameter : {};
    var cfg = FORMULARIOS[campos.form];
    if (!cfg) return resposta_({ ok: false, erro: 'formulário desconhecido: ' + campos.form });

    // a foto chega em base64 num campo comum, porque o envio é form-urlencoded
    if (campos.fotoDados) {
      campos.fotoUrl = guardarFoto_(campos.fotoDados, campos.fotoTipo,
                                    campos.fotoNome, campos.nome);
    }

    var linha = cfg.colunas.map(function (c) {
      if (c[0] === 'data') return new Date();
      return String(campos[c[0]] || '').slice(0, 4000);
    });

    aba_(cfg).appendRow(linha);
    return resposta_({ ok: true });

  } catch (erro) {
    console.error(erro);          // fica no log de execuções, para investigar
    return resposta_({ ok: false, erro: String(erro) });
  }
}

/* Abrir a URL no navegador cai aqui: confirma que a implantação está no ar
   sem precisar enviar um formulário de verdade. */
function doGet() {
  return resposta_({ ok: true, aviso: 'Endpoint ativo. Use POST para enviar.' });
}

function aba_(cfg) {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var aba = doc.getSheetByName(cfg.aba);

  if (!aba) {
    aba = doc.insertSheet(cfg.aba);
    aba.appendRow(cfg.colunas.map(function (c) { return c[1]; }));
    aba.getRange(1, 1, 1, cfg.colunas.length).setFontWeight('bold');
    aba.setFrozenRows(1);
  }
  return aba;
}

function guardarFoto_(base64, tipo, nomeArquivo, pessoa) {
  var pasta = pasta_(PASTA_FOTOS);

  // o navegador manda "data:image/jpeg;base64,xxxx": só o depois da vírgula
  var corte = base64.indexOf(',');
  var puro = corte >= 0 ? base64.substring(corte + 1) : base64;

  var ext = (nomeArquivo || '').split('.').pop().toLowerCase();
  if (!ext || ext.length > 4) ext = (tipo === 'image/png') ? 'png' : 'jpg';

  var nome = (pessoa || 'palestrante').replace(/[\\/:*?"<>|]/g, '').trim();
  var carimbo = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyyMMdd-HHmmss');

  var blob = Utilities.newBlob(Utilities.base64Decode(puro),
                               tipo || 'image/jpeg',
                               nome + ' — ' + carimbo + '.' + ext);
  return pasta.createFile(blob).getUrl();
}

function pasta_(nome) {
  var achadas = DriveApp.getFoldersByName(nome);
  return achadas.hasNext() ? achadas.next() : DriveApp.createFolder(nome);
}

function resposta_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
