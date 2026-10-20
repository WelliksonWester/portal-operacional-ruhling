// Ajudante do Portal Rühling: abre uma pasta de rede no Explorador de Arquivos.
// Chamado pelo navegador via link "abrirpasta:" (registrado pelo instalar-abrirpasta.bat).

// PREFIXOS PERMITIDOS: só caminhos que comecem com um destes serão abertos.
// Inclua aqui os servidores/unidades usados no portal.
var PERMITIDOS = [
  "\\\\sdominio\\",
  "\\\\servidor\\"
];

function permitido(p) {
  var baixo = p.toLowerCase();
  // bloqueia caracteres que poderiam alterar o comando
  if (/["&|<>^%]/.test(p)) return false;
  if (baixo.indexOf("..") !== -1) return false;
  for (var i = 0; i < PERMITIDOS.length; i++) {
    if (baixo.indexOf(PERMITIDOS[i].toLowerCase()) === 0) return true;
  }
  return false;
}

if (WScript.Arguments.length > 0) {
  var url = WScript.Arguments(0).replace(/^abrirpasta:/i, "");
  var caminho;
  try {
    caminho = decodeURIComponent(url);
  } catch (e) {
    WScript.Quit(1);
  }
  caminho = caminho.replace(/\//g, "\\");

  if (permitido(caminho)) {
    var sh = new ActiveXObject("WScript.Shell");
    sh.Run('explorer.exe "' + caminho + '"', 1, false);
  }
}
