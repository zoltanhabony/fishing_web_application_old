interface ProfileInterFace {
    userName: string,
    email: string,
    createdAt: Date
    logBookId: string
}

const Profile : React.FC<ProfileInterFace> = ({userName, email, createdAt, logBookId}) => {
    return(
        <div>
            <p>Felhasználó név: {userName}</p>
            <p>E-mail: {email}</p>
            <p>Létrehozás dátuma: {String(createdAt)}</p>
            <p>Fogási napló azonosító: {logBookId}</p>
        </div>
    )
}

export default Profile