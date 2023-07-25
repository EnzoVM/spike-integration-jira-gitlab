
export default interface GitlabPersistanceRepository {

  getUserId: (userName: string) => Promise<any>
  addMemberToAGroup: (userId: string, accessLevel: number, groupId: string) => Promise<any>
  removeMemberFromAGroup: (userId: string, groupId: string) => Promise<void>
  listAllMemberOfAGroup: (groupId: string) => Promise<any>
  listGroups: () => Promise<any>
  
}