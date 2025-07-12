import { useMemo, useState } from 'react';
import './App.css';
import { SortBy } from './types.d';
import { UserList } from './components/UserList';
import { useUsers } from './hooks/useUsers';

function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage, deletedUser } = useUsers();

  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);

  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const [filterAge, setFilterAge] = useState<string | null>(null);

  const [showColors, setShowColors] = useState(false);
  const [directionChange, setDirectionChange] = useState(false);

  // const originalUsers = useRef<User[]>([]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
    if (newSortingValue === SortBy.NONE) setDirectionChange(false);
  };

  const toggleSortByAge = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.AGE : SortBy.NONE;
    setSorting(newSortingValue);
    if (newSortingValue === SortBy.NONE) setDirectionChange(false);
  };

  const toggleSortByGender = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.GENDER : SortBy.NONE;
    setSorting(newSortingValue);
    if (newSortingValue === SortBy.NONE) setDirectionChange(false);
  };

  const toggleSortByUsername = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.USERNAME : SortBy.NONE;
    setSorting(newSortingValue);
    if (newSortingValue === SortBy.NONE) setDirectionChange(false);
  };

  const handleRestore = async () => {
    setFilterCountry(null);
    setFilterAge(null);
    setSorting(SortBy.NONE);
    setDirectionChange(false);
    await refetch();
  };

  const handleDeleteUser = (email: string) => {
    deletedUser(email.toLowerCase());
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
    setDirectionChange(!directionChange);
  };

  const handleDeleteSort = () => {
    setSorting(SortBy.NONE);
  };

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry?.length > 0
      ? users.filter(user => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : filterAge !== null && filterAge?.length > 0
        ? users.filter(user => {
            return user.dob.age.toString().includes(filterAge);
          })
        : users;
  }, [users, filterCountry, filterAge]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    if (sorting === SortBy.NAME) {
      return directionChange
        ? filteredUsers.toSorted((a, b) =>
            a.name.first.localeCompare(b.name.first)
          )
        : filteredUsers.toSorted((a, b) =>
            b.name.first.localeCompare(a.name.first)
          );
    }

    if (sorting === SortBy.LAST) {
      return directionChange
        ? filteredUsers.toSorted((a, b) =>
            a.name.last.localeCompare(b.name.last)
          )
        : filteredUsers.toSorted((a, b) =>
            b.name.last.localeCompare(a.name.last)
          );
    }

    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) =>
        directionChange
          ? a.location.country.localeCompare(b.location.country)
          : b.location.country.localeCompare(a.location.country)
      );
    }

    if (sorting === SortBy.AGE) {
      return [...filteredUsers].toSorted((a, b) =>
        directionChange
          ? b.dob.age.toString().localeCompare(a.dob.age.toString())
          : a.dob.age.toString().localeCompare(b.dob.age.toString())
      );
    }

    if (sorting === SortBy.GENDER) {
      return [...filteredUsers].toSorted((a, b) =>
        directionChange
          ? b.gender.localeCompare(a.gender)
          : a.gender.localeCompare(b.gender)
      );
    }

    if (sorting === SortBy.USERNAME) {
      return [...filteredUsers].toSorted((a, b) =>
        directionChange
          ? b.login.username.localeCompare(a.login.username)
          : a.login.username.localeCompare(b.login.username)
      );
    }

    return filteredUsers;
  }, [filteredUsers, sorting, directionChange]);

  return (
    <div className="App">
      <h1>List of Clients</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? 'No ordenar por pais'
            : 'Ordenar por pais'}
        </button>
        <button onClick={toggleSortByAge}>
          {sorting === SortBy.AGE ? 'No ordenar por edad' : 'Ordenar por edad'}
        </button>
        <button onClick={toggleSortByGender}>
          {sorting === SortBy.GENDER
            ? 'No ordenar por género'
            : 'Ordenar por género'}
        </button>
        <button onClick={toggleSortByUsername}>
          {sorting === SortBy.USERNAME
            ? 'No ordenar por nombre de usuario'
            : 'Ordenar por nombre de usuario'}
        </button>
        <button onClick={handleRestore}>Restaurar</button>
        <input
          type="text"
          placeholder="Filtrar por pais"
          onChange={e => setFilterCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por edad"
          onChange={e => setFilterAge(e.target.value)}
        />
        <button
          onClick={() => setDirectionChange(!directionChange)}
          disabled={sorting === SortBy.NONE}
        >
          {directionChange ? (
            <span className="material-symbols-outlined">edit_arrow_up</span>
          ) : (
            <span className="material-symbols-outlined">edit_arrow_down</span>
          )}
        </button>
        <button onClick={handleDeleteSort} disabled={sorting === SortBy.NONE}>
          <span className="material-symbols-outlined">filter_list_off</span>
        </button>
      </header>
      <main>
        {users.length > 0 && (
          <UserList
            changeSort={handleChangeSort}
            deleteUser={handleDeleteUser}
            showColors={showColors}
            users={sortedUsers}
          />
        )}
        {isLoading && <div>Cargando...</div>}
        {isError && <div>Error</div>}
        {!isLoading && users.length === 0 && <p>No hay usuarios</p>}

        {users.length > 0 && hasNextPage && (
          <button onClick={async () => await fetchNextPage()}>Next</button>
        )}

        {users.length > 0 && !hasNextPage && <p>No hay más usuarios</p>}
      </main>
    </div>
  );
}

export default App;
