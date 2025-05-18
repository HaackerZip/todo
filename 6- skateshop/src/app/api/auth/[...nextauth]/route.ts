// import { handlers } from "@/lib/auth"; // Referring to the auth.ts we just created

// if (!handlers || !handlers.GET || !handlers.POST) {
//   throw new Error("handlers object is missing GET or POST properties");
// }

// export const { GET, POST } = handlers;  

import { handlers } from "@/lib/auth"
export const { GET, POST } = handlers