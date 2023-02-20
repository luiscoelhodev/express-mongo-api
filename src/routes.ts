import { Router } from 'express';
const route = Router();

route.get('/', (_req, res) => {
  return res.json({ hello: 'world' });
});

export { route };
