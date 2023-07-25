import GitlabPersistanceRepository from "../domain/gitlab.persistance.repository";

export default class ListGroupsUseCase {
  
  constructor(
    private readonly gitlabPersistanceRepository: GitlabPersistanceRepository
  ) {}

  async invoke () {
    try {
      const groupList = await this.gitlabPersistanceRepository.listGroups()

      return groupList

    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}