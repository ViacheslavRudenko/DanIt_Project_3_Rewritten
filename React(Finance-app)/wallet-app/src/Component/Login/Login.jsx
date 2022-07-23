import "./index.scss";
import CustomForm from "../Forms/CustomForm";
import { object, string } from "yup";
import { userLoginData } from "./data";

export default function Login({ setIsLogin, isLogin }) {
  const forms = [
    { formName: "userName", text: "User name", typeName: "text" },
    { formName: "password", text: "Password", typeName: "password" },
  ];
  //console.log("try to log-in: ", userLoginData[0]);
  const valuesValidation = object({
    userName: string()
      .required("The field is required")
      .min(5, "User name is too short"),
    password: string()
      .required("Please provide a valid password")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const isLoginValid = (values, action) => {
    userLoginData.map((data) => {
      (data.userName === values.userName &&
        data.password === values.password &&
        setIsLogin(true)) ||
        setIncorectUserData(true);
      isLogin && action.resetForm();
    });
  };

  const initialValue = {
    userName: "",
    password: "",
  };

  return (
    <CustomForm
      forms={forms}
      valuesValidation={valuesValidation}
      initialValue={initialValue}
      isValid={isLoginValid}
      btn={"Login"}
    />
  );
}
