const EventEmitter = require('./task3__1')

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        try {
            this.emit('begin');

            const startTime = new Date();
            const result = await asyncFunc(...args);
            const endTime = new Date();


            const executionTime = endTime - startTime;
            this.on('data', ({ result, time }) => {
                console.log(`result is`, result, `Execution time: ${time}ms`)
            })
            this.emit('data', { result: result, time: executionTime });
            this.emit('end');
        } catch (error) {
            this.emit('error', error);
            console.error('Error during execution:', error);
        }
    }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));


const asyncFunction = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    return data;
};

withTime.execute(asyncFunction);
