const userService = require("../../services/user-service");
const hashingService = require('../../services/hashing-service');
const tokenService = require("../../services/token-service");

const loginController = () => {
    return {
        async loginUser(req, res) {
            const { email_tel, password } = req.body;

            if (!email_tel || !password) {
                return res
                    .status(422)
                    .json({ err: 'Please fill all the fields!' })
            }

            const user = await userService.findUser(
                {
                    $or: [
                        { email: email_tel },
                        { tel: email_tel }]
                })

            if (!user) {
                return res
                    .status(404)
                    .json({ err: 'No user found with this email/telephone Number!' })
            }

            const hash = hashingService.hashPassword(password);

            if (hash === user.password) {
                const { accessToken, refreshToken } = tokenService.generateTokens({ _id: user._id })

                if (accessToken && refreshToken) {
                    user.refreshToken = refreshToken
                    user.accessToken = accessToken;

                    try {
                        const savedUser = await user.save()
                        res.cookie('accessToken', accessToken, {
                            httpOnly: true
                        })
                        res.cookie('refreshToken', refreshToken, {
                            httpOnly: true
                        })

                        return res
                            .status(200)
                            .json({ message: 'Login successful!', user: savedUser })

                    } catch (error) {
                        return res
                            .status(500)
                            .json({ err: 'Something went wrong...' })
                    }
                }
            }

            return res
                .status(401)
                .json({ err: 'Invalid Credentials!' })
        },
        async renewAccessToken(req, res) {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                return res
                    .status(401)
                    .json({ err: 'Please login to continue!' })
            }

            const isValid = await tokenService.validateRefreshToken(refreshToken)

            if (isValid) {
                const user = await userService.findUser({ refreshToken })

                if (user) {
                    const { accessToken, refreshToken } = await tokenService.generateTokens({ _id: user._id })

                    user.accessToken = accessToken;
                    user.refreshToken = refreshToken;

                    try {
                        await user.save()
                        res.cookie('accessToken', accessToken, {
                            httpOnly: true
                        })
                        res.cookie('refreshToken', refreshToken, {
                            httpOnly: true
                        })

                        return res
                            .status(200)
                            .json({ message: 'Tokens issued!' })

                    } catch (error) {
                        return res
                            .status(500)
                            .json({ err: 'Database unavailable!' })
                    }

                }
                return res
                    .status(401)
                    .json({ err: 'Please login to continue!' })
            }

            return res
                .status(401)
                .json({ err: 'Invalid Refresh Token!' })
        },
        logout(req, res) {
            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')

            res.status(200).json({ message: "you've been logged out successfully!" })
        }
    }
}

module.exports = loginController