const os = require("os")
const childProcess = require('child_process')
const fs = require('fs')

const execProcess = (command) => {
    childProcess.exec(command, (error, stdout, stderr) => {
        console.clear()
        console.log(`${stdout}\r`);
        if (error !== null) {
            process.stdout.write(`error: ${error}\r`);
        }
    });
}


const saveActivityMonitor = (command) => {
    childProcess.exec(command, (error, stdout, stderr) => {
        const currentTime = Date.now()
        const logMessage = `${currentTime} : ${stdout}`;

        fs.appendFile("activityMonitor.log", logMessage, (err) => {
            if (err) throw err;
        });
        if (error !== null) {
            console.error(`Error: ${error}`);
        }
    });
}

function runActivityMonitor() {
    const platform = os.platform()
    const commandWindows = "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"
    const commandUnix = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1'

    setInterval(() => {
        if (platform === 'win32') {
            execProcess(commandWindows)
        } else {
            execProcess(commandUnix)
        }
    }, 100)

    setInterval(() => {
        if (platform === 'win32') {
            saveActivityMonitor(commandWindows)
        } else {
            saveActivityMonitor(commandUnix)

        }

    }, 60 * 1000)

}

runActivityMonitor()


module.exports = runActivityMonitor