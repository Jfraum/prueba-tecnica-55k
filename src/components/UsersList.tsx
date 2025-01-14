import {type User } from '../Types'

interface Props {
    deleteUser: (email: string) => void
    showColors: boolean, 
    users: User[]
}

export function UsersList ({ deleteUser, showColors, users }: Props) {
    return (
     <table width='100%'>
        <thead>
            <tr>

                <th>Foto</th>
                <th>Nombre</th>
                <th>Apellido </th>
                <th>País</th>
                <th>Acciones</th>
    
            </tr>
        </thead>

        <tbody>
            {
                users.map((user, index) => {
                    const backgroundColor = index % 2 == 0 ? '#333' : '"555';
                    const color = showColors ? backgroundColor : 'transparent'

                    return (
                        <tr key={user.email} style= {{backgroundColor: color}}>

                            <td>
                                <img src={user.picture.thumbnail} />
                            </td>
                            <td>
                                {user.name.first}
                            </td>
                            <td>
                                {user.name.last}
                            </td>
                            <td>{user.location.country}</td>
                            <td>
                                <button onClick={() => deleteUser(user.email)}> Borrar </button>
                            </td>
                
                        </tr>
                    )
                })
            }
        </tbody>
     </table>   
    )
}


// table, thead, tbody <------ Son clave
// table completa la tabla
//Thead para los titulos de la tabla 
//tbody para el cuerpo de la tabla

//tr <------  Row
//td <------ celdas