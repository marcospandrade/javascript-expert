const http = require('http')

const DEFAULT_USER = {
    username: 'MarcosAndrade',
    password: '123'
}

const { once } = require('events');

const routes = {
    '/contact:get': (request, response) => {
        response.write('contact us page')
        return response.end()
    },
    '/login:post': async (request, response) => {
        // curl -i -X POST --data '{"username": "MarcosAndrade", "password": "123"}' localhost:3000/login
        const user = JSON.parse(await once(request, 'data'));
        const toLower = (text) => text.toLowerCase();

        if(
            toLower(user.username) !== toLower(DEFAULT_USER.username) || 
            user.password !== DEFAULT_USER.password
        ){
            response.writeHead(401)
            return response.end('Log in failed!')
        }

        return response.end('Log in success!')
    },
    default(request, response) {
        response.writeHead(404)
        return response.end('not found')
    }
}

function handler(request, response){
    const { url, method } = request;
    
    const routeKey = `${url}:${method.toLowerCase()}`
    console.log({ routeKey })
    const chosen = routes[routeKey] || routes.default
    return chosen(request, response)
}

const app = http.createServer(handler).listen(3000, () => console.log('Server running'))

module.exports = app