const express = require('express')
const members = require('../../Members')
const uuid = require('uuid')

const router = express.Router()


// GET ALL MEMBERS
router.get('/', (req, res) => {
    res.json(members)
})

// GET A SINGLE MEMBERS
router.get('/:id', (req, res)=>  {
    const find = members.some(mem=>mem.id ===parseInt(req.params.id))

    if(find) {
        res.json(members.filter(mem=>mem.id===parseInt(req.params.id)))
    } else {
        res.status(404).json({message: 'NOT FOUND'})
    }
})

//ADD member 
router.post('/', (req, res)=> {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({message: 'Please include a name and an email'})
    }

    members.push(newMember)
    res.status(201).json(members)
    // res.redirect('/')
})

// UPDATE MEMBERS
router.put('/:id', (req, res)=>  {
    const find = members.some(mem=>mem.id ===parseInt(req.params.id))

    if(find) {
        const updateMember = req.body
        members.forEach(member=> {
            if(member.id === parseInt(req.params.id))  {
                member.name = req.body.name ? req.body.name : member.name
                member.email = req.body.email ? req.body.email : member.email

                res.status(200).json({message : 'member updated', member})
            }
        }) 
    } else {
        res.status(404).json({message: 'NOT FOUND'})
    }
})

// DELETE A SINGLE MEMBERS
router.delete('/:id', (req, res)=>  {
    const find = members.some(mem=>mem.id ===parseInt(req.params.id))

    if(find) {
        res.json({message: 'member deleted',members:members.filter(mem=>mem.id!==parseInt(req.params.id))})
    } else {
        res.status(404).json({message: 'NOT FOUND'})
    }
})
    
module.exports = router