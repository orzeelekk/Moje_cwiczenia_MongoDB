import express from "express"
const router = express.Router();

const users = []
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
});

router.post('/',(req,res) => {
  console.log(req.body)
  users.push(req.body)
  res.end()
})
router.get('/:id',(req,res) => {
  const id = req.params.id
  const user = users.find(user => user.uuid === id)
  res.json(user)
})

export default router
