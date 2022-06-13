import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';
import bcrypt from 'bcryptjs';

type Data =
    | { msg: string }
    | {
        token: string;
        user: {
            email: string;
            name: string;
            role: string;
        }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        switch (req.method) {
            case 'POST':
                return registerUser(req, res);

            default:
                res.status(400).json({
                    msg: 'Bad request'
                });
        }
    } catch (error) {
        console.log(error);
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email = '', password = '', name = '' } = req.body;


    if (name.length < 2) {
        return res.status(400).json({
            msg: 'El nombre debe ser de 2 caracteres o mas'
        })
    }

    if (email.length < 6) {
        return res.status(400).json({
            msg: 'El correo debe ser de 6 caracteres o mas'
        })
    }

    if ( !validations.isValidEmail( email )) {
        return res.status(400).json({
            msg: 'El correo no es valido'
        })
    }

    await db.connect();
    const user = await User.findOne({ email }).lean();

    if (user) {
        await db.disconnect();
        return res.status(400).json({
            msg: 'No puede usar ese correo'
        })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name
    });

    try {
        await newUser.save({ validateBeforeSave: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contactar con el administrador',
        })
    }

    const { _id, role } = newUser;

    const token = jwt.signToken(_id, email);

    return res.status(200).json({
        token,
        user: {
            email,
            role,
            name
        }
    })
}