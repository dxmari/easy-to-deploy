const menus: any = {
  main: `
      edeploy [command] <options>
  
      edeploy serve .......... to run the server
        --host .......... the host name to run the server
        --port .......... the port number to run the server
        --debug ......... to enable the debug mode

      version ........... show package version
      help .............. show help menu for a command`,
}


export default (args: any) => {
  const subCmd: any = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}