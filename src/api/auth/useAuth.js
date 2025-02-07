import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    console.log(token);

    if (!token) {
      router.replace("/login"); // Redirect to login if user is not authenticated
    }
  }, [router]); // Include 'router' in the dependency array
};

export default useAuth;
