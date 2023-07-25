
export default interface JiraPersistanceRepository {

  getUser: (userEmail: string) => Promise<any>
  addMemberToAProject: (projectKey: string, userId: string, roleId: string) => Promise<any>
  removeMemberFromAProject: (projectKey: string, userId: string, roleId: string) => Promise<any>
  createUserInAnInstance: (userEmail: string) => Promise <any>
  deleteUserFromAnInstance: (accountId: string) => Promise<any>
  listProjects: () => Promise<any>  
  listProjectRoles: (projectKey: string) => Promise<any>
  
}