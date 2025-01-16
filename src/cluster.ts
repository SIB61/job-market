
import cluster from 'cluster';
import os from 'os'

// Check if the current process is the master process
if (cluster.isPrimary) {
    const numCPUs = os.cpus().length; // Get the number of CPU cores
    console.log(`Master process ${process.pid} is running`);
    console.log(`Forking ${numCPUs} workers...`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Handle worker exit
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Forking a new one.`);
        cluster.fork();
    });
} else {
    import('./server')
}
