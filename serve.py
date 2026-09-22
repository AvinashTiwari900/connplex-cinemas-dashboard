import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import urllib.request

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def is_server_responding(port):
    try:
        urllib.request.urlopen(f"http://localhost:{port}", timeout=1)
        return True
    except Exception:
        return False

def open_browser_delayed(url):
    threading.Timer(0.6, lambda: webbrowser.open(url)).start()

def main():
    os.chdir(DIRECTORY)
    port = PORT
    url = f"http://localhost:{port}"

    if is_server_responding(port):
        print(f"ConnPlex Dashboard Server is ALREADY running at {url}")
        print("Launching browser...")
        open_browser_delayed(url)
        return

    httpd = None
    for attempt_port in [3000, 3001, 3002, 8000, 8080]:
        try:
            httpd = socketserver.TCPServer(("", attempt_port), Handler)
            port = attempt_port
            url = f"http://localhost:{port}"
            break
        except OSError:
            continue

    if not httpd:
        print("Could not bind to any standard port.")
        sys.exit(1)

    with httpd:
        print(f"ConnPlex Dashboard Server running at {url}")
        print("Launching browser...")
        open_browser_delayed(url)
        print("Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopping server...")

if __name__ == '__main__':
    main()

