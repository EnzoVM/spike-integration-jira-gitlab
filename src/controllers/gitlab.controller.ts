import { Request, Response } from "express"
import AddMemberUseCase from "../core/gitlab/application/add.member.usecase"
import RemoveMemberUseCase from "../core/gitlab/application/remove.member.usecase"
import ListGroupsUseCase from "../core/gitlab/application/list.groups.usecase"
import ListMemberOfAGroup from "../core/gitlab/application/list.members.of.group.usecase"
import GitlabApiRepository from "../core/gitlab/infrastructure/gitlab.api.repository"

const addMemberUseCase = new AddMemberUseCase(new GitlabApiRepository)
const removeMemberUseCase = new RemoveMemberUseCase(new GitlabApiRepository)
const listGroupsUseCase = new ListGroupsUseCase(new GitlabApiRepository)
const listMemberOfAGroup = new ListMemberOfAGroup(new GitlabApiRepository)

// 10: Invitado (Guest)
// 20: Reportero (Reporter)
// 30: Desarrollador (Developer)
// 40: Maestro (Master)
// 50: Propietario (Owner)

export const addMemberHandle = async (req: Request, res: Response) => {
  const { userEmail, accessLevel, groupId} = req.body

  try {
    const userAdded = await addMemberUseCase.invoke({userEmail, accessLevel, groupId})
    
    res.status(201).json({
      status: 'Ok',
      message: 'The user was added to the group successfully',
      data: userAdded
    })

  } catch (error: any) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}

export const removeMemberHandle = async (req: Request, res: Response) => {
  const { userEmail, groupId } = req.params

  try {
    await removeMemberUseCase.invoke({userEmail, groupId})
    
    res.status(200).json({
      status: 'Ok',
      message: 'The user was removed to the group successfully'
    })

  } catch (error: any) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}


export const listGroupsHandle = async (_req: Request, res: Response) => {
  
  try {
    const groupList = await listGroupsUseCase.invoke()
    
    res.status(200).json({
      status: 'Ok',
      message: 'List of groups',
      data: groupList
    })

  } catch (error: any) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}

export const listMembersGroupHandle = async (req: Request, res: Response) => {
  const { groupId } = req.params

  try {
    const memberList = await listMemberOfAGroup.invoke({groupId})
    
    res.status(200).json({
      status: 'Ok',
      message: 'List of members of a group',
      data: memberList
    })

  } catch (error: any) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}