import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";
import { SessionContextProvider } from "@/contexts/sessionContext";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }) {
  return (
    <QueryClientProviderWrapper>
        <ToastContainer />
        <SessionContextProvider>
            {children}
        </SessionContextProvider>
    </QueryClientProviderWrapper>
  )
}