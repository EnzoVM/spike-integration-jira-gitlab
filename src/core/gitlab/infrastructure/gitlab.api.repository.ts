import GitlabPersistanceRepository from "../domain/gitlab.persistance.repository";
import axios from "axios"

export default class GitlabApiRepository implements GitlabPersistanceRepository {
  
  async getUserId (userName: string): Promise<any> {
    try {
      const userFound = await axios.get(`https://gitlab.com/api/v4/users?username=${userName}`, {
        headers: {
          'PRIVATE-TOKEN': process.env.ACCESS_TOKEN_GITLAB,
        }
      })

      return userFound.data

    } catch (error:any) {
      throw new Error(error.message)
    }
  }

  async addMemberToAGroup (userId: string, accessLevel: number, groupId: string): Promise<any> {
    try {
      const userAdded = await axios.post(`https://gitlab.com/api/v4/groups/${groupId}/members`, {
        user_id: userId,
        access_level: accessLevel
      }, {
        headers: {
          'PRIVATE-TOKEN': process.env.ACCESS_TOKEN_GITLAB,
        },
      })

      return userAdded.data

    } catch (error:any) {
      throw new Error(error.message)
    }
  }

  async removeMemberFromAGroup (userId: string, groupId: string): Promise<void> {
    try {
      await axios.delete(`https://gitlab.com/api/v4/groups/${groupId}/members/${userId}`, {
        headers: {
          'PRIVATE-TOKEN': process.env.ACCESS_TOKEN_GITLAB,
        },
      })
      
    } catch (error:any) {
      console.log(error.response.data.message)
      throw new Error(error.message)
    }
  }

  async listAllMemberOfAGroup (groupId: string): Promise<any>{
    try {
      const userList = await axios.get(`https://gitlab.com/api/v4/groups/${groupId}/members`, {
        headers: {
          'PRIVATE-TOKEN': process.env.ACCESS_TOKEN_GITLAB,
        },
      })
      
      return userList.data
      
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async listGroups (): Promise<any> {
    try {
      const groupList = await axios.get('https://gitlab.com/api/v4/groups', {
        headers: {
          'PRIVATE-TOKEN': process.env.ACCESS_TOKEN_GITLAB,
        },
        params: {
          top_level_only: true,
          owned: true,
          per_page: 100
        }
      })
      
      return groupList.data

    } catch (error:any) {
      throw new Error(error.message)
    }
  }
}