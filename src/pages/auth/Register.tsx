import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../hooks";
import { PostRegisterPayload } from "../../api/auth";

export function Register() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<PostRegisterPayload>({
    mode: "all",
    defaultValues: {
      dob: new Date().toISOString(),
    },
  });
  const { register: registerApi, isLoading } = useAuthentication();

  const onSubmit = (values: PostRegisterPayload) =>
    registerApi({ ...values, name: values.fullName.split(" ").pop() });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl marginBottom="8px" isInvalid={!!errors.email}>
        <FormLabel aria-required htmlFor="email" marginBottom="4px">
          Email đăng nhập
        </FormLabel>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: { value: true, message: "Chưa nhập email" },
          })}
        />
        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl marginBottom="8px" isInvalid={!!errors.fullName}>
        <FormLabel aria-required htmlFor="fullName" marginBottom="4px">
          Họ và Tên
        </FormLabel>
        <Input
          id="fullName"
          {...register("fullName", {
            required: { value: true, message: "Chưa nhập họ và tên" },
          })}
        />
        <FormErrorMessage>{errors?.fullName?.message}</FormErrorMessage>
      </FormControl>

      <FormControl marginBottom="8px" isInvalid={!!errors.address}>
        <FormLabel aria-required htmlFor="address" marginBottom="4px">
          Địa chỉ
        </FormLabel>
        <Input
          id="address"
          {...register("address", {
            required: { value: true, message: "Chưa nhập địa chỉ" },
          })}
        />
        <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
      </FormControl>

      <FormControl marginBottom="16px" isInvalid={!!errors.password}>
        <FormLabel aria-required htmlFor="password" marginBottom="4px">
          Mật khẩu
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

      <Button
        type="submit"
        w="full"
        isDisabled={!isValid || isLoading}
        colorScheme="whatsapp"
      >
        Đăng nhập
      </Button>
    </form>
  );
}

export default Register;
