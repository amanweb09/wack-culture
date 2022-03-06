const sendOtp = require('../../messages/transactional');
const { hashOTP } = require('../../services/hashing-service');
const tokenService = require('../../services/token-service');
const userService = require('../../services/user-service');
const { TokenExpiredError } = require('jsonwebtoken');
const hashingService = require('../../services/hashing-service');

module.exports = function smsController() {
    return {
        async send(req, res) {

            const { tel } = req.body;

            if (!tel) {
                return res
                    .status(422)
                    .json({ err: 'Telephone number is required!' })
            }

            const findUser = await userService.findUser({ tel });

            if (!findUser) {
                return res
                    .status(404)
                    .json({ err: 'No account found with this telephone number!' })
            }

            const OTP = Math
                .round(Math.random() * 1E6)


            if (process.env.NODE_ENV === 'production') {
                sendOtp(OTP, tel)
            }
            else {
                console.log(OTP);
            }

            const validity = 60 * 60 * 10
            const ttl = Date.now() + validity;

            const hashingOtp = `${tel}.${OTP}.${ttl}`;
            const otpHash = hashOTP(hashingOtp);

            return res
                .status(201)
                .json({
                    hash: `${otpHash}.${ttl}`,
                    tel
                })
        },
        async verify(req, res) {
            const { OTP, hash, tel } = req.body;

            if (!OTP || !hash || !tel) {
                return res
                    .status(422)
                    .json({ err: 'Please enter OTP to continue!' })
            }

            const [otpHash, ttl] = hash.split('.');
            const initialHash = hashOTP(`${tel}.${OTP}.${ttl}`);

            const validity = 60 * 60 * 10;
            const validPeriod = ttl + validity;

            if (Date.now() > validPeriod) {
                return res
                    .status(422)
                    .json({ err: 'OTP has expired!' })
            }

            if (otpHash === initialHash) {
                //redirect to reset page

                const user = await userService
                    .findUser({ tel });


                const token = await tokenService
                    .generatePasswordRestToken({ _id: user._id });

                // user.passwordResetToken = token;
                try {
                    await user.save();
                    return res
                        .status(200)
                        .json({
                            token
                        })

                } catch (error) {
                    console.log(error);
                    return res
                        .status(500)
                        .json({ err: 'Something went wrong!' })
                }
            }

            return res
                .status(422)
                .json({ err: 'Inavlid OTP!' })
        },
        async reset(req, res) {
            const { newPassword, confirmPassword, token } = req.body;

            if (!newPassword || !confirmPassword || !token) {
                return res
                    .status(422)
                    .json({ err: 'All fields are required' })
            }

            if (newPassword !== confirmPassword) {
                return res
                    .status(422)
                    .json({ err: "Password and confirm password don't match" })
            }

            try {
                const payload = tokenService.validatePasswordToken(token);

                if (payload) {
                    const user = await userService.findUser({ _id: payload._id });

                    if (!user) {
                        return res
                            .status(400)
                            .json({ err: 'User not found!' })
                    }

                    const password = hashingService.hashPassword(newPassword);
                    user.password = password;

                    await user.save();

                    res.clearCookie('accessToken')
                    res.clearCookie('refreshToken')

                    return res
                        .status(200)
                        .json({ message: 'Password updated successfully!' })

                }

                return res
                    .status(400)
                    .json({ err: '400 Bad Request!' })

            } catch (error) {
                if (error instanceof TokenExpiredError) {
                    return res
                        .status(422)
                        .json({ err: "Your password reset link has expired!" })
                }

                return res
                    .status(500)
                    .json({ err: "Something went wrong!" })
            }

        },
        validateToken(req, res) {
            const { token } = req.body;

            try {
                const validate = tokenService.validatePasswordToken(token)

                if (validate) {
                    return res
                        .status(200)
                        .json({ message: 'Token is valid...' })
                }

                return res
                    .status(401)
                    .json({ err: "Couldn't generate your reset link!" })

            } catch (error) {
                if (error instanceof TokenExpiredError) {
                    return res
                        .status(422)
                        .json({ err: "Your password reset link has expired!" })
                }
                return res
                    .status(500)
                    .json({ err: "Something went wrong!" })
            }
        }
    }
}