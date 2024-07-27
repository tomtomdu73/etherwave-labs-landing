import { Tailwind, Html, Head, Body, Section, Button, Img } from '@react-email/components'

const { NEXT_PUBLIC_APP_URL } = process.env

const EmailTemplate = ({
  name,
  email,
  message,
  company,
  budget,
}: {
  name: string
  email: string
  message: string
  company: string
  budget: number
}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Section className="mx-auto max-w-2xl bg-white px-6 py-8">
            <header>
              <Img
                src={`${NEXT_PUBLIC_APP_URL}/logo.png`}
                width="50"
                height="50"
                alt="etherwvaelabs logo"
                className="mx-auto my-0"
              />
            </header>
            <main className="mt-8">
              <h2 className="text-gray-700">Hi,</h2>

              <p className="mt-2 leading-loose text-gray-600">
                {name} wants to get in touch with us.
              </p>
              <ul>
                <li className="my-2">
                  {' '}
                  <span className="font-bold">Linkedin or Company</span>
                  {': '}
                  <a href={company} target="_blank">
                    {company}
                  </a>
                </li>

                <li className="my-2">
                  {' '}
                  <span className="font-bold">Email</span>
                  {': '}
                  <a href={email} target="_blank">
                    {email}
                  </a>
                </li>
                <li className="my-2">
                  {' '}
                  <span className="font-bold">Budget</span>
                  {': '}
                  <span>${budget},000</span>
                </li>
              </ul>
              <span className="font-bold"> Message:</span>
              <p>{message}</p>

              <Button
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                target="_blank"
                className="mt-4 transform rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium capitalize tracking-wider text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                Reply to {name}
              </Button>

              <p className="mt-8 text-gray-600">
                Thanks, <br />
              </p>
            </main>
            <footer className="mt-8">
              <p className="text-gray-500">
                This email was sent from{' '}
                <a
                  href="etherwavelabs.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >
                  etherwavelabs.com
                </a>
                .
              </p>

              <p className="mt-3 text-gray-500">
                © {new Date().getFullYear()} EtherwaveLabs. All Rights Reserved.
              </p>
            </footer>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  )
}
export default EmailTemplate
