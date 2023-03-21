/* eslint-disable prettier/prettier */
import { Component } from 'react'
import { v4 as uuidV4 } from 'uuid'
import UserOutputTasks from '../UserOutputTasks'
import TagButton from '../TagButton'

import {
    MainContainer,
    InputContainer,
    OutputContainer,
    InputHeading,
    Form,
    FormLabel,
    FormInput,
    FromSelect,
    ButtonCon,
    FormButton,
    OutputHeading,
    UnOrderList,
    ContainerTask,
    NoTask
} from './styledComponents'

const tagsList = [
    {
        optionId: 'HEALTH',
        displayText: 'Health',
    },
    {
        optionId: 'EDUCATION',
        displayText: 'Education',
    },
    {
        optionId: 'ENTERTAINMENT',
        displayText: 'Entertainment',
    },
    {
        optionId: 'SPORTS',
        displayText: 'Sports',
    },
    {
        optionId: 'TRAVEL',
        displayText: 'Travel',
    },
    {
        optionId: 'OTHERS',
        displayText: 'Others',
    },
]

const activeTag = {
    All: 'ALL',
    Health: 'HEALTH',
    Education: 'EDUCATION',
    Entertainment: 'ENTERTAINMENT',
    Sports: 'SPORTS',
    TRAVEL: 'TRAVEL',
    OTHERS: 'OTHERS',
}

class UserInputTask extends Component {
    state = {
        activeTaskTag: activeTag.All,
        userInput: '',
        tag: tagsList[0].optionId,
        userTaskList: [],
        filter: [],
        isFilter: false,
    }

    onUserInput = event => {
        this.setState({ userInput: event.target.value })
    }

    onAddTag = event => {
        this.setState({ tag: event.target.value })
    }

    onAddingTask = event => {
        event.preventDefault()
        const { userInput, tag, userTaskList } = this.state
        const newTask = { id: uuidV4(), task: userInput, tag }
        this.setState(prevState => ({
            userTaskList: [...prevState.userTaskList, newTask],
            tag: tagsList[0].optionId,
            userInput: '',
        }))
    }

    filterUserTasks = opTag => {
        const { userTaskList, activeTaskTag, filter, isFilter } = this.state
        const filterList = userTaskList.filter(each => each.tag === opTag)
        const active = isFilter ? opTag : activeTag.All
        this.setState(prevState => ({
            filter: filterList,
            isFilter: !prevState.isFilter,
            activeTaskTag: active,
        }))
    }

    renderUserInput = () => {
        const { userInput, tag } = this.state
        return (
            <InputContainer>
                <InputHeading>Create a Tasks!</InputHeading>
                <Form onSubmit={this.onAddingTask}>
                    <FormLabel htmlFor="userInput">Task</FormLabel>
                    <FormInput
                        id="userInput"
                        type="text"
                        placeholder="Enter the task here"
                        onChange={this.onUserInput}
                        value={userInput}
                    />
                    <FormLabel htmlFor="tags">Tags</FormLabel>
                    <FromSelect id="tags" value={tag} onChange={this.onAddTag}>
                        {tagsList.map(eachTag => (
                            <option value={eachTag.optionId} key={eachTag.optionId}>
                                {eachTag.displayText}
                            </option>
                        ))}
                    </FromSelect>
                    <ButtonCon>
                        <FormButton type="submit">Add Task</FormButton>
                    </ButtonCon>
                </Form>
            </InputContainer>
        )
    }

    renderUserTasks = () => {
        const { userTaskList, activeTaskTag, filter, isFilter } = this.state
        const task = isFilter ? filter : userTaskList
        return (
            <OutputContainer>
                <OutputHeading>Tags</OutputHeading>
                <UnOrderList>
                    {tagsList.map(eachTag => (
                        <TagButton
                            eachTag={eachTag}
                            key={eachTag.optionId}
                            filterUserTasks={this.filterUserTasks}
                            activeTaskTag={activeTaskTag}
                        />
                    ))}
                </UnOrderList>
                <ContainerTask>
                    <OutputHeading id="main-heading">Tasks</OutputHeading>
                    {task.length > 0 ? (
                        <ul>
                            {task.map(eachTask => (
                                <UserOutputTasks eachTask={eachTask} key={eachTask.id} />
                            ))}
                        </ul>
                    ) : (
                            <NoTask>No Tasks Added Yet</NoTask>
                        )}
                </ContainerTask>
            </OutputContainer>
        )
    }

    render() {
        return (
            <MainContainer>
                {this.renderUserInput()}
                {this.renderUserTasks()}
            </MainContainer>
            // eslint-disable-next-line prettier/prettier
        )
    }
}

export default UserInputTask
