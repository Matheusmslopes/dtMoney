import { ActivityIndicator, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { yupResolver } from "@hookform/resolvers/yup";

import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";

import { PublicStackParamsList } from "@/routes/PublicRoutes";

import { useAuthContext } from "@/context/authContext";
import { useSnackbarContext } from "@/context/snackbarContext";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

import { colors } from "@/shared/colors";
import { schema } from "./schema";

export interface FormLoginParams {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { handleLogin } = useAuthContext();
  const { notify } = useSnackbarContext();
  const { handleError } = useErrorHandler();

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

  const onSubmit = async (userData: FormLoginParams) => {
    try {
      await handleLogin(userData);
    } catch (error) {
      handleError(error, "Falha ao logar");
    }
  };

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        placeholder="email@example.com"
        leftIconName="mail-outline"
      />
      <AppInput
        control={control}
        name="password"
        label="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward">
          {isSubmitting ? <ActivityIndicator color={colors.white} /> : "Login"}
        </AppButton>

        <View>
          <Text className="mb-6 text-gray-300 text-base">Ainda não possui uma conta?</Text>
          <AppButton
            onPress={() => navigation.navigate("Register")}
            iconName="arrow-forward"
            mode="outline"
          >
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  );
};
