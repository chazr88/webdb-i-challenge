const express = require("express");

// database access using knex
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        //Gets all from posts
        const accounts = await db("accounts");
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ message: "error getting accounts", error: err });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {

        const [account] = await db('accounts').where({id});
        if(account){
            res.status(200).json(account);
        } else {
            res.status(404).json({message: `could not find account with id ${id}`})
        }

    } catch (err) {
        res.status(500).json({ message: "error getting accounts", error: err });
    }
});

router.post("/", async (req, res) => {
    const accountData = req.body;

    try {
        const account = await db('accounts').insert(accountData);
        res.status(201).json(account);
    } catch (err) {
        res.status(500).json({message: `could not add your account`});
    }
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    
    try {
        const count = await db('accounts').where('id', '=', id).update(changes);
        if (count) {
            res.status(200).json({updated: count});
        } else {
            res.status(404).json({message: `could not find account#${id}`})
        }
    } catch (err) { 
        res.status(500).json({message: `could not update the accounts`, error: err});
    }

});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const account =await db('accounts').where({id}).del();
        if(account){
            res.status(200).json({message: `deleted account`});
        } else {
            res.status(404).json({message: `could not find account#${id}`})
        }
 
    } catch (err) {
        res.status(500).json({message: `could not delete the account`, error: err});
    }
});



module.exports = router;