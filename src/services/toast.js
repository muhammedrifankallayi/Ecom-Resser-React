import { toast } from "react-hot-toast";

export const toastAction = (success, message) => {
    if (success) {
        toast.success(message);
    } else {
        toast.error(message);
    }
}