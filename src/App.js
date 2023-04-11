import { useEffect, useState } from "react";
import './App.css';

const url = "https://api.github.com/users";
const searchUrl = "https://api.github.com/search/users?q=";

function App(){
    const [inputValue,setInputValue] = useState("");
    const [users,setUsers] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isError,setIsError] = useState(false);

    async function getUsers(){

        var response = await fetch(url);
        var users = await response.json();

        if(response.status > 300){
            setIsError(true);
            setIsLoading(false);
        }
        setIsLoading(false);
        setUsers(users);
        
    }

    async function searchusers(userName){
        var response = await fetch(searchUrl+userName);
        var users = await response.json();

        if(response.status > 300){
            setIsError(true);
            setIsLoading(false);
        }
        setIsLoading(false);
        setUsers(users.items);
    }

    function submitHandler(e){
        e.preventDefault();
        
        searchusers(inputValue);
    }

    useEffect(()=>{
        getUsers();
    },[])


    if(isLoading){
        return <h1>Loading...</h1>
    }

    if(isError){
        return <h1>Opps ...</h1>
    }

    return (
        <div className="container">
            <h1>Github Users</h1>
            <form onSubmit={submitHandler}>
                <input
                type="text"
                value={inputValue}
                onChange={(e)=> setInputValue(e.target.value)}
                placeholder="Search"
                />
                <button type="submit">Submit</button>
            </form>
            <ul className="users">
                {
                    users.map((user)=>{
                        return <li key={user.id}>
                            <img src={user.avatar_url} alt={user.login}/>
                        <div>
                            <h4>{user.login}</h4>
                            <a href={user.html_url}>Profile</a>
                        </div>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default App;