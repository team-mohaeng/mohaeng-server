export default interface UserSignUpResponseDTO {
  status: number;
  data: {
    jwt: string;
  };
}

interface JwtTokenDTO {
  jwt: string;
}