import dotenv from 'dotenv'
dotenv.config()
import express, {Request, Response} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import gitlabRoutes from './routes/gitlab.routes'
import jiraRoutes from './routes/jira.routes'

const app = express()

app.set('PORT', process.env.PORT || 3000)
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get('/', (_request: Request, response: Response) => {
  response.status(201).json({
    message: 'Spike of integration with jira and gitlab'
  }).end()
})

app.use('/api/v1/gitlab', gitlabRoutes)
app.use('/api/v1/jira', jiraRoutes)

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${app.get('PORT')}`)
})
