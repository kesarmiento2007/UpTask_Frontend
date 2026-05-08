import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { type TaskFormData, type Project, type Task, taskSchema } from "@/types/index";

type TaskAPIType = {
    formData: TaskFormData,
    projectId: Project["id"],
    taskId: Task["id"],
    status: Task["status"]
} 

export async function createTask({ formData, projectId } : Pick<TaskAPIType, "formData" | "projectId">) {
    try {
        const url = `/projects/${projectId}/tasks`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getTaskById({ projectId, taskId } : Pick<TaskAPIType, "projectId" | "taskId">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api(url);
        const response = taskSchema.safeParse(data);
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateTask({ projectId, taskId, formData } : Pick<TaskAPIType, "formData" | "projectId" | "taskId">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.put(url, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteTask({ projectId, taskId } : Pick<TaskAPIType, "projectId" | "taskId">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.delete(url);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateStatus({ projectId, taskId, status } : Pick<TaskAPIType, "projectId" | "taskId" | "status">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`;
        const { data } = await api.put(url, { status });
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}