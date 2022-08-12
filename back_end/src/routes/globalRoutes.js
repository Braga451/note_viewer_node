import {router as users} from "./users.js";
import {router as notes} from "./notes.js";

const globalRoutes = [
  {
    path: "/users",
    router: users
  },
  {
    path: "/notes",
    router: notes
  }
];

export default globalRoutes;
