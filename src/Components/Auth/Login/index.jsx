import React from 'react'
import styles from './index.module.css'
import Input from 'Components/Shared/Input'
import ButtonText from 'Components/Shared/Button/ButtonText'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'

const schema = Joi.object({
  email: Joi.string()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid email format",
      "string.empty": "Email is a required field",
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?!.*[^a-zA-Z0-9])/)
    .required()
    .messages({
      "string.min": "Password must contain at least 8 characters",
      "string.pattern.base": "Password must contain both letters and numbers",
      "string.empty": "Password is a required field",
    }),
});

function Login() {
  const { register, handleSubmit, formState: { errors }} = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div style={styles.containerForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          register={register}
          error={errors.email?.message}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          register={register}
          error={errors.password?.message}
        />
        <ButtonText type={"submit"} label={"Register"} />
      </form>
    </div>
  )
}

export default Login