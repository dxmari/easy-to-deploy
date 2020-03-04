import net from 'net'

class NetClient {
    connect() {
        var socket = new net.Socket();
        let netPort = 61337;
        socket.connect(netPort, "localhost", function () {
            console.log("Client: Connected to server on " + netPort);
        });

        // Let's handle the data we get from the server
        socket.on("data", function (data: any) {
            data = JSON.parse(data);
            console.log("Response from server: %s", data.response);
            // Respond back
            socket.write(JSON.stringify({ response: "Hey there server!" }));
            // Close the connection
            socket.end();
        });
    }
}

export default new NetClient();