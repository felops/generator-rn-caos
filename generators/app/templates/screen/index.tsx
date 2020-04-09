import React from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import * as R from 'ramda'
import routes from 'src/navigation/routes'
import { log } from 'src/utils/native_modules'
import <%= componentName %>Container from 'src/containers/<%= componentPath %>/<%= componentName %>'
import useForm from 'src/utils/hooks/useForm'
import validators from 'src/utils/validators'

const LOG_TAG = '<%= componentPath %>/<%= componentName %>'

export interface NavigationParams {
}

export interface <%= componentName %>ScreenProps {
  navigation: NavigationStackProp<NavigationParams>;
}

const <%= componentName %>Screen: React.FC<<%= componentName %>ScreenProps> = ({ navigation }) => {
  const {
    formData, formErrors, onChangeFormInput, isFormValid
  } = useForm({
    initialData: {
<% for (const input of inputs) { -%>
      <%- input -%>: '',
<% } -%>
    },
    validators: {
<% for (const input of inputs) { -%>
      <%- input -%>: [validators.required],
<% } -%>
    },
    formatters: {
<% for (const input of inputs) { -%>
      <%- input -%>: R.identity,
<% } -%>
    },
    initialErrors: {
<% for (const input of inputs) { -%>
      <%- input -%>: null,
<% } -%>
    },
  })

<% for (const action of actions) { -%>
  const <%= helpers.getHandleActionName(action) %> = (): void => {
    log.e(LOG_TAG, 'TODO: <%= componentName %>/<%= action %> NOT IMPLEMENTED')
    if (isFormValid()) {
      navigation.navigate(routes.App.itself)
    }
  }

<% } -%>
  return (
    <<%= componentName %>Container
<% for (const input of inputs) { -%>
      <%- input -%>={formData.<%- input -%>}
      <%- input -%>Status={formErrors.<%- input -%> ? 'error' : 'default'}
      <%- input -%>Message={formErrors.<%- input -%> ? formErrors.<%- input -%>[0] : undefined}
      <%= helpers.getInputCallbackName(input) %>={onChangeFormInput('<%= input %>')}
<% } -%>
<% for (const action of actions) { -%>
      <%= action %>={<%= helpers.getHandleActionName(action) %>}
<% } -%>
    />
  )
}

export default <%= componentName %>Screen
