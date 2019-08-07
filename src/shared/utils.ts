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

    static sendResponseSaveSuccess(data : any) {
        return {
            success : true,
            message : "Success saving data !",
            data    : data
        }
    }

    static sendResponseSaveFailed(message : string) {
        return {
            success : false,
            message : "Failed to save " + message + " !"
        }
    }

    static sendResponseUpdateSuccess(data : any) {
        return {
            success : true,
            message : "Success updating data !",
            data    : data
        }
    }

    static sendResponseUpdateFailed(message : string) {
        return {
            success : false,
            message : "Failed to update " + message + " !"
        }
    }

    static sendResponseWrongPassword(data : any) {
        return {
            success : false,
            message : "Your password is incorrect ! Try again."
        }
    }
}