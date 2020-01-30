const express = require('express')
const router = express.Router()
const User = require('../model/User')


// ! GET ALL USERS
router.get('/users', (req, res) => {
    User.findAll().then((result) => {
        res.json(result)
    }).catch((err) => {
        res.send(err)
    })
})


// ! ADD USER
router.post('/users', (req, res) => {
    if(!req.body.firstName) {
        res.status(400)
        res.json({
            msg: 'Bad Data'
        })
    } else {
        User.create(req.body).then(() => {
            res.send('User Added')
        }).catch(err => {
            res.send('Error ' + err)
        })
    }
})

// ! DELETE USER
router.delete('/users/:id', (req, res) => {
    User.destroy({
        where: {
            uid: req.params.id
        }
    }).then(() => {
        res.send('User Deleted')
    }).catch(err => {
        res.send('Error ' + err)
    })
})

// ! UPDATE USER
router.put('/users/:id', (req, res) => {
    if(!req.body.firstName) {
        res.status(400)
        res.json({
            msg: 'Bad Data'
        })
    } else {
        User.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: req.body.password
            },
            {
                where: { uid: req.params.id }
            }
        ).then(() => {
            res.send('User Updated')
        }).catch(err => {
            res.send('Error ' + err)
        })
    }
})

module.exports = router