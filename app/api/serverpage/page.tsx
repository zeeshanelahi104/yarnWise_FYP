import {getServerSession} from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"

export default async function page() {
    const session = await getServerSession(authOptions)
    console.log("sessionssssss",session)
    return(
        <div>
            {session?.user.permissions}
        </div>
    )
}