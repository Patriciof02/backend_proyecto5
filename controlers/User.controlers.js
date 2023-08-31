const mongoose = require('mongoose')
const generateToken = require('../helpers/generateToken')
const hashPassword = require('../helpers/hashPassword')
const User = mongoose.model('User')



const signup = async (req, res) => {
    const {username, mail, pass} = req.body
    const mailLowerCase = mail.toLowerCase()
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(!regexPassword.test(pass)){
        return res.status(401).json({
            message:'Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter'
        })
    }
    const hashedPassword = hashPassword(pass)

    try{
        const user = new User({
            username,
           mail:  mailLowerCase,
           pass: hashedPassword

        })
        const resp = await user.save()
        // const resp = await User.create(req.body) 
        const token = generateToken(resp)
        console.log(resp)
        return res.status(201).json({
            message : 'User Created',
            token
        })
    }catch(error){
        console.error(error)
        return res.status(500).json({
            message:'internal servel error',
            detail: error,
        })
        
    }
    
}

const getUsers = async (req, res) => {
    try {
        const resp = await User.find()
        return res.status(200).json({
            message:'ok',
            detail: resp
        })

    }catch(error){
        return res.status(500).json({
            message:'internal servel error',
            detail: error,

    })
}
}


const updateUser = async (req, res) => {
    const {_id, userUpdated} = req.body
    console.log(_id, userUpdated)
    try {
        const resp = await User.findByIdAndUpdate(_id,userUpdated,{new:true})
        return res.status(200).json({
            message:'ok',
            detail: resp
        })

    }catch(error){
        return res.status(500).json({
            message:'internal servel error',
            detail: error,

    })
}
}
const deleteUser = async (req, res) => {
    const {_id} =req.body
    try {
        const resp = await User.findByIdAndDelete(_id)
        return res.status(200).json({
            message:'ok',
            detail: resp
        })

    }catch(error){
        return res.status(500).json({
            message:'internal servel error',
            detail: error,

    })
}
}

const login=async(req,res)=>{

    const{mail,pass}=req.body
    const mailLowerCase=mail.toLowerCase()
    const passwordHash=hashPassword(pass)

    try {    
        const userValidated=await User.findOne({mail:mailLowerCase})
        if(!userValidated){
            return res.status(401).json({
                message:'Usuario no registrado'
            })
        }        

        console.log(`${userValidated.pass} vs ${passwordHash}`)
        if(userValidated.pass===passwordHash){
            console.log(`coinciden`)
            const token=generateToken(userValidated)
            return res.status(200).json({      

                message: 'User logged in successfully',    
                token      
            });
        }else{
            return res.status(401).json({
                message:'Invalid Password'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:'Server Error'
        })
    }

}
// const login = async (req, res) => {
//     const {mail, pass} = req.body
//     const mailLowerCase = mail.toLowerCase()
//     const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
//     try {
//         const hashedPassword = hashPassword(pass)
//         const user = await User.findOne({
//            mail: mailLowerCase,
//            pass: hashedPassword
//         })
//         const {mail, pass} = user
//         console.log(user)
//         return res.status(200).json({
//             message:'user loggued in successfully',
//             token
//         })
      

//     }catch(error){
//         return res.status(401).json({
//             message:'error usuario',
//             detail: error,

//     })
    

// }
// }


const getUserById = async (req, res) =>{
    const {_id} = req.params
    try {
        const user = await User.findOne({_id})
        if(user){
            return res.status(200).json({
                message:'ok',
                detail: user
            })
        }
        return res.status(404).json({
            message:'not found'
        })}

        catch (error){
            return re.status(500).json({
                message:'server error'
            })
        
}

    
}



module.exports ={
    signup,
    getUsers,
    deleteUser,
    updateUser,
    login,
    getUserById
}