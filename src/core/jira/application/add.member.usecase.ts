import JiraPersistanceRepository from "../domain/jira.persistance.repository";

export default class AddMemberUseCase {

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
      let userId: string = ''
      
      const userFound = await this.jiraPersistanceRepository.getUser(userEmail)
      
      if(userFound.length === 0){
        //Create a user in the instance whether they have an account or not
        const userCreated = await this.jiraPersistanceRepository.createUserInAnInstance(userEmail)
        userId = userCreated.accountId
        
      }else {
        userId = userFound[0].accountId
      }
      
      const userAdded = await this.jiraPersistanceRepository.addMemberToAProject(projectKey, userId, roleId)
      
      return userAdded

    } catch (error:any) {
      throw new Error(error.message)
    }
  }
}