import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

const initialForm = {
  email: localStorage.getItem("email") || "",
  password: "",
};
/*
[ ] öncelikle başarılı login işleminde localStorage'a email key'i ile email adresini kaydetmelisin.
[ ] sayfa yüklenirken initialForm bilgileri boş string. eğer localStorage'da email key'ine karşılık gelen bir değer varsa email alanını bu bilgi ile başlatabilirsin.
[ ] hem email, hem de password alanına autoFocus attibute'u ekleyebilir, bunların true veya false olmasını localStorage'daki email key'inin değerine bağlı 
oluşmasını sağlayabilirsin.
*/
export default function Login() {
  const [form, setForm] = useState(initialForm);

  const history = useHistory();

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === "checkbox" ? event.target.checked : value;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setForm({ ...form, email: storedEmail });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.email.length == 0 || form.password.length == 0) return;

    axios
      .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email
        );
        if (user) {
          setForm(initialForm);
          localStorage.setItem("email", user.email);
          history.push("/main");
          toast.success(`Merhaba ${user.name}, tekrar hoş geldin.`);
        } else {
          history.push("/error");
          toast.error("Girdiğiniz bilgilerle bir kullanıcı bulamadık.");
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          data-testid="email-input"
          autoFocus={localStorage.getItem("email") ? false : true}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          data-testid="password-input"
          autoFocus={localStorage.getItem("email") ? true : false}
        />
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button
          disabled={form.email.length == 0 || form.password.length == 0}
          color="primary"
        >
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
