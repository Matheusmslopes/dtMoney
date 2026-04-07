import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup.string().email("O email é inválido").required("email é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .required("A senha é obrigatória"),
});
