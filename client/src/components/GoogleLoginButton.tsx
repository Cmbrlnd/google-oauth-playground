import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface GoogleLoginButtonProps {
  onSuccess: (givenName: string, accessToken: string) => void;
}

function GoogleLoginButton({ onSuccess }: GoogleLoginButtonProps) {
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response = await axios.post("http://localhost:5000/auth/google", {
          code,
        });

        // Store the accessToken and given name securely in localStorage
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("givenName", response.data.givenName);
        onSuccess(response.data.givenName, response.data.accessToken);
      } catch (error) {
        console.error("Error during Google authentication:", error);
      }
    },
    flow: "auth-code",
  });

  return (
    <button onClick={googleLogin}>Login with Google</button>
  );
}

export default GoogleLoginButton;
