import { instance } from "api/axios.api";
import { Session } from "types/types";

export const loader = async () => {
    const { data } = await instance.get<Session[]>("/sessions");
    return data;
};

export const action = async ({ request }: any) => {
    const formData = await request.formData();
    const method = request.method;
    const id = formData.get("id");

    if (method === "POST") {
        const newSession = {
            time: +formData.get("time"),
            scramble: formData.get("scramble"),
            extraTwo: formData.get("extraTwo") === "true",
            DNF: formData.get("DNF") === "true",
        };
        await instance.post("/sessions", newSession);
    }

    if (method === "DELETE" && id) {
        await instance.delete(`/sessions/${id}`);
    }

    return null;
};
