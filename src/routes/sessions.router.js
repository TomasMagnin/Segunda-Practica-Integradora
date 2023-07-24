import express from "express";     
import passport from 'passport';

export const sessionsRouter = express.Router();

sessionsRouter.get('/login/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

sessionsRouter.get('/show', (req, res) => {
    return res.send(JSON.stringify(req.session));
});

sessionsRouter.get("/current", (req, res) => {
    console.log(req.session);
    return res.status(200).json({ user: req.session.user });
});