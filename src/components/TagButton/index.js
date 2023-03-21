/* eslint-disable prettier/prettier */
import { TagList, Buttons } from './styledComponents'

const TagButton = props => {
    const { eachTag, filterUserTasks } = props
    const { optionId, displayText } = eachTag

    const filter = () => {
        filterUserTasks(optionId)
    }

    return (
        <TagList>
            <Buttons type="button" onClick={filter}>
                {displayText}
            </Buttons>
        </TagList>
    )
}

export default TagButton
