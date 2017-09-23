const path = require('path')
const { cd, exec } = require('shelljs')

const runExe = (runCommand) => new Promise((res, rej) => {
    const dataOut = exec(runCommand)
    const { stdout, stderr, code } = dataOut

    if (code) {
        rej({stderr, code})
    } else {
        res(stdout)
    }
})

const runDeploy = async () => {

    const clientDirectory = path.join(__dirname, '..')
    // console.log('DIRECTORY: ', clientDirectory)

    try {
        const output = await runExe('now ./build --public')
        return runExe(`now alias ${output} client.now.sh`)
    } catch(error) {
        console.log('Error deploying: ', error)
    }
}

if (require.main === module) {
    console.log('RAN BY COMMAND!!')
    runDeploy()
}