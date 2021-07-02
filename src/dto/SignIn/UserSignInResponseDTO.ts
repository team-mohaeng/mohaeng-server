export default interface UserSignInResponseDTO {
  status: number;
  data: JwtTokenDTO;
}

interface JwtTokenDTO {
  jwt: string;
}