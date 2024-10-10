import { newUser } from "../interfaces/newUser";
import Auth from "../utils/auth";

const signUp = async (signUpData: newUser) => {
    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            body: JSON.stringify(signUpData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
        console.log(data);
        return data;
    } catch (err) {
        console.log("Error from user signup: ", err);
        return err;
    }
};

export { signUp };