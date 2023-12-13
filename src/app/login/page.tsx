import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import LoginInput from "@/components/login/LoginInput";

export default function Login() {
  return (
    <div>
      <CommonHeader headerText={`MINGLE\n TOGETHER NOW!`}></CommonHeader>
      <LoginInput></LoginInput>
    </div>
  );
}
