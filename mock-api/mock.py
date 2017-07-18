#!/usr/bin/env python
from SimpleHTTPServer import SimpleHTTPRequestHandler
from BaseHTTPServer import HTTPServer
import os
import posixpath
import urllib

json_endpoints = [ 'apis',
    'info', 'photos', 'props',
    'camera', 'lens', 'liveview', 'device',
    'status', 'params', 'constants',
    'ping', 'shoot', 'start', 'finish', 
    'focus', 'zoom', 'changes']
photo_extensions = ['DNG', 'JPG', 'PEF']

class MockHTTPServer(HTTPServer):
    def __init__(self, base_path, *args, **kwargs):
        HTTPServer.__init__(self, *args, **kwargs)
        HTTPServer.allow_reuse_address = True
        self.RequestHandlerClass.base_path = base_path

class EndpointHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        path = posixpath.normpath(urllib.unquote(path))
        words = path.split('/')
        words = filter(None, words)
        path = self.base_path
        for word in words:
            drive, word = os.path.splitdrive(word)
            head, word = os.path.split(word)
            if word in (os.curdir, os.pardir):
                continue
            path = os.path.join(path, word)
        return path

    # simple handler to rewrite requests from directory to files
    def do_GET(self):
        endpoint = self.path.split('/')[-1]

        if endpoint in json_endpoints:
            # append json extension
            self.path += '.json'
        if '.' in endpoint:
            extension = endpoint.split('.')[-1]
            if extension in photo_extensions:
                # get actual file from the folder
                self.path += ('/'+endpoint)
        return SimpleHTTPRequestHandler.do_GET(self)

# root to mock-api, even if not run there
path = os.getcwd()
if path.split('/')[-1] != 'mock-api':
    path += '/mock-api'

PORT = 8000
server = MockHTTPServer(path, ('0.0.0.0', PORT), EndpointHandler)

try:
    print "serving %s at %s" % (path, PORT)
    server.serve_forever()
except KeyboardInterrupt:
    print 'die'
finally:
    print 'cleanup'
    server.shutdown()
    server.socket.close()