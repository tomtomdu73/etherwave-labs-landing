'use server'

import axios from 'axios'

const { RECAPTCHA_SECRET_KEY } = process.env
const googleCaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify'

export async function verifyCaptcha(token: string | null) {
  const res = await axios.post(
    `${googleCaptchaUrl}?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
  )
  if (res.data.success) {
    return {
      message: 'Captcha verified',
      success: true,
    }
  } else {
    throw new Error('Failed Captcha')
  }
}
