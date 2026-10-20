@echo off
rem Instala o ajudante "abrirpasta" para o Portal Ruhling.
rem Nao precisa de administrador. Rode uma vez em cada computador.
rem Deixe este arquivo na mesma pasta do abrirpasta.js

set "DEST=%LOCALAPPDATA%\Ruhling"
if not exist "%DEST%" mkdir "%DEST%"

copy /y "%~dp0abrirpasta.js" "%DEST%\abrirpasta.js" >nul
if errorlevel 1 (
  echo Nao foi possivel copiar o abrirpasta.js. Confira se ele esta na mesma pasta deste arquivo.
  pause
  exit /b 1
)

reg add "HKCU\Software\Classes\abrirpasta" /ve /d "URL:Abrir pasta Ruhling" /f >nul
reg add "HKCU\Software\Classes\abrirpasta" /v "URL Protocol" /d "" /f >nul
reg add "HKCU\Software\Classes\abrirpasta\shell\open\command" /ve /d "wscript.exe \"%DEST%\abrirpasta.js\" \"%%1\"" /f >nul

echo.
echo Instalado com sucesso. Feche e abra o navegador e teste o portal.
echo Para alterar os servidores permitidos, edite abrirpasta.js e rode este arquivo de novo.
pause
