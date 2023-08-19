
import { useQuery } from "@tanstack/react-query";


const useAllEmergencyRequests = () => {


    const { data: allEmergencyRequests = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['allEmergencyRequests'],
        queryFn: async () => {
            const res = await fetch('http://192.168.0.103:5000/all-emergency-requests');
            return res.json();
        }
    })

    return [allEmergencyRequests, refetch]

}

export default useAllEmergencyRequests;