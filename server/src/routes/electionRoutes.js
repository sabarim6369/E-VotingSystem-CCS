import { Router } from 'express';
import {
  getElectionsForUser,
  castVote,
  createElection,
  addCandidate,
  getAllElectionsAdmin,
  setElectionStatus,
  getElectionResults
} from '../controllers/electionController.js';
import { authenticateAdmin, authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/user/elections', authenticateUser, getElectionsForUser);
router.post('/user/elections/:electionId/vote', authenticateUser, castVote);

router.post('/admin/elections', authenticateAdmin, createElection);
router.get('/admin/elections', authenticateAdmin, getAllElectionsAdmin);
router.post('/admin/elections/:electionId/candidates', authenticateAdmin, addCandidate);
router.patch('/admin/elections/:electionId/status', authenticateAdmin, setElectionStatus);
router.get('/admin/elections/:electionId/results', authenticateAdmin, getElectionResults);

export default router;
