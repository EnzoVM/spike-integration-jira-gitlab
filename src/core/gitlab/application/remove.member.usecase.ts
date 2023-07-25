import GitlabPersistanceRepository from "../domain/gitlab.persistance.repository";

export default class RemoveMemberUseCase {

  constructor(
    private readonly gitlabPersistanceRepository: GitlabPersistanceRepository
  ) {}

  async invoke ({
    userEmail,
    groupId
  }:{
    userEmail: string,
    groupId: string
  }) {

    try {
      const username: string = userEmail.split('@')[0]

      const userFound = await this.gitlabPersistanceRepository.getUserId(username)
      if(userFound.length === 0){
        throw new Error('User does not exist')
      }

      await this.gitlabPersistanceRepository.removeMemberFromAGroup(userFound[0].id, groupId)

    } catch (error:any) {
      throw new Error(error.message)
    }
  }
}