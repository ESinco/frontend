import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";

export function Providers ({children}) {
  return (
    <QueryClientProviderWrapper>
      {children}
    </QueryClientProviderWrapper>
  )
}