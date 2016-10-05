import System from './components/system';
let system = new System();
let server = system.init();
let port = system.getPort();
server.listen(port);
