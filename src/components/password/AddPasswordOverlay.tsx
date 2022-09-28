import React, { FC } from "react";
import Overlay from "../common/Overlay";
import { CloseRounded } from "@mui/icons-material";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { appActions } from "../../store/app-slice";
import { Password } from "../../modal/Password";

const initialPasswordState = {
    service: "",
    login: "",
    password: "",
};

const AddPasswordOverlay: FC<{ onClose: () => void; open: boolean }> = (props) => {
    const [password, setPassword] = React.useState(initialPasswordState);
    const dispatch = useDispatch();

    const handleInputChange = React.useCallback((e: HTMLInputElement) => {
        setPassword((prev) => ({
            ...prev,
            [e.name]: e.value,
        }));
    }, []);

    const handleSaveClick = React.useCallback(() => {
        if (!password.service) {
            toast.error("Service name is required");
            return;
        }
        if (!password.password) {
            toast.error("Password is required");
            return;
        }
        dispatch(appActions.savePassword(new Password(password.service, password.login, password.password)));
        toast.success("Password saved");
        setPassword(initialPasswordState);
        props.onClose();
    }, [password]);

    return (
        <Overlay className={"flex flex-col gap-5 text-blackSecondary dark:text-whiteSecondary"} open={props.open}>
            <div className={"flex justify-between gap-5 items-center mb-5"}>
                <div className={"text-2xl font-bold"}>Add a password</div>
                <button onClick={props.onClose}>
                    <CloseRounded />
                </button>
            </div>
            <Input
                value={password.service}
                onChange={handleInputChange}
                name={"service"}
                header={"Service"}
                description={"The service you want to save the password for."}
                placeholder={"google.com"}
            />
            <Input
                value={password.login}
                onChange={handleInputChange}
                name={"login"}
                header={"Login"}
                description={"The login you want to save the password for."}
                placeholder={"johndoe@gmail.com"}
            />
            <Input
                type={"password"}
                value={password.password}
                onChange={handleInputChange}
                name={"password"}
                header={"Password"}
                description={"The password you want to save."}
                placeholder={"********"}
            />
            <div className={"flex gap-5"}>
                <Button className={"border-blue text-blue md:w-[150px] w-full"} onClick={props.onClose}>
                    Cancel
                </Button>
                <Button className={"text-white bg-green border-green md:w-[150px] w-full"} onClick={handleSaveClick}>
                    Save
                </Button>
            </div>
        </Overlay>
    );
};

export default AddPasswordOverlay;
