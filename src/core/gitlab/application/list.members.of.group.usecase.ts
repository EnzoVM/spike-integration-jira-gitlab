import GitlabPersistanceRepository from "../domain/gitlab.persistance.repository";

export default class ListMemberOfAGroup {
  
  constructor(
    private readonly gitlabPersistanceRepository: GitlabPersistanceRepository
  ) {}

  async invoke ({groupId}:{groupId: string}) {
    try {
      const memberList = await this.gitlabPersistanceRepository.listAllMemberOfAGroup(groupId)

      return memberList
      
    } catch (error:any) {
      throw new Error(error.message)
    }
  }
}