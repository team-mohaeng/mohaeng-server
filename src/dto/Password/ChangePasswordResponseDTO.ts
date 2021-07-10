export default interface ChangePasswordResponseDTO {
  status: number;
  data: JwtTokenDTO;
}

interface JwtTokenDTO {
  jwt: string;
}