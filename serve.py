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
        req = urllib.request.Request(f"http://localhost:{port}", headers={'User-Agent': 'ConnPlexCheck'})
        with urllib.request.urlopen(req, timeout=1) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            return "ConnPlex" in content or "connplex" in content.lower()
    except Exception:
        return False

def is_port_in_use_by_other(port):
    try:
        req = urllib.request.Request(f"http://localhost:{port}", headers={'User-Agent': 'ConnPlexCheck'})
        with urllib.request.urlopen(req, timeout=0.5) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            return ("ConnPlex" not in content and "connplex" not in content.lower())
    except Exception:
        return False

def open_browser_delayed(url):
    threading.Timer(0.6, lambda: webbrowser.open(url)).start()

def main():
    os.chdir(DIRECTORY)
    for p in [3000, 3001, 3002, 8000, 8080]:
        if is_server_responding(p):
            url = f"http://localhost:{p}"
            print(f"ConnPlex Dashboard Server is ALREADY running at {url}")
            print("Launching browser...")
            open_browser_delayed(url)
            return

    httpd = None
    for attempt_port in [3000, 3001, 3002, 8000, 8080]:
        if is_port_in_use_by_other(attempt_port):
            continue
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

