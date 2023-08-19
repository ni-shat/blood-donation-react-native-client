import { useQuery } from "@tanstack/react-query";


const useAllDonors = () => {


    const { data: alldonors = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['alldonors'],
        queryFn: async () => {
            const res = await fetch('http://192.168.0.103:5000/alldonors');
            return res.json();
        }
    })

    return [alldonors, refetch]

}

export default useAllDonors;