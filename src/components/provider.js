import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";

export default function Providers({ children }) {
  return (
    <QueryClientProviderWrapper>
      {children}
    </QueryClientProviderWrapper>
  )
}