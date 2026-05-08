import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {

    const { data, isError, isLoading } = useAuth();

    if(isLoading) return "Cargando...";
    if(data) {
        return <Navigate to={"/"} />
    }

    if(isError) return (
        <>
            <div className="bg-gray-800 min-h-screen">
                <div className="py-10 lg:py-20 mx-auto w-112.5">
                    <Logo />

                    <div className="mt-10">
                        <Outlet />
                    </div>
                </div>
            </div>

            <ToastContainer 
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
