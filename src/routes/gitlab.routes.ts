import { Router } from 'express'
import { addMemberHandle, removeMemberHandle, listGroupsHandle, listMembersGroupHandle } from '../controllers/gitlab.controller'

const gitlabRoutes = Router()

gitlabRoutes
  .post('/', addMemberHandle)
  .delete('/:userEmail/:groupId', removeMemberHandle)
  .get('/', listGroupsHandle)
  .get('/:groupId', listMembersGroupHandle)

export default gitlabRoutes
