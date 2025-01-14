import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList';
import { User } from './Types';

function App() {

  const [users,setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const [filteredCountry, setFilteredCountry] = useState<string | null>(null);



  const originalUsers = useRef<User[]>([]);

  // useReff =>> para guardar un valor que queremos que se comparta entre renderizados. pero qué al cambiar no vuelva a renderizar el componente. 

  const toggleSortByCountry = () => {
    setSortByCountry (prevState => !prevState)
  }


  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email != email)  
    setUsers(filteredUsers)
 
  }

  const toggleColors = () => {
    setShowColors(!showColors)
  }


  useEffect(() => { 
    fetch ('https://randomuser.me/api?results=100')
    .then(async res => await res.json())
    .then(res => {
      setUsers(res.results)
      originalUsers.current = res.results;
    })

    .catch(err => {
      console.error(err)
    })
  }, [])

  const filteredUsers = useMemo(() => {
   return filteredCountry != null && filteredCountry.length > 0 ? users.filter((user => {
      return user.location.country.toLowerCase().includes(filteredCountry.toLowerCase())
    })) : users
  
  },[users, filteredCountry]) 
  // hacer  los cálculos con el estado

 const sortedUsers = useMemo(() => {

  return sortByCountry 
  ? filteredUsers.toSorted((a,b) => { // Se puede usar un spread operator [...users]
    return a.location.country.localeCompare(b.location.country)
  }) :  filteredUsers

 }, [users, sortByCountry])


  return (
    <div className='App'>
      <h1> Prueba técnica </h1>

      <header>
        <button onClick={toggleColors} >
          Colorear Filas
        </button>
        <button onClick={toggleSortByCountry} >
          { sortByCountry ?  'No ordenar' : 'Ordernar por país'}
        </button>

        <button onClick={handleReset}> Resetear </button>

        <input placeholder='Filtra por pais' onChange={(e) => {
          setFilteredCountry(e.target.value)
        }} />
      </header>
      <main>
        <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App
