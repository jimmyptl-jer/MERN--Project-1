import Player from "../models/playerModel.js";

export const addNewPlayer = (req, res) => {
  let newPlayer = new Player(req.body);

  newPlayer.save((err, Player) => {
    if (err) {
      res.status(403).send({ message: err });
    }
    res.json(Player);
  })
}


export const getPlayers = (req, res) => {

  Player.find({}, (err, Player) => {
    if (err) {
      res.status(500).send("There was a problem finding the players.");
    }
    res.status(200).json(Player)
  })
}

export const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params.PlayerId;
    const player = await Player.findById(id);

    return res.status(200).send({
      player
    })
  } catch (error) {
    console.log('Error getting player by ID', error);
    return res.status(500).send({ message: error.message })
  }
}

export const updatePlayer = async (req, res) => {
  const playerId = req.params.PlayerId
  const updatedData = req.body

  try {
    const updatedPlayer = await Player.findByIdAndUpdate(playerId, updatedData, { new: true })

    if (updatedPlayer) {
      res.json(updatedPlayer); // Respond with the updated player data
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params.PlayerId; // Corrected from req.params.PlayerId to req.params.id
    const player = await Player.deleteOne({ _id: id }); // Use { _id: id } to delete by ID

    if (player.deletedCount === 1) {
      return res.status(200).send({
        message: 'Player deleted successfully',
      });
    } else {
      return res.status(404).send({
        message: 'Player not found',
      });
    }
  } catch (error) {
    console.log('Error deleting player by ID', error);
    return res.status(500).send({ message: error.message });
  }
};
