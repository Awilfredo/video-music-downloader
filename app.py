from flask import Flask, request, Response, render_template, send_from_directory
import subprocess

app = Flask(__name__, static_folder='static', template_folder='templates')


@app.route('/')
def home():
    return render_template('index.html')  # Sirve el archivo HTML del frontend


@app.route('/stream')
def stream():
    command = request.args.get('command')
    if not command:
        return "No se proporcionó ningún comando.", 400

    def execute_command():
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        for line in process.stdout:
            yield f"data: {line.strip()}\n\n"
        process.stdout.close()
        process.wait()
        yield "data: Comando finalizado\n\n"

    return Response(execute_command(), content_type='text/event-stream')


# Ruta opcional para servir archivos estáticos
@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
