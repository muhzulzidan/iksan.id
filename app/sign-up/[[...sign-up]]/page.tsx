import Layout from "@/components/layout";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <Layout >
            <div className="flex justify-center items-center h-screen">
                <SignUp />
            </div>
        </Layout>
    )
}