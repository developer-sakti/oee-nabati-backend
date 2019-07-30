export class Utils {
    static readonly NULL_RETURN = null;
    static readonly EMPTY_ARRAY_RETURN = [];

    static sendResponseNotFound(notfound : string) {
        return notfound + "does not exist !";
    }

    static sendResponseSaveFailed(message : string) {
        return {
            success : false,
            message : "Failed to save " + message + " !"
        }
    }

    static sendResponseSaveSuccess(data : any, message : string) {
        return {
            success : false,
            message : "Failed to save " + message + " !",
            data    : data
        }
    }
}