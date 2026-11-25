#!/usr/bin/env python3
"""
Zero-dependency Python 3 fallback preview server for Quinten's static portfolio.
"""
import http.server
import mimetypes
import os
import socketserver
import sys
import threading
import webbrowser
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
SITE_ROOT = BASE_DIR / "site" if (BASE_DIR / "site" / "nl" / "index.html").exists() else BASE_DIR.parent / "dist"

if not (SITE_ROOT / "nl" / "index.html").exists():
    print("Geen gebouwde site gevonden in ./site of ./dist.")
    sys.exit(1)

mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("image/avif", ".avif")
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("application/gpx+xml", ".gpx")


class PortfolioHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(SITE_ROOT), **kwargs)

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            lang = (self.headers.get("Accept-Language") or "").lower()
            target = "/en/" if lang.startswith("en") else "/nl/"
            self.send_response(302)
            self.send_header("Location", target)
            self.end_headers()
            return
        super().do_GET()

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            is_en = self.path.startswith("/en/")
            fallback = SITE_ROOT / ("en" if is_en else "nl") / "404" / "index.html"
            if fallback.exists():
                body = fallback.read_bytes()
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
        super().send_error(code, message, explain)


def main():
    no_open = "--no-open" in sys.argv
    port = 4321
    httpd = None
    for candidate in range(4321, 4335):
        try:
            socketserver.TCPServer.allow_reuse_address = True
            httpd = socketserver.TCPServer(("127.0.0.1", candidate), PortfolioHandler)
            port = candidate
            break
        except OSError:
            continue

    if httpd is None:
        print("Geen vrije poort gevonden tussen 4321 en 4334.")
        sys.exit(1)

    url = f"http://127.0.0.1:{port}/nl/"
    print("===============================================================")
    print("  Quinten Desmyter Portfolio — Lokale Preview Actief (Python)")
    print(f"  Open in browser: {url}")
    print("  Stoppen        : Sluit dit venster of druk Ctrl + C")
    print("===============================================================")
    if not no_open:
        threading.Timer(0.5, lambda: webbrowser.open(url)).start()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()
