import JWT from 'jsonwebtoken';

export const signToken = (uid: string, email: string) => {
    if( !process.env.JWT_SECRET_SEED ){
        throw new Error('No hay semilla de JWT');
    } 
    
    return JWT.sign(
        //Payload
        { uid, email },
        
        //Seed
        process.env.JWT_SECRET_SEED,
        
        //Options
        { expiresIn: '900000' }
    )
}

export const isValidToken = ( token: string ):Promise<string> => {
    if( !process.env.JWT_SECRET_SEED ){
        throw new Error('No hay semilla de JWT');
    }

    if( token.length <= 10 ){
        return Promise.reject('JWT no es valido');
    }

    return new Promise((resolve, reject) => {
        try {
            JWT.verify( token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if( err ) return reject('JWT no es valido');

                const { _id } = payload as { _id: string };

                resolve(_id);
            })
        } catch (error) {
            reject('JWT no es valido');
        }
    }) 
}