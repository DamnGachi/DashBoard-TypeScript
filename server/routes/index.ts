import Fastify from "fastify";

const router = Fastify();

router.get('/nihao', (req, res) => {
    res.send("HELLO");
});

export default router;
