const router = require('express').Router()

let Contact = require('../models/contact.model')

router.route('/').get((req, res)=>{
    Contact.find()
        .then(contact => res.json(contact))
        .catch(err => res.json(err))
})

router.route('/add').post((req, res) =>{
    const name = req.body.name
    const dob = Date.parse(req.body.dob)
    const mobile = req.body.mobile
    const email = req.body.email
    const newContact = new Contact({
        name, dob, mobile, email
    })
    newContact.save()
        .then(()=> res.json("added"))
        .catch((err)=> res.json(err))
})

router.route('/update/:id').post((req, res)=>{
    Contact.findById(req.params.id)
        .then(contact => {
            contact.name = req.body.name
            contact.dob = Date.parse(req.body.dob)
            contact.mobile = req.body.mobile
            contact.email = req.body.email
            contact.save()
                .then(()=> res.json("updated"))
        })
        .catch((err)=> res.json(err))
})

router.route('/delete/:id').delete((req, res) =>{
    console.log("deleting" + req.params.id)
    Contact.findByIdAndDelete(req.params.id)
        .then(()=> res.json("deleted"))
        .catch((err) => res.json(err))
})
router.route('/find').get((req,res)=>{
    Contact.find({name:new RegExp(req.query.q,'i')},(err,results)=>{
        res.json(results)
    })
})


module.exports = router