import { Router } from 'express'
import { addMemberHandle, removeMemberHandle, listProjectRolesHandle, listProjectsHandle } from '../controllers/jira.controller'

const jiraRoutes = Router()

jiraRoutes
  .post('/', addMemberHandle)
  .delete('/', removeMemberHandle)
  .get('/', listProjectsHandle)
  .get('/:projectKey', listProjectRolesHandle)

export default jiraRoutes
