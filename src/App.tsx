import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { SortBy, type User } from './types.d';
import { UserList } from './components/UserList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const originalUsers = useRef<User[]>([]);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const [filterAge, setFilterAge] = useState<string | null>(null);
  const [directionChange, setDirectionChange] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const toggleSortByAge = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.AGE : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const toggleSortByGender = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.GENDER : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const toggleSortByUsername = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.USERNAME : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleRestore = () => {
    setUsers(originalUsers.current);
  };

  const handleDeleteUser = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email);
    setUsers(filteredUsers);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
    setDirectionChange(!directionChange);
  };

  const handleDeleteSort = () => {
    sorting !== SortBy.NONE ? setSorting(SortBy.NONE) : null;
  };

  useEffect(() => {
    fetch('https://randomuser.me/api/?page=3&results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch(err => console.log(err));
  }, []);

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
    if (sorting === SortBy.NONE) {
      setDirectionChange(false);
      return filteredUsers;
    }

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
        <UserList
          changeSort={handleChangeSort}
          deleteUser={handleDeleteUser}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </div>
  );
}

export default App;
