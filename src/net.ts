import net from 'net'

class NetServer {
    connect() {
        var server = net.createServer(function (conn) {
            console.log("Server: Client connected");

            // If connection is closed
            conn.on("end", function () {
                console.log('Server: Client disconnected');
                // Close the server
                server.close();
                // End the process
                process.exit(0);
            });

            // Handle data from client
            conn.on("data", function (data: any) {
                data = JSON.parse(data);
                console.log("Response from client: %s", data.response);
            });

            // Let's response with a hello message
            conn.write(
                JSON.stringify(
                    { response: "Hey there client!" }
                )
            );
        });
        let netPort = 61337;
        server.listen(netPort, "localhost", function () {
            console.log("Server: Listening on " + netPort);
        });
    }
}

export default new NetServer();