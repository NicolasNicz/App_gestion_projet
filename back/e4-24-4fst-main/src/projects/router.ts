import { NextFunction, Request, Router } from "express"
import { DbProject } from "./db/models"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose";

export const createProjectRoutes = () => {
    const projectRoutes = Router()

    function convertToObjectId(value: any) {
      return mongoose.Types.ObjectId.isValid(value) ? new mongoose.Types.ObjectId(value) : undefined;
  }

  projectRoutes.post("/", async (req, res, next) => {
    try {
      console.log('Données reçues:', req.body);

      // Convertir les IDs en ObjectId
      if (req.body.scrumMaster) {
          req.body.scrumMaster = convertToObjectId(req.body.scrumMaster);
          console.log('Scrum Master:', req.body.scrumMaster);
      }
      if (req.body.productOwner) {
          req.body.productOwner = convertToObjectId(req.body.productOwner);
          console.log('Product Owner:', req.body.productOwner);
      }
      if (req.body.leader) {
          req.body.leader = convertToObjectId(req.body.leader);
          console.log('Leader:', req.body.leader);
      }

      // Conversion des participants (si c'est une chaîne)
      if (req.body.participants) {
          if (typeof req.body.participants === "string") {
              req.body.participants = req.body.participants
                  .split(",") // Séparer par des virgules
                  .map((id: string) => convertToObjectId(id.trim())) // Convertir en ObjectId
                  .filter((id: any) => id); // Supprimer les `undefined`
          } else if (Array.isArray(req.body.participants)) {
              req.body.participants = req.body.participants
                  .map((id: string) => convertToObjectId(id))
                  .filter((id: any) => id); // Supprimer les `undefined`
          }
          console.log('Participants après transformation:', req.body.participants);
      }

      // Conversion des stories (si c'est une chaîne)
      if (req.body.stories) {
          if (typeof req.body.stories === "string") {
              req.body.stories = req.body.stories
                  .split(",") // Séparer par des virgules
                  .map((id: string) => convertToObjectId(id.trim())) // Convertir en ObjectId
                  .filter((id: any) => id); // Supprimer les `undefined`
          } else if (Array.isArray(req.body.stories)) {
              req.body.stories = req.body.stories
                  .map((id: string) => convertToObjectId(id))
                  .filter((id: any) => id); // Supprimer les `undefined`
          }
          console.log('Stories après transformation:', req.body.stories);
      }

      // Créer un nouveau projet
      const newProject = new DbProject(req.body);
      await newProject.save();
      res.sendStatus(StatusCodes.CREATED);
  } catch (error) {
      console.error('Erreur lors de l\'ajout du projet:', error);
      next(error);
  }
});

    projectRoutes.put(
      '/:id',
      async ( req,
        res,
        next
      ) => {
        try {
          console.log("body",req.body);
          
            let project = await DbProject.updateOne({_id:req.params.id},req.body)
            res.sendStatus(StatusCodes.CREATED)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )

    projectRoutes.get(
      '/:id',
      async ( req,
        res,
        next
      ) => {
        try {
            let project = await DbProject.findById(req.params.id)
            project?.populate('leader')
            res.json(project)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )

    projectRoutes.get(
      '/',
      async ( req,
        res,
        next
      ) => {
        try {
            let projects = await DbProject.find().limit(20).populate('leader','_id name email')
            res.json(projects)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )

    projectRoutes.delete(
      '/:id',
      async ( req,
        res,
        next
      ) => {
        try {
            console.log("body",req.body);
             
            await DbProject.deleteOne(req.body.id)
            res.sendStatus(StatusCodes.OK)
        } catch (error) {
            console.log(error);
            next(error)
        }
      }
    )
    return projectRoutes
}