import { Server, ServerOptions, Socket } from "socket.io";

interface Note {
    id: string;
    title: string;
    description: string;
}

let notes: Note[] = [];

export default (server: any) => {
  const io = new Server(server);
    io.on("connection", (socket: Socket): void => {
        console.log("nuevo socket connectado:", socket.id);

        // Send all messages to the client
        socket.emit("server:loadnotes", notes);

        socket.on("client:newnote", (newNote: Note): void => {
            const note: Note = { ...newNote, id: "123" };
            notes.push(note);
            io.emit("server:newnote", note);
        });

        socket.on("client:deletenote", (noteId: string): void => {
            console.log(noteId);
            notes = notes.filter((note: Note) => note.id !== noteId);
            io.emit("server:loadnotes", notes);
        });

        socket.on("client:getnote", (noteId: string): void => {
            const note: Note | undefined = notes.find(
                (note: Note) => note.id === noteId
            );
            socket.emit("server:selectednote", note);
        });

        socket.on("client:updatenote", (updatedNote: Note): void => {
            notes = notes.map((note: Note) => {
                if (note.id === updatedNote.id) {
                    note.title = updatedNote.title;
                    note.description = updatedNote.description;
                }
                return note;
            });
            io.emit("server:loadnotes", notes);
        });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};