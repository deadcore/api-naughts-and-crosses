export default class RoomController {
    constructor(private socketIo: SocketIO.Server) {

    }

    onInit() {
        this.socketIo.on('test', () => {

        });
    }
}