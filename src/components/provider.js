import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";
import { SessionContextProvider } from "@/contexts/sessionContext";

export default function Providers({ children }) {
  return (
    <QueryClientProviderWrapper>
        <SessionContextProvider>
            {children}
        </SessionContextProvider>
    </QueryClientProviderWrapper>
  )
}