import minimist from 'minimist'

import error from './utils/error'
import { deploy, version, serve, help } from './cmds'

export const init = () => {
    integrateCmds();
}

const integrateCmds = () => {
    const args = minimist(process.argv.slice(2))

    let cmd = args._[0] || 'help'

    if (args.version || args.v) {
        cmd = 'version'
    }

    if (args.help || args.h) {
        cmd = 'help'
    }

    switch (cmd) {
        case 'version':
            version(args)
            break

        case 'help':
            help(args)
            break

        case 'serve':
            serve(args)
            break

        case 'deploy':
            deploy(args)
            break

        default:
            error(`"${cmd}" is not a valid command!`, true)
            break
    }
}