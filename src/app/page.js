import "./globals.css";
import Table from "@/components/Table";
import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";

export default function Home() {

    return (
        <QueryClientProviderWrapper>
            <Table />
        </QueryClientProviderWrapper>
    );
}
