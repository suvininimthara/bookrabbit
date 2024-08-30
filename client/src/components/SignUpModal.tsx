import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { User } from "../models/userModel";
import { SignUpCredentials } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import { ConflictError } from "../errors/http_errors";
import './modalStyles.css';

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
  onLoginClick: () => void; // Added this prop
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onDismiss, onSignUpSuccessful, onLoginClick }) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await UsersApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error: any) {
      if (error instanceof ConflictError) {
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
        <h6 className='h4'>Signup</h6>
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
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
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
          

          <Button
            type="submit"
            disabled={isSubmitting}
            className="varient"
            style={{backgroundColor: '#00b3b3', color: 'white', alignSelf: 'center', width: '100%'}}
          >
            Sign Up
          </Button>
        </Form>
        <p> </p>
        <div className="text-center mt-3">
          <p>Do you have an account already? <br/>
            
          <Button type="button" className="btn btn-link" onClick={onLoginClick}>Login</Button>
            </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SignUpModal;
