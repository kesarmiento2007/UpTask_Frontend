import type { Project, TeamMember } from "../types"

export const isManager = (managerId: Project["userId"], userId: TeamMember["id"]) => managerId === userId;