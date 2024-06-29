import Input from './Input'

const PersonForm = ({onSubmit, nameValue, onChangeName, numberValue, onChangeNumber}) => {
    return (
        <form onSubmit={onSubmit}>
            <Input required={true} text={'name: '} placeholder={'enter a new name'} value={nameValue} onChange={onChangeName} />
            <Input required={true} text={'number: '} placeholder={'enter the phone number'} value={numberValue} onChange={onChangeNumber} />
            <button type='submit'>add</button>
        </form>
    )
}

export default PersonForm