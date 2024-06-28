const Country = ({country, onShow}) => {
    return (
        <div>
            {country}
            <button onClick={onShow}>show</button>
        </div>
    )
}

export default Country;