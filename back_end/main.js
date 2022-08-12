import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import "dotenv/config"
import globalRoutes from "./src/routes/globalRoutes.js";
import UsersModel from "./src/models/UsersModel.js";
import NotesModel from "./src/models/NotesModel.js";

async function syncDatabases(){
  await UsersModel.sync();
  await NotesModel.sync();
  return;
}

function setRoutes(app = express, routes = {}){
  routes.forEach((router_object) => {
    app.use(router_object.path, router_object.router);
  })
  return;
}

(async () => {
  await syncDatabases();
  const app = new express(), port = 3001;
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin: process.env.CORS_ORIGIN_HOST,
    credentials: true
  }));
  setRoutes(app, globalRoutes);
  app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
  })
})(); 

