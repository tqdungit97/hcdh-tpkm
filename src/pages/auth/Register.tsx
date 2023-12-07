import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../hooks";
import { PostRegisterPayload, RegisterRole } from "../../api/auth";

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostRegisterPayload>({
    mode: "all",
    defaultValues: {
      dob: new Date().toISOString(),
      role: RegisterRole.CUSTOMER,
    },
  });
  const { register: registerApi, isLoading } = useAuthentication();

  const onSubmit = (values: PostRegisterPayload) =>
    registerApi({
      ...values,
      phoneNumber: `84${values.phoneNumber}`,
      name: values.fullName.split(" ").pop(),
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl marginBottom="8px" isInvalid={!!errors.phoneNumber}>
        <FormLabel aria-required htmlFor="phoneNumber" marginBottom="4px">
          Số điện thoại
        </FormLabel>
        <InputGroup>
          <InputLeftElement>+84</InputLeftElement>
          <Input
            id="phoneNumber"
            prefix="+84"
            {...register("phoneNumber", {
              required: { value: true, message: "Chưa nhập số điện thoại" },
              pattern: {
                value: /([3|5|7|8|9])+([0-9]{8})\b/g,
                message: "Số điện thoại không hợp lệ",
              },
            })}
          />
        </InputGroup>
        <FormErrorMessage>{errors?.phoneNumber?.message}</FormErrorMessage>
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
        Đăng ký
      </Button>
    </form>
  );
}

export default Register;
