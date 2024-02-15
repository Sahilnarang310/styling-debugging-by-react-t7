import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "user_input") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "user_blur") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer= (state, action)=> {
  if (action.type === "user_input") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "user_blur") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState(""); // Added College Name state
  const [collegeIsValid, setCollegeIsValid] = useState(); // Added College Name validity state
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const[passwordState, dispatchPassword]=useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // useEffect(()=>{
  //   console.log("its, running")
  // },[])

  // useEffect(() => {

  //   const identifier=setTimeout(() => {
  //     console.log("cheking password validity");
  //     setFormIsValid(
  //       enteredEmail.includes("@") &&
  //         enteredPassword.trim().length > 6 &&
  //         enteredCollege.trim() !== "" // Added college validation
  //     );
  //   }, 500);

  //   return ()=>{
  //     console.log('CLEANUP  ');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword, enteredCollege]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "user_input", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") && passwordState.isValid
    );
  };


  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'user_input', val:event.target.value})

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const collegeChangeHandler = (event) => {
    // Added college change handler
    setEnteredCollege(event.target.value);

    setFormIsValid(
      enteredEmail.includes("@") &&
        enteredPassword.trim().length > 6 &&
        event.target.value.trim() !== "" // Updated form validation
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "input_blur" });
  };

  const validatePasswordHandler = () => {
   dispatchPassword({type:'input_blur'})
  };

  const validateCollegeHandler = () => {
    // Added college validation handler
    setCollegeIsValid(enteredCollege.trim() !== ""); // College is valid if not empty
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College Name</label>{" "}
          {/* Added College Name input */}
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
            className={`${classes.input} ${
              collegeIsValid === false ? classes.invalid : ""
            }`} // Apply email CSS properties for college input
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
