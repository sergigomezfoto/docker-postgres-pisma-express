import { Router } from "express";
import prisma from './prisma-client.js'
import { errorChecked } from "./utils.js";

const router = Router();


// GET /forums/:id/messages
// POST  /forums/:id/messages
router.get("/",
    errorChecked(async (req, res) => {
        const result = await prisma.forum.findMany({})
        res.status(200).json({
            forums: result, ok: true
        })
    }))

router.get("/:id",
    errorChecked(async (req, res) => {
        const { id } = req.params
        const forum = await prisma.forum.findUniqueOrThrow({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).json(forum);
    }))

router.post("/",
    errorChecked(async (req, res) => {
        const newForum = await prisma.forum.create({ data: req.body })
        res.status(200).json({ newForum, ok: true });
    }))

router.put("/:id",
    errorChecked(async (req, res) => {
        const { id } = req.params
        const updatedForum = await prisma.forum.update({
            where: { id: Number(id) },
            data: req.body
        })
        res.status(200).json(updatedForum);
    }))


router.delete("/:id",
    errorChecked(async (req, res) => {
        const { id } = req.params;
        const deletedForum = await prisma.forum.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({ deleted: deletedForum, ok: true })
    }))

export default router;