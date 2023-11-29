import { useQuery } from "react-query";
import { getUserProfile } from "../api/profile";

export function useProfile() {
    const { isLoading, isError, data } = useQuery({ queryFn: getUserProfile });

    return {
        isError,
        isLoading,
        user: data?.data
    }
}