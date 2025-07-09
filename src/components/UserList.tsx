import { SortBy, type User } from '../types.d';

interface Props {
  changeSort: (sort: SortBy) => void;
  deleteUser: (email: string) => void;
  showColors: boolean;
  users: User[];
}

export function UserList({ changeSort, deleteUser, showColors, users }: Props) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Copiado al portapapeles');
      })
      .catch(() => {
        alert('Error al copiar al portapapeles');
      });
  };

  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Foto</th>
          <th className="pointer" onClick={() => changeSort(SortBy.NAME)}>
            Nombre
          </th>
          <th className="pointer" onClick={() => changeSort(SortBy.LAST)}>
            Apellido
          </th>
          <th className="pointer" onClick={() => changeSort(SortBy.COUNTRY)}>
            País
          </th>
          <th className="pointer" onClick={() => changeSort(SortBy.AGE)}>
            Edad
          </th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555';
          const color = showColors ? backgroundColor : 'transparent';

          return (
            <tr key={user.cell} style={{ backgroundColor: color }}>
              <td>
                <img
                  title={user.login.username}
                  onClick={() => copyToClipboard(user.login.username)}
                  className="pointer"
                  src={user.picture.thumbnail}
                  alt={user.name.first}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>{user.dob.age}</td>
              <td>
                <button onClick={() => deleteUser(user.email)}>Eliminar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
