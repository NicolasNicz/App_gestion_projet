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
        // Convertir les IDs en ObjectId
        if (req.body.scrumMaster) req.body.scrumMaster = convertToObjectId(req.body.scrumMaster);
        if (req.body.productOwner) req.body.productOwner = convertToObjectId(req.body.productOwner);
        if (req.body.leader) req.body.leader = convertToObjectId(req.body.leader);
        if (req.body.participants) {
            req.body.participants = req.body.participants
                .map((id: string) => convertToObjectId(id))
                .filter((id: any) => id); // Supprime les `undefined`
        }
        if (req.body.stories) {
            req.body.stories = req.body.stories
                .map((id: string) => convertToObjectId(id))
                .filter((id: any) => id);
        }

        const newProject = new DbProject(req.body);
        await newProject.save();
        res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
        console.error(error);
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