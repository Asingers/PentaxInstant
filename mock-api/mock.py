#!/usr/bin/env python
import SimpleHTTPServer
import SocketServer

json_endpoints = [
    'info', 'photos', 'props',
    'camera', 'lens', 'liveview', 'device',
    'status', 'params', 'constants',
    'ping', 'shoot', 'start', 'finish', 
    'focus', 'zoom', 'changes']

class EndpointHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    # simple handler to rewrite requests from directory to json
    def do_GET(self):
        endpoint = self.path.split('/')[-1]
        if endpoint in json_endpoints:
            self.path += '.json'
        return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

PORT = 8000
server = SocketServer.TCPServer(('0.0.0.0', PORT), EndpointHandler)

print "serving at port", PORT
try:
    server.serve_forever()
except KeyboardInterrupt:
    print 'die'
server.server_close()