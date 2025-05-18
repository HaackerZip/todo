import { auth } from "@/lib/auth";

export default async function Profile() {
  const session = await auth();

    return (
      <div className="bg-deep-black p-6 rounded-lg shadow-lg">
        {session?.user && (
          <div> 
            <p>ID: {session.user.id}</p>
            <p>Email: {session.user.email}</p>
            {session.user.name && <p>Name: {session.user.name}</p>}
          </div>
        )}
      </div>
    )
  }
  
  