import express from 'express';
import { addNewPlayer, getPlayerById, getPlayers,deletePlayer,updatePlayer } from "../controller/playerController.js";

// Create an Express.js router instance
const router = express.Router();

// Define the routes and associate them with the corresponding controller functions

router.post('/',addNewPlayer);
router.get('/',getPlayers);
router.get('/:PlayerId',getPlayerById)
router.delete('/:PlayerId',deletePlayer)
router.put('/:PlayerId',updatePlayer)

// Export the router to be used in your main application
export default router;