import React from 'react';
import { useSession, getSession, signIn, signOut } from "next-auth/react"
const Profile = () => {
    const { data, status } = useSession()
    if (!data) {
        return <div>
            you r not authorizationUrl
        </div>
    }
    return (
        <div>

        </div>
    );
};
export async function getServerSideProps(context) {
    const session =  getSession(context);
    if (!session) {
        context.res.writeHead(302, { Location: "/" });
        context.res.end();
        return {};
    }
    return {
        props: {
            user: session.user,
        },
    };
}

export default Profile;