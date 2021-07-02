export default interface UserSignUpResponseDTO {
  status: number;
  data: JwtTokenDTO;
}

interface JwtTokenDTO {
  jwt: string;
}