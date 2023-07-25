import { Request, Response } from "express"
import AddMemberUseCase from "../core/jira/application/add.member.usecase"
import RemoveMemberUseCase from "../core/jira/application/remove.member.usecase"
import ListProjectRolesUseCase from "../core/jira/application/list.project.roles.usecase"
import ListProjectsUseCase from "../core/jira/application/list.projects.usecase"
import JiraApiRepository from "../core/jira/infrastructure/jira.api.repository"

const addMemberUseCase = new AddMemberUseCase(new JiraApiRepository)
const removeMemberUseCase = new RemoveMemberUseCase(new JiraApiRepository)
const listProjectRolesUseCase = new ListProjectRolesUseCase(new JiraApiRepository)
const listProjectsUseCase = new ListProjectsUseCase(new JiraApiRepository)

// 10012: miembro de equipo
// 10002: administrador

export const addMemberHandle = async (req: Request, res: Response) => {
  const { userEmail, projectKey, roleId } = req.body

  try {
    const userAdded = await addMemberUseCase.invoke({userEmail, projectKey, roleId})
    
    res.status(201).json({
      status: 'Ok',
      message: 'The user was added to the project successfully',
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
  const { userEmail, projectKey, roleId } = req.body

  try {
    await removeMemberUseCase.invoke({userEmail, projectKey, roleId})
    
    res.status(200).json({
      status: 'Ok',
      message: 'The user was deleted to the project successfully'
    })

  } catch (error: any) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}

export const listProjectsHandle = async (req: Request, res: Response) => {
  try {
    const projectList = await listProjectsUseCase.invoke()
    
    res.status(200).json({
      status: 'Ok',
      message: 'List of projects',
      data: projectList
    })

  } catch (error: any) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}

export const listProjectRolesHandle = async (req: Request, res: Response) => {
  const { projectKey } = req.params

  try {
    const projectRoleList = await listProjectRolesUseCase.invoke({projectKey})
    
    res.status(200).json({
      status: 'Ok',
      message: 'List of project roles',
      data: projectRoleList
    })

  } catch (error: any) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}