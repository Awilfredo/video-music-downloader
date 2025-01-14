Descargar videos y musica de youtube o youtube music usando termux y yt-dlp
1. instalar termux
2. ejecutar lo sieguiente:
termux-setup-storage && DEBIAN_FRONTEND=noninteractive pkg update -y && pkg upgrade -y && pkg install libexpat openssl python ffmpeg git -y && pip install -U "yt-dlp[default]" && pip install flask && git clone https://github.com/Awilfredo/video-music-downloader.git && chmod +x ~/video-music-downloader/start.sh && echo "~/video-music-downloader/start.sh" >> ~/.bashrc
3. dar los permisos necesarios
