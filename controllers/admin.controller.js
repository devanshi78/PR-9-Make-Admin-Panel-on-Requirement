import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

let otp = null;

const adminController = {
  homepage(req, res) {
    return res.render('./index.ejs');
  },
  signupUserPage(req, res) {
    return res.render('./pages/signup.ejs');
  },
  async signupUser(req, res) {
    try {
      const { password, confirmpassword } = req.body;

      if (password != confirmpassword) {
        req.flash('error', "Password And Confirm PassWord Not Matched.");
        return res.redirect('/signup');
      }

      const hashpassword = await bcrypt.hash(password, 10);

      req.body.password = hashpassword;

      const user = await User.create(req.body);

      console.log(user + ' User Created.');
      return res.redirect('/login');
    } catch (error) {
      console.log(error.message)
      return res.redirect('/signup');
    }
  },
  loginUserPage(req, res) {
    return res.render('./pages/login.ejs');
  },
  async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      let user = await User.findOne({ username });

      if (user) {
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          req.flash('success', 'Login Successfull.');
          res.cookie('id', user.id);
          return res.redirect('/');
        } else {
          req.flash('error', "Password Not Match.")
          return res.redirect(req.get('Referrer') || '/')
        }
      } else {
        req.flash('error', 'User Not Found.');
        return res.redirect(req.get('Referrer') || '/');
      }
    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get('Referrer') || '/');
    }
  },
  profilePage(req, res) {
    return res.render('./pages/profile.ejs');
  },
  logout(req, res) {
    res.clearCookie('id');
    return res.redirect('/login');
  },
  async editUserpage(req, res) {
    try {
      const user = await User.findById(req.params.id);
      return res.render('./pages/editUser.ejs', {
        user
      })
    } catch (error) {
      console.log(error.message);
      return res.redirect('/profile');
    }
  },
  async editUser(req, res) {
    try {
      let data = req.body;

      // If new image uploaded
      if (req.file) {
        data.image = req.file.filename;
      }
      await User.findByIdAndUpdate(req.params.id, data, { new: true });
      return res.redirect('/profile');
    } catch (error) {
      console.log(error.message);
      return res.redirect('/edit-user');
    }
  },
  accountSettingPage(req, res) {
    return res.render('./pages/accountSettings.ejs');
  },
  async accountSetting(req, res) {
    try {
      const { currentPassword, newPassword, confirmpassword } = req.body;
      const { id } = req.cookies;

      let user = await User.findById(id);

      let isValid = await bcrypt.compare(currentPassword, user.password);

      if (isValid) {
        if (newPassword == confirmpassword) {
          user.password = await bcrypt.hash(newPassword, 10);
          await user.save();
          req.flash('success', "Password Changed.");
          return res.redirect('/logout');
        } else {
          req.flash('error', "new password and confirm password not match.");
          return res.redirect(req.get('Referrer') || '/');
        }
      } else {
        req.flash('error', "current password not match.");
        return res.redirect(req.get('Referrer') || '/');
      }

    } catch (error) {
      console.log(error.message);
      return res.redirect(req.get('Referrer') || '/');
    }
  },
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        const payload = {
          id: user.id,
        }

        // OTP
        otp = Math.floor(10000 + (Math.random() * 999999));
        console.log(otp);

        const transporter = nodemailer.createTransport({
          service: "gmail",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "parekhdevanshi73@gmail.com",
            pass: "haiezrslnojoasox",
          },
        });

        const info = await transporter.sendMail({
          from: '<parekhdevanshi73@gmail.com>',
          to: user.email,
          subject: "OTP verification for Forget Password",
          html: `
                      <div style="margin:0; padding:0; background:#eef2f7; font-family: 'Segoe UI', Arial, sans-serif;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding:40px 0;">
                              <table width="600" style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.12);">
                                
                                <!-- Secure OTP Header Image -->
                                <tr>
                                  <td>
                                    <img 
                                      src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80" 
                                      alt="Secure OTP Verification"
                                      width="600"
                                      style="display:block;"
                                    >
                                  </td>
                                </tr>

                                <!-- Content -->
                                <tr>
                                  <td style="padding:35px;">
                                    <h1 style="margin:0; color:#1f2937; font-size:26px;">Verify Your Identity</h1>
                                    <p style="color:#4b5563; font-size:15px; margin-top:12px;">
                                      Hi <b>${user.name || "User"}</b>,
                                    </p>

                                    <p style="color:#4b5563; font-size:15px;">
                                      We received a request to reset your password.  
                                      Please use the OTP below to complete verification:
                                    </p>

                                    <!-- OTP Highlight Box -->
                                    <div style="text-align:center; margin:35px 0;">
                                      <div style="
                                        display:inline-block;
                                        background:linear-gradient(135deg, #6366f1, #3b82f6);
                                        color:#ffffff;
                                        font-size:34px;
                                        letter-spacing:8px;
                                        padding:16px 36px;
                                        border-radius:12px;
                                        font-weight:700;
                                        box-shadow:0 8px 18px rgba(59,130,246,0.4);
                                      ">
                                        ${otp}
                                      </div>
                                    </div>

                                    <p style="color:#374151; font-size:14px;">
                                      ⏳ This OTP is valid for <b>5 minutes</b>.
                                    </p>

                                    <p style="color:#6b7280; font-size:14px;">
                                      For your security, never share this code with anyone — even our support team.
                                    </p>

                                    <p style="color:#6b7280; font-size:14px;">
                                      If you didn’t request this, you can safely ignore this email.
                                    </p>

                                    <hr style="border:none; border-top:1px solid #e5e7eb; margin:30px 0;">

                                    <p style="font-size:13px; color:#9ca3af; line-height:1.6;">
                                      Need help? Contact our support team anytime.  
                                      <br><br>
                                      Stay secure,<br>
                                      <b>Your Company Security Team</b>
                                    </p>
                                  </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                  <td style="background:#0f172a; color:#e5e7eb; text-align:center; padding:18px; font-size:12px;">
                                    © ${new Date().getFullYear()} Your Company · All rights reserved<br>
                                    This is an automated security email.
                                  </td>
                                </tr>

                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>
                      `, // HTML body
        });

        console.log("Message sent:", info.messageId);

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        console.log(token);
        res.cookie('token', token);
        // return res.json({ token });
        return res.redirect('/otpVerify');
      } else {
        return res.redirect('/login');
      }
    } catch (error) {
      console.log(error.message);
      return res.redirect("/login");
    }
  },
  otpVerifyPage(req, res) {
    return res.render('./pages/otpVerify.ejs')
  },
  async otpVerify(req, res) {
    if (req.body.otp == otp) {
      return res.redirect('/new-Password');
    } else {
      req.flash('error', 'OTP Not Verified.');
      return res.redirect(req.get('Referrer') || '/');
    }

  },
  newPassPage(req, res) {
    return res.render('./pages/new-Password.ejs');
  },
  async newPass(req, res) {
    try {
      const { newPass, confirmpass } = req.body;

      if (newPass == confirmpass) {
        const { token } = req.cookies;
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decode.id);

        if (user) {
          user.password = await bcrypt.hash(newPass, 10);
          await user.save();
          req.flash('success', "Password Changed.");
          console.log("Password Changed.");
          return res.redirect('/login');
        } else {
          req.flash('success', "Password Changed.");
          return res.redirect('/login');
        }
      } else {
        req.flash('error', 'New Password and Confirm Password not Match.')
        return res.redirect('/login')
      }
    } catch (error) {
      console.log(error.message);
      return res.redirect('/login');
    }
  }
}

export default adminController;