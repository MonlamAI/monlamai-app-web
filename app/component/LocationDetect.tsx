import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

const LocationComponent = () => {
    let {user}=useLoaderData();
    let locationFetcher=useFetcher();

    useEffect(() => {
      const fetchData = async () => {
        if( user?.city) return; 
        try {
            const response = await fetch('https://ipapi.co/json');
            const data = await response.json();
            let country=data.country;
            let city=data.city;
            locationFetcher.submit({
            _action:'update_location',
            city,
            country,
            user_id:user?.id
            },{
              action:"/api/user",
              method:'POST'
            })
          } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
  
    return <div id='detectlocation'></div>;
  };
  
  export default LocationComponent;

