#!/usr/bin/env python3
"""Tiny static dev server that disables caching, so edits always show up on reload."""
import http.server
import socketserver
import os

PORT = 8000
ROOT = os.path.join(os.path.dirname(__file__), "..")


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # quiet


if __name__ == "__main__":
    os.chdir(ROOT)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), NoCacheHandler) as httpd:
        print(f"No-cache dev server running on http://127.0.0.1:{PORT}")
        httpd.serve_forever()
