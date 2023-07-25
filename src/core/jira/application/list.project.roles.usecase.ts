import JiraPersistanceRepository from "../domain/jira.persistance.repository";


export default class ListProjectRolesUseCase {

  constructor(
    private readonly jiraPersistanceRepository: JiraPersistanceRepository
  ) {}

  async invoke ({projectKey}:{projectKey: string}) {
    try {
      const projectRolesList = await this.jiraPersistanceRepository.listProjectRoles(projectKey)

      return projectRolesList
      
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}