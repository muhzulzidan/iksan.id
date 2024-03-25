import Layout from "@/components/layout";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <Layout >
            <div className="flex justify-center items-center h-screen">
                <SignIn />
            </div>
        </Layout>
    )
}