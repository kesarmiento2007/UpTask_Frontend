import { z } from "zod";

/** Auth & Users */
const authSchema = z.object({
    name: z.string(),
    email: z.email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type UpdateCurrentPasswordForm = Pick<Auth, "current_password" | "password" | "password_confirmation">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type ConfirmToken = Pick<Auth, "token">;
export type CheckPasswordForm = Pick<Auth, "password">;

/** Users */
export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    id: z.uuid()
});
export type User = z.infer<typeof userSchema>;

/** Notes */
export const noteSchema = z.object({
    id: z.uuid(),
    content: z.string(),
    createdBy: z.uuid(),
    task: z.uuid(),
    createdAt: z.string(),
    user: userSchema.pick({
        id: true,
        email: true,
        name: true
    })
});
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;

/** Tasks */
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]);
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    description: z.string(),
    projectId: z.string(),
    status: taskStatusSchema,
    completeBy: z.uuid().nullable(),
    completedByUser: userSchema.pick({
        id: true,
        name: true
    }).nullish(),
    notes: z.array(noteSchema).nullish(),
    createdAt: z.string(),
    updatedAt: z.string()
});
export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;

/** Projects */
export const projectSchema = z.object({
    id: z.uuid(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskSchema),
    userId: z.uuid()
});

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        id: true,
        clientName: true,
        projectName: true,
        description: true,
        userId: true
    })
);
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, "projectName" | "clientName" | "description">;

/** Team */
const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    id: true
});
export const teamMembersSchema = z.object({
    team: z.array(teamMemberSchema)
});
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;