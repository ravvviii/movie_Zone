// This custom hook is used to fetch data from an API using the provided fetch function.
// It manages the loading state, error state, and the fetched data.
// The `useFetch` hook takes a fetch function and an optional `autoFetch` parameter.
// The `fetchData` function is defined to handle the actual fetching of data.
// It sets the loading state to true, resets the error state, and calls the provided fetch function.
// If the fetch is successful, it sets the fetched data.
// If an error occurs, it sets the error state.
// The `reset` function is defined to reset the data, error, and loading state.    


import { useEffect, useState } from "react";



const useFetch = <T>(fetchFunction:()=> Promise<T>, autoFetch = true)=>{
    const[data, setData] = useState<T | null>(null);    
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState<Error | null>(null);


    const fetchData = async ()=>{


        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            setData(result);
            
        } catch (error) {
            //@ts-ignore
            setError(error instanceof Error? error : new Error("An unknown error occurred"));
            
        }
        finally{
            setLoading(false);
        }
    }
    const reset =()=>{
        setData(null);
        setError(null);
        setLoading(false);
    }


    useEffect(()=>{
        if(autoFetch){
            fetchData();
        }
    }
    , [autoFetch]);
    return {
        data,
        loading,
        error,
        refetch:fetchData,
        reset
    };
}
export default useFetch;
                 