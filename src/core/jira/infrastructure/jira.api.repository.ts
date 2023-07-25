import JiraPersistanceRepository from "../domain/jira.persistance.repository"
import axios from "axios"

const pragmaInstance = process.env.INSTANCE_JIRA

const auth = Buffer.from(process.env.EMAIL_OWNER + ":" + process.env.ACCESS_TOKEN_JIRA).toString('base64')

export default class JiraApiRepository implements JiraPersistanceRepository {
      
  async getUser (userEmail: string): Promise<any> {
    try {      
      const userFound = await axios.get(`${pragmaInstance}/rest/api/3/user/search`, {
        headers: {
          Authorization: 'Basic ' + auth
        },
        params: {
          query: userEmail
        }
      })
      
      return userFound.data

    } catch (error:any) {  
      throw new Error(error.message)
    }
  }

  async addMemberToAProject (projectKey: string, userId: string, roleId: string): Promise<any> {
    try {
      const userAdded = await axios.post(`${pragmaInstance}/rest/api/3/project/${projectKey}/role/${roleId}`, {
        user: [userId]
      }, {
        headers: {
          Authorization: 'Basic ' + auth
        }
      })
    
      return userAdded.data

    } catch (error:any) {    
      throw new Error(error.message)
    }
  }

  async removeMemberFromAProject (projectKey: string, userId: string, roleId: string): Promise<any> {
    try {
      const userDeleted = await axios.delete(`${pragmaInstance}/rest/api/3/project/${projectKey}/role/${roleId}`, {
        headers: {
          Authorization: 'Basic ' + auth
        },
        params: {
          user: userId
        }
      })

      return userDeleted.data
      
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async createUserInAnInstance (userEmail: string): Promise<any> {
    try {
      const userCreated = await axios.post(`${pragmaInstance}/rest/api/3/user`, {
        emailAddress: userEmail
      }, {
        headers: {
          Authorization: 'Basic ' + auth
        }
      })

      return userCreated.data

    } catch (error:any) {
      throw new Error(error.message)
    }
  }

  async deleteUserFromAnInstance (accountId: string): Promise<any> {
    try {
      const userDeleted = await axios.delete(`${pragmaInstance}/rest/api/3/user`, {
        headers: {
          Authorization: 'Basic ' + auth
        },
        params: {
          accountId
        }
      })
      
      console.log(userDeleted)
      
    } catch (error:any) {
      console.log(error.response.data.errorMessages)
      throw new Error(error.message)
    }
  }

  async listProjects (): Promise<any> {
    try {
      const projectList = await axios.get(`${pragmaInstance}/rest/api/3/project/search`, {
        headers: {
          Authorization: 'Basic ' + auth
        },
        params: {
          maxResults: 100
        }
      })

      return projectList.data

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async listProjectRoles (projectKey: string): Promise<any> {
    try {
      const projectRolesList = await axios.get(`${pragmaInstance}/rest/api/3/project/${projectKey}/roledetails`, {
        headers: {
          Authorization: 'Basic ' + auth
        }
      })

      return projectRolesList.data

    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}