from werkzeug.wrappers import Request, Response, ResponseStream


keys = [
    '0Y0YiXTNs6srxBf43oDV',
    'tzyu6SXdVXOIbvHzhCYa',
    'xEpcOphpectwEJM281Hx',
    'AW8Awws1VX5Sa6lWqrEm',
    'c2jUy0G0kNFKSqsZTYQT',
    'mYptNyxxR1tcfEhWCBvH',
    'o9jiJ9Dnfn3mnGTGlCHV',
    'mHmaUohD58qiA2ZMDq8q',
    'kzgF0HfsgZ4OKA3s6eoL',
    'qvqCl1oZic5oPSriqaQu',
    'gY9OpDOqSPXnVrzCf0VU',
    'SNGkJs5SmDv5esbUUp2s',
    'GhDrQkQqJXIitEijilt2',
    'XeUvO2kV0U2ntGYpnt3M',
    'p9q3jxF9mzdkOKgToduZ',
    'PiukvwWoPJg0vYN20fq0',
    'en5LDGqBhNcBgFOjJdUO',
    'ihUA2aMyc4HoHL4J1bcc',
    'DYgr8ocYb2wAN4tOJEsN',
    'dftf6ytS6BqNdGnxiKiP'
]

class AuthenticationMiddleware():
    def __init__(self, app):
        self.app = app
        self.keys = keys


    def __call__(self, environ, start_response):
        request = Request(environ)
        authkey = request.headers['X-Auth-Key']
        
        # these are hardcoded for demonstration
        # verify the username and password from some database or env config variable
        if authkey in self.keys:
            return self.app(environ, start_response)

        res = Response(u'Authorization failed', mimetype= 'text/plain', status=401)
        return res(environ, start_response)