const Notification = ({msg}) => {
    if(!msg) {
        return null;
    }

    return (
        <div>
            {msg}
        </div>
    )
}

export default Notification