import {Server} from "socket.io";

export async function GET(request:Request, response:Response) {
    if (response.socket.server.io) {
        console.log("Already set up")
        response.end();
        return;
    }

    const io = new Server(response.socket.server);
    response.socket.server.io = io;

    io.on("connection", (socket) => {
        socket.on("send-message", (obj) => {
            io.emit("receive-message", obj)
        });
        // after the connection.....
    });
    console.log("Setting up socket");
    res.end();

    return io;
}