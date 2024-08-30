import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { User } from "../models/userModel";
import TextInputField from "./form/TextInputField";
import { UserInput } from "../network/users_api";
import * as UserApi from "../network/users_api";


interface AddEditUserDialogProps {
    userToEdit?: User;
    onDismiss: () => void;
    onUserSave: (user: UserInput) => void;
}

const AddEditUserDialog: React.FC<AddEditUserDialogProps> = ({ userToEdit, onDismiss, onUserSave }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting  } } = useForm<UserInput>({
        defaultValues: {
            username: userToEdit?.username || "",
            email: userToEdit?.email || "",
        }
    });

    async function onSubmit(data: UserInput) {
        try {
            let userResponse: User;
            if (userToEdit) {
                userResponse = await UserApi.updateUser(userToEdit._id, data);
            } else {
                userResponse = await UserApi.createUser(data);
            }
            onUserSave({ ...userResponse, password: "" });
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                alert('Email already exists. Please use a different email.');
            } else {
                console.error(error);
                alert('An error occurred. Please try again.');
            }
        }
    }
    
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>{userToEdit ? "Edit User" : "Add User"}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditUserForm" onSubmit={handleSubmit(onSubmit)}>
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
                        type="text"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ 
                            required: "Required", 
                            minLength: {
                                value: 6,
                                message: "Email must be at least 6 characters"
                            },
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                message: "Invalid email address"
                            }
                        }}
                        error={errors.email}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button type="submit"
                    form="addEditUserForm"
                    disabled={isSubmitting}> Save </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditUserDialog;
