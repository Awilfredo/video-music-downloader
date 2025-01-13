# Terminar procesos Python que ya se estén ejecutando
pkill -f python
# Mostrar un mensaje de actualización de yt-dlp
echo "Actualizando yt-dlp..."
pip install -U "yt-dlp[default]"
# Ejecutar tu script Python
python ~/app.py