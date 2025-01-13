async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    document.getElementById("command").value = text;
  } catch (error) {
    alert(
      "Error al acceder al portapapeles. Asegúrate de que tienes permiso para usarlo."
    );
    console.error("Error al pegar:", error);
  }
}

document.getElementById("run").addEventListener("click", function runCommand() {
  const url = document.getElementById("command").value;
  if (!url) {
    return alert("Por favor ingresa un comando.");
  }
  document.getElementById("controls").style.display = "none";
  document.getElementById("notification").style.display = "flex";
  document.getElementById("noti").innerHTML = "DESCARGANDO ... ";

  const isPlaylistChecked = document.getElementById("playlistCheckbox").checked;
  const isVideoChecked = document.getElementById("videoCheckbox").checked;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Limpiar resultados previos
  let ytCommand = isVideoChecked ? `yt-dlp -f "bestvideo[height<=720]+bestaudio/best[height<=720]" --merge-output-format mp4 -o "~/storage/downloads/videos/%(title)s.%(ext)s" ${url}` : `yt-dlp --progress -x --rm --audio-format mp3 --audio-quality 0 --embed-thumbnail --add-metadata --ignore-errors -o "~/storage/downloads/music/%(title)s.%(ext)s" "${url}"`;
  ytCommand += isPlaylistChecked ? " --yes-playlist" : " --no-playlist";

  const eventSource = new EventSource(
    `http://localhost:5000/stream?command=${encodeURIComponent(ytCommand)}`
  );
  eventSource.onmessage = function (event) {
    resultDiv.innerHTML += event.data + "<br>";
    if (event.data === "Comando finalizado") {
      resultDiv.innerHTML +=
        "<br><strong>La descarga ha terminado.</strong><br>";
      document.getElementById("restart").style.display = "flex";
      document.getElementById("noti").innerHTML = "Finalizado";
    }
    resultDiv.scrollTop = resultDiv.scrollHeight;
  };
  eventSource.onerror = function () {
    eventSource.close();
  };
});

document
  .getElementById("restart")
  .addEventListener("click", function restart() {
    document.getElementById("controls").style.display = "flex";
    document.getElementById("notification").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("result").innerHTML = "";
    document.getElementById("command").value = "";
  });
