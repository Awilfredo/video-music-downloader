Descargar videos y musica de youtube o youtube music usando termux y yt-dlp
1. instalar termux
2. ejecutar lo sieguiente:
termux-setup-storage && pkg update -y && pkg upgrade -y && pkg install libexpat openssl python wget ffmpeg -y && pip install -U "yt-dlp[default]" && pip install flask && wget https://rockochitlan.com/asset/app.py && chmos +x ~/video-music-downloader/start.sh && echo "~/video-music-downloader/start.sh" >> ~/.bashrc
3. dar los permisos necesarios
