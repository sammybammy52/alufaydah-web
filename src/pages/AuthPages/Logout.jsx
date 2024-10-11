import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  useEffect(() => {
    const handleLogout = async () => {
      const result = await logout();
      window.location.href = "/";
    };
    handleLogout();
  }, []);

  return (
    <>
    <Loading/>
    </>
  );
};

export default Logout;
