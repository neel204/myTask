/* eslint-disable prettier/prettier */
import { TaskList, Task, TaskName, TagType, Tag } from './styledComponents'

const UserOutputTasks = props => {
    const { eachTask } = props
    const { task, tag } = eachTask
    return (
        <TaskList>
            <Task>
                <TaskName>{task}</TaskName>
                <TagType>
                    <Tag>{tag}</Tag>
                </TagType>
            </Task>
        </TaskList>
    )
}

export default UserOutputTasks
