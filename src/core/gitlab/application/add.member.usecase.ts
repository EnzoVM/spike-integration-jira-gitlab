import GitlabPersistanceRepository from "../domain/gitlab.persistance.repository";

export default class AddMemberUseCase {
  constructor(
    private readonly gitlabPersistanceRepository: GitlabPersistanceRepository
  ) {}

  async invoke ({
    userEmail, 
    accessLevel,
    groupId
  }:{
    userEmail: string, 
    accessLevel: number,
    groupId: string
  }) {

    try {
      const userList = await this.gitlabPersistanceRepository.listAllMemberOfAGroup(groupId)
      console.log(userList)
      
      if(userList.length >= 5){
        throw new Error('You have reached the maximum number of users')
      }
      
      const username: string = userEmail.split('@')[0]

      const userFound = await this.gitlabPersistanceRepository.getUserId(username)
      if(userFound.length === 0){
        throw new Error('User does not exist')
      }

      const userAdded = await this.gitlabPersistanceRepository.addMemberToAGroup(userFound[0].id, accessLevel, groupId)

      return userAdded

    } catch (error:any) {
      throw new Error(error.message)
    }
  }
}