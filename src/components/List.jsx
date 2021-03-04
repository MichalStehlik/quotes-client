import {useState, useEffect} from "react";
import {useAppContext} from "../providers/ApplicationProvider";
import axios from "axios";
import {Table, Spinner, Alert} from "reactstrap";
import {BACKEND} from "../configuration/backend";

const List = props => {
    const [{accessToken}] = useAppContext();
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const fetchData = () => {
        setIsLoading(true);
        setError(false);
        axios.get(BACKEND.path + "/quotes", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken
            }
        })
        .then(response => {
            setResponse(response.data);
        })
        .catch(error => {
            setError(true);
            setResponse(null);
        })
        .then(()=>{
            setIsLoading(false);
        });
    }
    useEffect(()=> {
        fetchData();
    },[]);
    if (isLoading)
    {
        return <Spinner />;
    }
    else if (error)
    {
        return <Alert color="danger">Došlo k chybě.</Alert>;
    }
    else if (response && Array.isArray(response))
    {
        return (
            <Table>
            {response.map((item, index) => (
                <tr key={index}>
                    <td>{item.text}</td>
                </tr>
            ))}
            </Table>
        );
    }
    else
    {
        return <Alert color="info">Loading</Alert>
    }
}

export default List;