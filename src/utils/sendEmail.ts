import { UsersModel } from '../database/sequelize/userModel';
import * as nodemailer from 'nodemailer';


export const sendEmail = async (email: string) => {
//   console.log('send mail', req);

  const user: any = await UsersModel.findOne({
    where: { email: email },
  });
  if (user) {
     const otp = Math.floor(199999 + Math.random() * 999999);
    // // Generate a unique token for password reset
    // const { token }: any = await createTokens(user.email);
    // console.log('reset Tokens', token);

    // // Save the reset token in the database
    user.otp = top;
    await user.save();

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mailto:pranayshukla9926@gmail.com',
        pass: 'kgoi vbjx rsok qeax',
      },
    });

    // Send email with password reset link
    const mailOptions = {
      from: 'mailto:pranayshukla9926@gmail.comm',
      to: user.email,
      subject: 'Password Reset',
      html: `<!doctype html><html lang="en-US"><head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Reset Password Email Template</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover { text-decoration: underline !important; } </style></head><body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"> <!--100% body table--> <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;">&nbsp;</td> </tr> <tr> <td style="height:20px;">&nbsp;</td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;">&nbsp;</td> </tr> <tr> <td style="padding:0 35px;"> <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"> You have requested to reset your password</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span> <p style="color:#455056; font-size:15px;line-height:24px; margin:0;"> We cannot simply send you your old password. A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions. </p> <a href="" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px; cursor: pointer; ">${otp}</a> </td> </tr> <tr> <td style="height:40px;">&nbsp;</td> </tr> </table> </td> <tr> <td style="height:20px;">&nbsp;</td> </tr></table> <!--/100% body table--></body></html>`,
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.log('send mail', error);
      } else {
        console.log(user.email);
        console.log('Email sent: ' + info.response);
        return info.response;
      }
    });
  } else {
    throw 'user not found';
  }
};


        /////



//       return user ? user.toJSON() : null;
//     } catch (error) {
//       console.error('Error occurred while finding user:', error);
//       throw error; // Re-throw the error to be handled by the controller
//     }

// }
