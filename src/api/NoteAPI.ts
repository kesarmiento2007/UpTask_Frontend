import { type NoteFormData, type Project, type Task, type Note } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

type NoteAPIType = {
    formData: NoteFormData,
    projectId: Project["id"],
    taskId: Task["id"],
    noteId: Note["id"]
}

export async function createNote({formData, projectId, taskId} : Pick<NoteAPIType, "formData" | "projectId" | "taskId">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteNote({projectId, taskId, noteId} : Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
        const { data } = await api.delete(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}