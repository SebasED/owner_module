const ownerService = require('../services/owner.service');
const BaseException = require('../exceptions/baseException');

const getOwnersController = async (req, res) => {
  try {
    const owners = await ownerService.getOwnersService();
    return res.status(200).json(owners);
  } catch (error) {
    if (error instanceof BaseException) return res.status(error.getStatusCode()).json({ message: error.getErrorMessage() });
    return res.status(500).json({ message: 'Lo sentimos, ha ocurrido un problema' });
  }
};

const getOwnerByIdController = async (req, res) => {
  try {
    const { owner_id } = req.params;
    const owner = await ownerService.getOwnerByIdService(owner_id);
    return res.status(200).json(owner);
  } catch (error) {
    if (error instanceof BaseException) return res.status(error.getStatusCode()).json({ message: error.getErrorMessage() });
    return res.status(500).json({ message: 'Lo sentimos, ha ocurrido un problema' });
  }
};

const createOwnerController = async (req, res) => {
  try {
    const owner = req.body;
    const newOwner = await ownerService.createOwnerService(owner);
    return res.status(200).json(newOwner);
  } catch (error) {
    if (error instanceof BaseException) return res.status(error.getStatusCode()).json({ message: error.getErrorMessage() });
    return res.status(500).json({ message: 'Lo sentimos, ha ocurrido un problema' });
  }
};

const updateOwnerByIdController = async (req, res) => {
  try {
    const { owner_id } = req.params;
    const owner = req.body;
    const updatedOwner = await ownerService.updateOwnerService(owner_id, owner);
    return res.status(200).json(updatedOwner);
  } catch (error) {
    if (error instanceof BaseException) return res.status(error.getStatusCode()).json({ message: error.getErrorMessage() });
    return res.status(500).json({ message: 'Lo sentimos, ha ocurrido un problema' });
  }
};

const deleteOwnerByIdController = async (req, res) => {
  try {
    const { owner_id } = req.params;
    await ownerService.deleteOwnerService(owner_id);
    return res.status(200).json({ message: 'El propietario ha sido eliminado' });
  } catch (error) {
    if (error instanceof BaseException) return res.status(error.getStatusCode()).json({ message: error.getErrorMessage() });
    return res.status(500).json({ message: 'Lo sentimos, ha ocurrido un problema' });
  }
};

const addPetController = async (req, res) => {
  const data = req.body;
  const updatePetOwner = await ownerService.addPetService(data);
  if (updatePetOwner === String) {
    return res.status(400).json({message: updatePetOwner});
  }
  return res.status(200).json(updatePetOwner);
};

module.exports = {
  getOwnersController,
  getOwnerByIdController,
  createOwnerController,
  updateOwnerByIdController,
  deleteOwnerByIdController,
  addPetController,
};
