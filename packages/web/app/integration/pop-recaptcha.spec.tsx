import { renderHook, act } from '@testing-library/react-hooks'
import { FC } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import td from 'testdouble'
import { useTdRecaptcha } from './test-utils/useTdRecaptcha'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { usePop } from '../src/home/usePop'
import { apiHttp } from '../src/api'

function generateEndpoint() {
  const server = setupServer(
    rest.post(process.env.API_BASE_URL + '/pop', (req, res, ctx) => {
      return res()
    }),
  )

  return server
}
const server = generateEndpoint()

beforeAll(async () => {
  server.listen()
})

afterEach(async () => {
  server.resetHandlers()
  td.reset()
})

afterAll(async () => {
  server.close()
})

test('should have initial count = 0', async () => {
  const { result } = renderHook(() => usePop())

  expect(result.current.count).toBe(0)
})

test('should have count = 0 if google captcha is not initialized yet', async () => {
  const wrapper: FC<void> = ({ children }) => <GoogleReCaptchaProvider reCaptchaKey='TESTKEY'>{children}</GoogleReCaptchaProvider>
  const { result, waitForNextUpdate } = renderHook(() => usePop(), { wrapper })

  act(() => {
    result.current.handlePop()
  })
  await waitForNextUpdate()

  expect(result.current.count).toBe(0)
})

test('should increment pop by 1', async () => {
  window.grecaptcha = useTdRecaptcha().grecaptcha
  const wrapper: FC<void> = ({ children }) => <GoogleReCaptchaProvider reCaptchaKey='TESTKEY'>{children}</GoogleReCaptchaProvider>
  const { result, waitForNextUpdate } = renderHook(() => usePop(), { wrapper })

  act(() => {
    result.current.handlePop()
  })
  await waitForNextUpdate()

  expect(result.error).toBeUndefined()
  const beforeReset = (result.all[result.all.length - 2] as any).count
  expect(beforeReset).toBe(1)
})

test('should send correct payload to endpoint', async () => {
  const { grecaptcha, executeFn } = useTdRecaptcha()
  window.grecaptcha = grecaptcha
  const wrapper: FC<void> = ({ children }) => <GoogleReCaptchaProvider reCaptchaKey='TESTKEY'>{children}</GoogleReCaptchaProvider>
  const { result, waitForNextUpdate } = renderHook(() => usePop(), { wrapper })
  const apiPostSpy = jest.spyOn(apiHttp, 'post')
  td.when(executeFn(td.matchers.anything(), td.matchers.anything())).thenResolve('TEST_TOKEN')

  act(() => {
    result.current.handlePop()
  })
  await waitForNextUpdate()

  expect(apiPostSpy).toHaveBeenCalled()
  const [_, payload] = apiPostSpy.mock.lastCall

  expect((payload as any).count).toEqual(1)
  expect((payload as any).recaptcha).toEqual('TEST_TOKEN')
})
