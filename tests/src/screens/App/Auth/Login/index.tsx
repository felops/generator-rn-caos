import React, { useState } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import * as R from 'ramda'
import routes from 'src/navigation/routes'
import { log } from 'src/utils/native_modules'
import useForm from 'src/utils/hooks/useForm'
import validators from 'src/utils/validators'
import LoginContainer, {
  FormInputStatus,
  State,
} from 'src/containers/App/Auth/Login'

const LOG_TAG = 'App/Auth/Login'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NavigationParams {}

export interface LoginScreenProps {
  navigation: NavigationStackProp<NavigationParams>
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [state, setState] = useState(State.default)
  const { formData, formErrors, onChangeFormInput, isFormValid } = useForm({
    initialData: {
      email: '',
      password: '',
    },
    validators: {
      email: [validators.required],
      password: [validators.required],
    },
    formatters: {
      email: R.identity,
      password: R.identity,
    },
    initialErrors: {
      email: null,
      password: null,
    },
  })

  const handleOnLogin = (): void => {
    log.e(LOG_TAG, 'TODO: Login/onLogin NOT IMPLEMENTED')
    if (isFormValid() || !isFormValid()) {
      navigation.navigate(routes.App.itself)
    }
  }

  const handleOnBack = (): void => {
    log.e(LOG_TAG, 'TODO: Login/onBack NOT IMPLEMENTED')
    if (isFormValid() || !isFormValid()) {
      navigation.navigate(routes.App.itself)
    }
  }

  const handleOnForgotPassword = (): void => {
    log.e(LOG_TAG, 'TODO: Login/onForgotPassword NOT IMPLEMENTED')
    if (isFormValid() || !isFormValid()) {
      navigation.navigate(routes.App.itself)
    }
  }

  return (
    <LoginContainer
      state={state}
      email={formData.email}
      emailStatus={
        formErrors.email ? FormInputStatus.error : FormInputStatus.default
      }
      emailMessage={formErrors.email ? formErrors.email[0] : undefined}
      onChangeEmail={onChangeFormInput('email')}
      password={formData.password}
      passwordStatus={
        formErrors.password ? FormInputStatus.error : FormInputStatus.default
      }
      passwordMessage={formErrors.password ? formErrors.password[0] : undefined}
      onChangePassword={onChangeFormInput('password')}
      onLogin={handleOnLogin}
      onBack={handleOnBack}
      onForgotPassword={handleOnForgotPassword}
    />
  )
}

export default LoginScreen
