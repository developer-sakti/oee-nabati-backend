export class Utils {
    static readonly NULL_RETURN = null;
    static readonly EMPTY_ARRAY_RETURN = [];

    static sendResponseNotFound(notfound : string) {
        return notfound + "does not exist !";
    }

    static sendResponseUnauthorized() {
        return {
            success : false,
            message : "Sorry, Unauthorized user !"
        }
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

    static sendResponseWrongPassword(data : any) {
        return {
            success : false,
            message : "Your password is incorrect ! Try again."
        }
    }
}