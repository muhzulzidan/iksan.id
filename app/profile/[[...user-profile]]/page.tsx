"use client";

import Layout from "@/components/layout";
import { UserProfile } from "@clerk/nextjs";
import { UserPlus, ReplyIcon, History } from "lucide-react";

// import { CustomProfilePage, CustomTerms } from "../components";
// import { CustomIcon } from "../icons";

const UserProfilePage = () => (
  <Layout>
       <div className="max-w-screen-lg mx-auto container py-12">
            <UserProfile path="/profile" routing="path">
                <UserProfile.Page label="account" />
                <UserProfile.Page label="security" />
                <UserProfile.Link label="Go Back" labelIcon={<History size={20} />} url="/my-account" />
            </UserProfile>
       </div>
  </Layout>
);

export default UserProfilePage;