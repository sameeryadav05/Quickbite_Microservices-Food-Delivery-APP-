import bcrypt from 'bcryptjs'


export async function hashPassword(password:string,salt:number = 10):Promise<string>
{ 
        const hashed_password = await bcrypt.hash(password,salt);
        return hashed_password;
}

export async function comparePasswords(password:string,hashedPassword:string):Promise<boolean>
{
    const isValidPassword  = await bcrypt.compare(password,hashedPassword);
    return isValidPassword;
}