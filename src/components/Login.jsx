import {useAppContext, SET_ACCESS_TOKEN} from "../providers/ApplicationProvider";
import {useHistory} from "react-router-dom";
import {Button, FormGroup, Label, Input} from "reactstrap";
import { Formik, ErrorMessage, Form, Field } from 'formik';
import {BACKEND} from "../configuration/backend";
import axios from "axios";

const Login = props => {
    const [{accessToken}, dispatch] = useAppContext();
    let history = useHistory();
    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}

            validate={
                values=>{
                    let errors = [];
                    if (!values.email) errors.email = "Je nutné vyplnit email uživatele.";
                    if (!values.password) errors.password = "Je nutné vyplnit heslo uživatele.";
                    return errors;
                }
            }

            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true);
                axios.post(BACKEND.path + "/account/login",
                {
                    email: values.email,
                    password: values.password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    console.log(response.data);
                    dispatch({type: SET_ACCESS_TOKEN, payload: response.data.accessToken});
                    history.push("/");
                })
                .catch(error => {
                    alert("CHYBA");
                })
                .then(()=>{
                    setSubmitting(false);
                })            
            }}
        >
        {({errors, touched}) => 
            (
                <Form>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Field tag={Input} id="email" name="email" placeholder="aaa@aaa.aa" />
                    {errors.email && touched.email ? (<div>{errors.email}</div>) : null}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Heslo</Label>
                    <Field id="password" name="password" type="password" />
                    {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
                </FormGroup>
                <div>
                    <Button>Login</Button>
                </div>
                </Form>
            )
        }
            
        </Formik>       
    );
}

export default Login;