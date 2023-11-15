import bcycpt from 'bcrypt'

const PasswordHashing = async (password: string): Promise<string> => {
    const salt = await bcycpt.genSalt(10);
    return await bcycpt.hash(password, salt);
}
const PasswordCompare = async(password: string, passwordHash:string): Promise<Boolean> =>{
    return await bcycpt.compare(password, passwordHash);
}

export default {PasswordHashing,PasswordCompare}