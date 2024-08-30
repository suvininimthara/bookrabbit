import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { User } from "../models/userModel";
import { LoginCredentials } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import { UnauthorizedError } from "../errors/http_errors";
import 'bootstrap/dist/css/bootstrap.min.css';
import './modalStyles.css';
interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
  onSignUpClick: () => void; // Added this prop
}

const LoginModal: React.FC<LoginModalProps> = ({ onDismiss, onLoginSuccessful, onSignUpClick }) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await UsersApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss} centered>
    <Modal.Body>
        <div className="text-center">

        <img src="/logo.png" alt="logo" className="modal-logo"/>
        <p></p>
        <h6 className='h4'>Login</h6>
        </div>
        {errorText &&
          <Alert variant="danger">
            {errorText}
          </Alert>
        }
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
            <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="varient"
            style={{backgroundColor: '#00b3b3', color: 'white', alignSelf: 'center', width: '100%'}}
          >
            Login
          </Button >
            </div>
        </Form>
        <p> </p>
        <div className="text-center mt-3">
          <p>Don't have an account? <br/>
            
          <Button type="button" className="btn btn-link" onClick={onSignUpClick}>Sign up</Button>
            </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
