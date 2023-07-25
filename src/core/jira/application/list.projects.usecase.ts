import JiraPersistanceRepository from "../domain/jira.persistance.repository";

export default class ListProjectsUseCase {

  constructor(
    private readonly jiraPersistanceRepository: JiraPersistanceRepository
  ) {}

  async invoke () {
    try {
      const projectList = await this.jiraPersistanceRepository.listProjects()

      return projectList

    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}