import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useCurrentAvailibility = () => {

    const { user } = useContext(AuthContext);

    const { data: currentAvailibilityQuery = [], isLoading: loading, refetch: currentAvailibilityRefetch } = useQuery({
        queryKey: ['currentAvailibilityQuery'],
        queryFn: async () => {
            const res = await fetch(`http://192.168.0.103:5000/donor/current-availability/${user?.email}`);
            return res.json();
        }
    })

    return [currentAvailibilityQuery, currentAvailibilityRefetch]

}

export default useCurrentAvailibility;