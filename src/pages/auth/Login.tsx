import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../hooks";

interface ILoginFormInput {
  email: string;
  password: string;
}

export function Login() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginFormInput>({ mode: "all" });
  const { login, isLoading } = useAuthentication();

  const onSubmit = (values: ILoginFormInput) => login(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl marginBottom="8px" isInvalid={!!errors.email}>
        <FormLabel aria-required htmlFor="user-name" marginBottom="4px">
          Email đăng nhập
        </FormLabel>
        <Input
          id="name"
          {...register("email", {
            required: { value: true, message: "Chưa nhập email đăng nhập" },
          })}
        />
        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl marginBottom="16px" isInvalid={!!errors.password}>
        <FormLabel aria-required htmlFor="password" marginBottom="4px">
          Password
        </FormLabel>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: { value: true, message: "Chưa nhập mật khẩu" },
          })}
        />
        <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" w="100%" isDisabled={!isValid || isLoading} colorScheme="whatsapp">
        Đăng nhập
      </Button>
    </form>
  );
}

export default Login;
