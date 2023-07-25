import JiraPersistanceRepository from "../domain/jira.persistance.repository";

export default class RemoveMemberUseCase {

  constructor(
    private readonly jiraPersistanceRepository: JiraPersistanceRepository
  ) {}

  async invoke ({
    userEmail, 
    projectKey, 
    roleId
  }:{
    userEmail: string, 
    projectKey: string, 
    roleId: string
  }) {
    try {
      const userFound = await this.jiraPersistanceRepository.getUser(userEmail)
      if(userFound.length === 0){
        throw new Error('User does not exist')
      }
      
      //Remove from project
      await this.jiraPersistanceRepository.removeMemberFromAProject(projectKey, userFound[0].accountId, roleId)
      //Remove from instance
      // await this.jiraPersistanceRepository.deleteUserFromAnInstance(userFound[0].accountId)

    } catch (error:any) {
      throw new Error(error.message)
    }
  }
}