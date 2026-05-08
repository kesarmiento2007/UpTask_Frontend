import { type UpdateCurrentPasswordForm, type User } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function updateProfile(formData: User) {
    try {
        const url = "/auth/profile";
        const { data } = await api.put(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function changePassword(formData: UpdateCurrentPasswordForm) {
    try {
        const url = "/auth/update-password";
        const { data } = await api.put(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}