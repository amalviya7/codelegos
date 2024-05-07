import { UsersModel } from "../database/sequelize/userModel";
import { generateSalt, hashPassword } from "../utils/hashedPassword";
import { SignUpNameSpace } from '../../custom';

export const createUser = async (req: SignUpNameSpace.Register) => {
  const salt = generateSalt();
  const hashedpassword = hashPassword(req.password, salt);

  try {
    return await UsersModel.create({
      first_name: req.first_name,
      last_name: req.last_name,
      email: req.email,
      contact_number: req.contact_number,
      password: hashedpassword,
      salt: salt,
    });
  } catch (error: any) {
    throw error;
    return { status: 400, error: error.errors[0].message };
  }
};


export const getUserDetails = async (userId: any) =>
  await UsersModel.findOne({
    where: {
      id: userId,
      isActive: true,
    },
  });
