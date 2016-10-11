import System from './components/system';

let system = new System();
system.start()
.then(() => {
  console.log('server started at port: ' + system.port);
});
